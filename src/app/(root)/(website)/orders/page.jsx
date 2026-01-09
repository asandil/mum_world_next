"use client";
import UserPanelLayout from "@/components/Application/website/UserPanelLayout";
import WebsiteBreadcrumb from "@/components/Application/website/WebsiteBreadcrumb";
import useFetch from "@/hooks/useFetch";
import { WEBSITE_ORDER_DEATILS } from "@/routes/WebsiteRoute";
import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const breadCrumbData = {
  title: "Orders",
  links: [{ label: "Orders" }],
};

const Orders = () => {
  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className="shadow rounded">
          <div className="p-5 text-xl font-semibold border flex gap-2">
            <HiOutlineShoppingBag className="text-primary" size={30} />
            <span>Orders</span>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-start p-2 text-sm border-b text-nowrap text-gray-500">
                  Sr.No
                </th>
                <th className="text-start p-2 text-sm border-b text-nowrap text-gray-500">
                  Order id
                </th>
                <th className="text-start p-2 text-sm border-b text-nowrap text-gray-500">
                  Total Item
                </th>
                <th className="text-start p-2 text-sm border-b text-nowrap text-gray-500">
                  Amount
                </th>
              </tr>
            </thead>
            
          </table>
        </div>
      </UserPanelLayout>
    </div>
  );
};

export default Orders;
