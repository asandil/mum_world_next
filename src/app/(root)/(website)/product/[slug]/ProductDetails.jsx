"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import Link from "next/link";

const ProductDetails = ({ product, variant, colors, sizes, reviewCount }) => {
  // console.log("product",product)
  // console.log("variant",variant)
  // console.log("colors",colors)
  // console.log("sizes",sizes)
  // console.log("reviewCount",reviewCount)

  return (
    <div className="lg:px-32 px-4">
      <div className="my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}  >{product?.name}</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default ProductDetails;
