"use client";
import Link from "next/link";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoShirtOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import {
  ADMIN_CATEGORY_SHOW,
  ADMIN_CUSTOMERS_SHOW,
  ADMIN_PRODUCT_SHOW,
} from "@/routes/AdminPanelRoute";

const CountOverview = ({ data }) => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-5">
      <Link href={ADMIN_CATEGORY_SHOW}>
        <div className="flex items-center justify-between p-3 rounded-lg border shadow border-l-4 border-primary/10 bg-primary hover:bg-primary-hover hover:shadow-lg">
          <div className="">
            <h4 className="font-medium text-white ">Total Categories</h4>
            <span className="text-xl font-bold text-white">
              {data?.category || 0}
            </span>
          </div>
          <div>
            <span className="w-12 h-12 border border-[#fff] flex justify-center items-center rounded-full text-white">
              <BiCategory />
            </span>
          </div>
        </div>
      </Link>
      <Link href={ADMIN_PRODUCT_SHOW}>
        <div className="flex items-center justify-between p-3 rounded-lg bg-primary hover:bg-primary-hover hover:shadow-lg">
          <div className="">
            <h4 className="font-medium text-[#fff]">Total Product</h4>
            <span className="text-xl font-bold text-[#fff]">
              {data?.product || 0}
            </span>
          </div>
          <div>
            <span className="w-12 h-12 border border-[#fff] flex justify-center items-center rounded-full text-white">
              <IoShirtOutline />
            </span>
          </div>
        </div>
      </Link>
      <Link href={ADMIN_CUSTOMERS_SHOW}>
        <div className="flex items-center justify-between p-3 rounded-lg bg-primary hover:bg-primary-hover hover:shadow-lg">
          <div className="text-gray-500 dark:text-gray-200">
            <h4 className="font-medium text-[#fff]">Total Customers</h4>
            <span className="text-xl font-bold text-[#fff]">
              {data?.customer || 0}
            </span>
          </div>
          <div>
            <span className="w-12 h-12 border border-[#fff] flex justify-center items-center rounded-full text-white">
              <LuUserRound />
            </span>
          </div>
        </div>
      </Link>
      <Link href="">
        <div className="flex items-center justify-between p-3 rounded-lg bg-primary hover:bg-primary-hover hover:shadow-lg">
          <div className="text-[#fff]">
            <h4 className="font-medium text-[#fff]">Total Orders</h4>
            <span className="text-xl font-bold">
              {data?.order || 0}
            </span>
          </div>
          <div>
            <span className="w-12 h-12 border border-[#fff] flex justify-center items-center rounded-full text-white">
              <MdOutlineShoppingBag />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CountOverview;
