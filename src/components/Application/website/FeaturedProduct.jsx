"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import FeaturedProductBox from "./FeaturedProductBox";

const FeaturedProduct = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured-product`,
        );
        console.log("Featured Product Data in Home Page", data);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setProductData({ success: false });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="xl:px-32 lg:px-10 px-4 sm:py-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="sm:text-4xl text-2xl font-semibold">
            Featured Products
          </h2>
          <Link
            href=""
            className="flex items-center gap-2 underline underline-offset-4 text-primary hover:text-primary-hover"
          >
            View All
            <IoIosArrowRoundForward />
          </Link>
        </div>
        <div className="text-center py-8">Loading...</div>
      </section>
    );
  }

  if (!productData) return null;

  return (
    <section className="xl:px-32 lg:px-10 px-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[22px] text-black font-semibold">
          Featured Products
        </h2>
        <Link
          href={WEBSITE_SHOP}
          className="flex items-center gap-2 underline underline-offset-4 text-primary hover:text-primary-hover"
        >
          View All
          <IoIosArrowRoundForward size={28} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-4 lg:grid-cols-5 grid-cols-2 xl:gap-10 sm:gap-5 gap-3">
        {!productData.success && <div>Data Not Found.</div>}
        {productData.success &&
          productData.data.map((product) => (
            <FeaturedProductBox key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;