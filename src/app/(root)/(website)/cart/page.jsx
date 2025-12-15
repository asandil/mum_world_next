"use client";
import WebsiteBreadcrumb from "@/components/Application/website/WebsiteBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  WEBSITE_CHECKOUT,
  WEBSITE_PRODUCT_DETAILS,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgPlaceholder from "@/assets/images/img-placeholder.webp";
import Image from "next/image";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/reducer/cartReducer";
const breadCrumb = {
  title: "Cart",
  links: [
    {
      label: "Cart",
    },
  ],
};

const CartPage = () => {
  const cart = useSelector((store) => store.cartStore);
  const dispatch = useDispatch();
  const [subtotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState(80);

  useEffect(() => {
    const cartProducts = cart.products;
    const totalAmount = cartProducts.reduce(
      (sum, product) => sum + product.sellingPrice * product.qty,
      0
    );
    const discount = cartProducts.reduce(
      (sum, product) =>
        sum + (product.mrp - product.sellingPrice) * product.qty,
      0
    );
    setSubTotal(totalAmount);
    setDiscount(discount);

    if (totalAmount >= 500) {
      setDelivery(0);
    } else {
      setDelivery(80);
    }
  }, [cart]);

  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumb} />
      {cart.count === 0 ? (
        <div className="w-screen h-full flex justify-center items-center py-32">
          <div className="text-center">
            <h4 className="text-4xl font-semibold mb-5 ">
              Your cart is empty!
            </h4>
            <Button type="button" asChild>
              <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4">
          <div className="lg:w-[70%] w-full">
            <table className="w-full border">
              <thead className="border-b bg-gray-50 md:table-header-group hidden">
                <tr>
                  <th className="text-start p-3">Product</th>
                  <th className="text-start p-3">Price</th>
                  <th className="text-start p-3">Quantity</th>
                  <th className="text-start p-3">Total</th>
                  <th className="text-start p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product) => (
                  <tr key={product._id} className="md:table-row block border-b">
                    <td className="p-3">
                      <div className="flex items-center gap-5">
                        <Image
                          src={product.image || imgPlaceholder.src}
                          height={60}
                          width={60}
                          alt={product.name}
                        />
                        <div>
                          <h4 className="text-lg font-medium line-clamp-1">
                            <Link href={WEBSITE_PRODUCT_DETAILS(product.url)}>
                              {product.name}
                            </Link>
                          </h4>
                          <p className="text-sm">Color:{product.color}</p>
                          <p className="text-sm">Size:{product.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center">
                      <span className="md:hidden font-[600]">Price</span>
                      <span>
                        {product.sellingPrice.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </td>
                    <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2">
                      <span className="md:hidden font-[600]">Quantity</span>
                      <div className="flex justify-center">
                        <div className="flex justify-center items-center md:h-10 h-7 border w-fit rounded-full">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                decreaseQuantity({
                                  productId: product.productId,
                                  variantId: product.variantId,
                                })
                              )
                            }
                            className="h-full w-10 flex justify-center items-center cursor-pointer "
                          >
                            <FiMinus />
                          </button>
                          <Input
                            type="text"
                            value={product.qty}
                            className="md:w-14 w-8 text-center border-none outline-offset-0"
                            readOnly
                          />
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                increaseQuantity({
                                  productId: product.productId,
                                  variantId: product.variantId,
                                })
                              )
                            }
                            className="h-full w-10 flex justify-center items-center cursor-pointer "
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2">
                      <span className="md:hidden font-[600]">Total</span>
                      <span>
                        {(product.sellingPrice * product.qty).toLocaleString(
                          "en-IN",
                          { style: "currency", currency: "INR" }
                        )}
                      </span>
                    </td>
                    <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2 text-center">
                      <span className="md:hidden font-[600]">Remove</span>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              productId: product.productId,
                              variantId: product.variantId,
                            })
                          )
                        }
                      >
                        <IoCloseCircleOutline />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:w-[30%] w-full">
            <div className="rounded bg-gray-50 p-5 sticky top-5">
              <h4 className="text-lg font-semibold mb-5">Order Summary</h4>
              <div>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="font-[600] py-2">Subtotal</td>
                      <td className="text-end py-2 ">
                        {(subtotal + discount).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                    {delivery > 0 ? (
                      <tr>
                        <td className="font-[600] py-2">Delivery</td>
                        <td className="text-end py-2 ">
                          {delivery.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="font-[600] py-2 text-green-600">
                          Delivery
                        </td>
                        <td className="text-end py-2 text-green-600">FREE</td>
                      </tr>
                    )}
                    {discount > 0 && (
                      <tr>
                        <td className="font-[600] py-2">Discount</td>
                        <td className="text-end py-2 text-green-600">
                          -{" "}
                          {discount.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                    )}
                    {delivery === 0 && subtotal >= 500 && (
                      <tr>
                        <td className="font-[600] py-2 text-green-600">
                          FREE Delivery
                        </td>
                        <td className="text-end py-2 text-green-600">
                          - 80.00
                        </td>
                      </tr>
                    )}
                    <tr className="border-t">
                      <td className="font-[600] py-2 text-lg">Order Total</td>
                      <td className="text-end py-2 text-lg font-bold">
                        {(
                          subtotal + (delivery > 0 ? delivery : 0)
                        ).toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                    {(discount > 0 || delivery === 0) && (
                      <tr>
                        <td colSpan={2} className="text-sm text-green-600 pt-2">
                          You save{" "}
                          {(
                            discount + (delivery === 0 ? 80 : 0)
                          ).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Button
                  type="button"
                  asChild
                  className="w-full bg-black rounded-full mt-5 mb-3"
                >
                  <Link href={WEBSITE_CHECKOUT}>Proceed to Checkout</Link>
                </Button>
                <p className="text-center">
                  <Link href={WEBSITE_SHOP} className="hover:underline">
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
