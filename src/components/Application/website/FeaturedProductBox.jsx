import Image from "next/image";
import React from "react";
import imgPlaceholder from "@/assets/images/img-placeholder.webp";
import Link from "next/link";
import { WEBSITE_PRODUCT_DETAILS } from "@/routes/WebsiteRoute";

const FeaturedProductBox = ({ product }) => {
  return (
    <div className="rounded-lg shadow-md hover:shadow-xl relative">
      <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>
        <span className=" bg-primary/50 sm:bg-primary text-[13px] sm:text-[14px] text-[#fff] rounded-md px-2 py-0.5 absolute left-1 top-1">
          New Product Added
        </span>
        <Image
          src={product?.media?.[0]?.secure_url || imgPlaceholder.src}
          width={400}
          height={400}
          alt={product?.media?.[0]?.alt || product?.name} 
          title={product?.media?.[0]?.title || product?.name}
          className="w-full lg:h-[300px] md:h-[200px] h-[150px] object-cover object-top rounded-t-lg"
        />
        <div className="p-3 border-t ">
          <h4 className="">{product?.name}</h4>
          <p className=" flex flex-wrap gap-2 mt-2">
            <span className="line-through text-gray-400">
              {product?.mrp.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="font-semibold">
              {product?.sellingPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span></span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedProductBox;
