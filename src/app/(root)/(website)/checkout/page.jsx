"use client";
import WebsiteBreadcrumb from "@/components/Application/website/WebsiteBreadcrumb";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { addIntoCart, clearCart } from "@/store/reducer/cartReducer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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

  console.log("Checkout Data from Cart-Verification API ", getVerifiedCartData);

  useEffect(() => {
    if (getVerifiedCartData && getVerifiedCartData.success) {
      const cartData = getVerifiedCartData.data;
      setVerifiedCartData(cartData);
      dispatch(clearCart());
      cartData.forEach((cartItem) => {
        dispatch(addIntoCart(cartItem));
      });
    }
  }, [getVerifiedCartData]);

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
          <div className="lg:w-[70%] w-full"></div>
          <div className="lg:w-[30%] w-full">
            <div className="rounded bg-gray-50 p-5 sticky top-5">
              <h4 className="text-lg font-semibold mb-5">Order Summary</h4>
              <div>
                <table className="w-full border">
                  <tbody>
                    {verifiedCartData &&
                      verifiedCartData?.map((product) => (
                        <tr key={product.variantId}>
                          <td className="p-3">
                            <div></div>
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
                      <td className="font-[600] py-2">Delivery</td>
                      <td className="text-end py-2 "></td>
                    </tr>

                    <tr>
                      <td className="font-[600] py-2 text-green-600">
                        Delivery
                      </td>
                      <td className="text-end py-2 text-green-600">FREE</td>
                    </tr>

                    <tr>
                      <td className="font-[600] py-2">Discount</td>
                      <td className="text-end py-2 text-green-600"></td>
                    </tr>

                    <tr className="border-t">
                      <td className="font-[600] py-2 text-lg">Order Total</td>
                      <td className="text-end py-2 text-lg font-bold"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
