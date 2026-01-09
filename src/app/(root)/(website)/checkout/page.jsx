"use client";
import { ButtonLoading } from "@/components/Application/ButtonLoading";
import WebsiteBreadcrumb from "@/components/Application/website/WebsiteBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { showToast } from "@/lib/showToast";
import { zSchema } from "@/lib/zodSchema";
import {
  WEBSITE_ORDER_DEATILS,
  WEBSITE_PRODUCT_DETAILS,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";
import { addIntoCart, clearCart } from "@/store/reducer/cartReducer";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseCircleSharp } from "react-icons/io5";
import z from "zod";
import { FaShippingFast } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import Script from "next/script";
import { useRouter } from "next/navigation";
import loading from "@/assets/images/loading.svg";

const breadCrumb = {
  title: "Checkout",
  links: [
    {
      label: "Checkout",
    },
  ],
};

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cartStore);
  const authStore = useSelector((store) => store.authStore);
  const [verifiedCartData, setVerifiedCartData] = useState([]);
  const { data: getVerifiedCartData } = useFetch(
    "/api/cart-verification",
    "POST",
    {
      data: cart.products,
    }
  );

  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [subtotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [savingOrder, setSavingOrder] = useState(false);

  // console.log("Checkout Data from Cart-Verification API ", getVerifiedCartData);

  useEffect(() => {
    if (getVerifiedCartData && getVerifiedCartData.success) {
      const cartData = getVerifiedCartData.data;
      setVerifiedCartData(cartData);
      // dispatch(clearCart());
      cartData.forEach((cartItem) => {
        dispatch(addIntoCart(cartItem));
      });
    }
  }, [getVerifiedCartData]);

  useEffect(() => {
    const cartProducts = cart.products;
    const subTotalAmount = cartProducts.reduce(
      (sum, product) => sum + product.sellingPrice * product.qty,
      0
    );
    const discount = cartProducts.reduce(
      (sum, product) =>
        sum + (product.mrp - product.sellingPrice) * product.qty,
      0
    );
    setSubTotal(subTotalAmount);
    setDiscount(discount);
    setTotalAmount(subTotalAmount);
    couponForm.setValue("minShoppingAmount", subTotalAmount);
  }, [cart]);

  // Coupon Form

  const couponFormSchema = zSchema.pick({
    code: true,
    minShoppingAmount: true,
  });

  const couponForm = useForm({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: "",
      minShoppingAmount: subtotal,
    },
  });

  const applyCoupon = async (values) => {
    setCouponLoading(true);
    try {
      const { data: response } = await axios.post("/api/coupon/apply", values);
      if (!response.success) {
        throw new Error(response.message);
      }
      const discountPercentage = response.data.discountPercentage;

      // get coupon discount amount
      setCouponDiscountAmount((subtotal * discountPercentage) / 100);
      setTotalAmount(subtotal - (subtotal * discountPercentage) / 100);
      showToast("success", response.message);
      setCouponCode(couponForm.getValues("code"));
      setIsCouponApplied(true);
      couponForm.resetField("code", "");
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode("");
    setCouponDiscountAmount(0);
    setTotalAmount(subtotal);
  };

  // Place order
  const orderFormSchema = zSchema
    .pick({
      name: true,
      email: true,
      phone: true,
      address: true,
      street: true,
      country: true,
      state: true,
      city: true,
      pincode: true,
      landmark: true,
      ordernote: true,
    })
    .extend({
      userId: z.string().optional(),
    });

  const orderForm = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      street: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      landmark: "",
      ordernote: "",
      userId: authStore?.auth?._id,
    },
  });

  useEffect(() => {
    if (authStore) {
      orderForm.setValue("userId", authStore?.auth?._id);
    }
  }, [authStore]);

  // get order ID
  const getOrderId = async (amount) => {
    try {
      const { data: orderIdData } = await axios.post(
        "/api/payment/get-order-id",
        { amount }
      );
      if (!orderIdData.success) {
        throw new Error(orderIdData.message);
      }
      return { success: true, order_id: orderIdData.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const placeOrder = async (formData) => {
    console.log("Order Form Details From CheckOut Page.", formData);
    setPlacingOrder(true);
    try {
      const generateOrderId = await getOrderId(totalAmount);
      console.log(generateOrderId);
      if (!generateOrderId.success) {
        throw new Error(generateOrderId.message);
      }

      const order_id = generateOrderId.order_id;

      const rezOption = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "Mum-World",
        description: "Payment for order",
        image:
          "https://res.cloudinary.com/dc0wr8hev/image/upload/v1766166906/lcsvrxwp43tsqaep2feu.png",
        order_id: order_id,
        handler: async function (response) {
          setSavingOrder(true);
          const products = verifiedCartData.map((cartItem) => ({
            productId: cartItem.productId,
            variantId: cartItem.variantId,
            name: cartItem.variantId,
            qty: cartItem.qty,
            mrp: cartItem.mrp,
            sellingPrice: cartItem.sellingPrice,
          }));

          const { data: paymentResponseData } = await axios.post(
            "/api/payment/save-order",
            {
              ...formData,
              ...response,
              products: products,
              subtotal: subtotal,
              discount: discount,
              couponDiscountAmount: couponDiscountAmount,
              totalAmount: totalAmount,
            }
          );

          if (paymentResponseData.success) {
            showToast("success", paymentResponseData.message);
            dispatch(clearCart());
            orderForm.reset();
            router.push(WEBSITE_ORDER_DEATILS(response.razorpay_order_id));
            setSavingOrder(false);
          } else {
            showToast("error", paymentResponseData.message);
            setSavingOrder(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new Razorpay(rezOption);
      rzp.on("payment.failed", function (response) {
        showToast("error", response.error.description);
      });

      rzp.open();
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div>
      {savingOrder && (
        <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-black/20">
          <div className="h-screen flex flex-col justify-center items-center">
            <Image src={loading.src} height={80} width={80} alt="Loading" />
            <h4 className="font-semibold">Order Confirming...</h4>
          </div>
        </div>
      )}
      <WebsiteBreadcrumb props={breadCrumb} />
      {cart.count === 0 ? (
        <div className="w-screen h-[500px] flex justify-center items-center py-32">
          <div className="text-center">
            <h4 className="text-4xl font-semibold mb-5"></h4>
            <Button type="button" asChild>
              <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4">
          <div className="lg:w-[60%] w-full">
            <div className="flex font-semibold gap-2 items-center">
              <FaShippingFast size={25} />
            </div>

            <div className="mt-5">
              <Form {...orderForm}>
                <form onSubmit={orderForm.handleSubmit(placeOrder)}>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-5">
                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Full Name{" "}
                              <span className="hidden 2xl:block">
                                (First and Last name)
                              </span>{" "}
                              <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Full Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Email <span className="text-red-600">*</span>{" "}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Phone No <span className="text-red-600">*</span>{" "}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Phone"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Flat, House no
                              <span className="hidden 2xl:block">
                                , Building, Company, Apartment
                              </span>{" "}
                              <span className="text-red-600">*</span>{" "}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Area, Street{" "}
                              <span className="hidden 2xl:block">
                                , Sector, Village
                              </span>{" "}
                              <span className="text-red-600">*</span>{" "}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Area-Street-Sector-village"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="landmark"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Landmark <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="LandMark" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Town/City <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              State <span className="text-red-600">*</span>{" "}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Pincode <span className="text-red-600">*</span>{" "}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Pincode" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full sm:w-[calc(50%-10px)] mb-3">
                      <FormField
                        control={orderForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Country <span className="text-red-600">*</span>{" "}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full mb-3">
                      <FormField
                        control={orderForm.control}
                        name="ordernote"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[600]">
                              Order Note
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="resize-none"
                                placeholder="Enter order note"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className=" mb-3">
                      <ButtonLoading
                        type="submit"
                        text="Place Order"
                        loading={placingOrder}
                        className="bg-black rounded-full px-5 cursor-pointer"
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <div className="lg:w-[40%] w-full">
            <div className="rounded bg-gray-50 p-5 sticky top-5">
              <h4 className="text-lg font-semibold mb-5">Order Summary</h4>
              <div>
                <table className="w-full border">
                  <tbody>
                    {verifiedCartData &&
                      verifiedCartData?.map((product) => (
                        <tr key={product.variantId}>
                          <td className="p-3">
                            <div className="flex items-center gap-5">
                              <Image
                                src={product.image}
                                width={60}
                                height={60}
                                alt={product.name}
                                className="rounded"
                              />
                              <div>
                                <h4 className="font-[600] line-clamp-1">
                                  <Link
                                    href={WEBSITE_PRODUCT_DETAILS(product.url)}
                                  >
                                    {product.name}
                                  </Link>
                                </h4>
                                <p className="text-sm">
                                  Color: {product.color}
                                </p>
                                <p className="text-sm">Size: {product.size}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <p className="text-nowrap text-sm">
                              {product.qty} X{" "}
                              {product.sellingPrice.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })}
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="font-[600] py-2">Subtotal</td>
                      <td className="text-end py-2 ">
                        {subtotal.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>

                    <tr>
                      <td className="font-[600] py-2">Discount</td>
                      <td className="text-end py-2 ">
                        -{" "}
                        {discount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>

                    <tr>
                      <td className="font-[600] py-2">Coupon Discount</td>
                      <td className="text-end py-2 text-green-600">
                        -{" "}
                        {couponDiscountAmount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="font-[600] py-2 text-lg">Order Total</td>
                      <td className="text-end py-2 text-lg font-bold">
                        {totalAmount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2">
                  {!isCouponApplied ? (
                    <Form {...couponForm}>
                      <form
                        className="flex justify-between gap-5"
                        onSubmit={couponForm.handleSubmit(applyCoupon)}
                      >
                        <div className="w-[calc(100%-100px)]">
                          <FormField
                            control={couponForm.control}
                            name="code"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Enter coupon code"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          ></FormField>
                        </div>
                        <div className="w-[100px]">
                          <ButtonLoading
                            type="submit"
                            text="Apply"
                            className="w-full cursor-pointer"
                            loading={couponLoading}
                          ></ButtonLoading>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <div className="flex justify-between py-1 px-5 rounded-lg bg-gray-200">
                      <div>
                        <span className="text-sm">Coupon:</span>
                        <p className="text-m font-[600]">{couponCode}</p>
                      </div>
                      <button
                        type="button"
                        className="cursor-pointer text-red-500"
                        onClick={removeCoupon}
                      >
                        <IoCloseCircleSharp size={25} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default Checkout;
