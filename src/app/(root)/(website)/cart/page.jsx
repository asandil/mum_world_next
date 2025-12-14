"use client";
import WebsiteBreadcrumb from "@/components/Application/website/WebsiteBreadcrumb";
import { Button } from "@/components/ui/button";
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import imgPlaceholder from "@/assets/images/img-placeholder.webp";
import Image from "next/image";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

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

  const [qty, setQty] = useState(1);

  const handleQty = (actionType) => {
    if (actionType === "inc") {
      setQty((prev) => prev + 1);
    } else {
      if (qty !== 1) {
        setQty((prev) => prev - 1);
      }
    }
  };

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
                      {product.sellingPrice.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td className="md:table-cell flex justify-between md:p-3 px-3 pb-2 ">
                      <div>
                      <div className="flex justify-center items-center h-10 border w-fit rounded-full">
                        <button
                          type="button"
                          onClick={() => handleQty("desc")}
                          className="h-full w-10 flex justify-center items-center cursor-pointer "
                        >
                          <FiMinus />
                        </button>
                        <Input
                          type="text"
                          value={qty}
                          className="w-14 text-center border-none outline-offset-0"
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={() => handleQty("inc")}
                          className="h-full w-10 flex justify-center items-center cursor-pointer "
                        >
                          <FaPlus />
                        </button>
                      </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
