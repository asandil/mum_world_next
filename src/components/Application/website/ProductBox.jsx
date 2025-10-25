import Image from "next/image";
import React from "react";
import imgPlaceholder from "@/assets/images/img-placeholder.webp";
import Link from "next/link";
import { WEBSITE_PRODUCT_DETAILS } from "@/routes/WebsiteRoute";

const ProductBox = ({ product }) => {
  return (
    <div className="rounded-lg hover:shadow-lg">
      <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>
        <Image
          src={product?.media?.[0]?.secure_url || imgPlaceholder.src}
          width={400}
          height={400}
          alt={product?.media?.[0]?.alt || product?.name}
          title={product?.media?.[0]?.title || product?.name}
          className="w-full lg:h-[300px] md:h-[200px] h-[150px] object-cover object-top"
        />
        <div className="p-3 border-t ">
          <h4 className="">{product?.name}</h4>
          <p className=" flex gap-2 mt-2">
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

export default ProductBox;
