"use client";
import { ButtonLoading } from "@/components/Application/ButtonLoading";
import WebsiteBreadcrumb from "@/components/Application/website/WebsiteBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { showToast } from "@/lib/showToast";
import { zSchema } from "@/lib/zodSchema";
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { addIntoCart, clearCart } from "@/store/reducer/cartReducer";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const breadCrumb = {
  title: "Checkout",
  links: [
    {
      label: "Checkout",
    },
  ],
};

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cartStore);
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
  const [couponLoading, setCouponLoading] = useState(false);

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
      
    } catch (error) {
      showToast("error", error.message)
    } finally {
      setCouponLoading(false)
    }
  };

  return (
    <div>
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
          <div className="lg:w-[60%] w-full"></div>
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
                      <td className="text-end py-2 "></td>
                    </tr>

                    <tr>
                      <td className="font-[600] py-2">Discount</td>
                      <td className="text-end py-2 "></td>
                    </tr>

                    <tr>
                      <td className="font-[600] py-2">Coupon Discount</td>
                      <td className="text-end py-2 text-green-600"></td>
                    </tr>

                    <tr className="border-t">
                      <td className="font-[600] py-2 text-lg">Order Total</td>
                      <td className="text-end py-2 text-lg font-bold"></td>
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
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
