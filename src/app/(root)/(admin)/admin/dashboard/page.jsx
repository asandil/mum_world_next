"use client";
import React from "react";
import CountOverview from "./CountOverview";
import QuickAdd from "./QuickAdd";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OrderOverview } from "./OrderOverview";
import { OrderStatus } from "./OrderStatus";
import LatestOrder from "./LatestOrder";
import LatestReview from "./LatestReview";
import { ADMIN_ORDER_SHOW, ADMIN_REVIEW_SHOW } from "@/routes/AdminPanelRoute";
import { FaRegEye } from "react-icons/fa6";
import useFetch from "@/hooks/useFetch";

const AdminDashboard = () => {
  const { data: dashboardData, loading } = useFetch("/api/dashboard/admin/all");

  return (
    <div className="pt-5">
      <CountOverview data={dashboardData?.data?.counts} />
      <QuickAdd />
      <div className="mt-10 flex lg:flex-nowrap flex-wrap gap-10">
        <Card className="rounded-lg lg:w-[70%] w-full p-0 ">
          <CardHeader className="py-3 border [.border-b]:pb-3 ">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Order Overview</span>
              <Button type="button">
                <Link
                  href={ADMIN_ORDER_SHOW}
                  className="flex items-center gap-2"
                >
                  <FaRegEye className="!w-5 !h-5" /> <span>View All</span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderOverview data={dashboardData?.data?.monthlySales} />
          </CardContent>
        </Card>
        <Card className="rounded-lg lg:w-[30%] w-full p-0 ">
          <CardHeader className="py-3 border [.border-b]:pb-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Order Overview</span>
              <Button type="button">
                <Link
                  href={ADMIN_ORDER_SHOW}
                  className="flex items-center gap-2"
                >
                  <FaRegEye className="!w-5 !h-5" /> <span>View All</span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <OrderStatus data={dashboardData?.data?.orderStatus} />
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 flex lg:flex-nowrap flex-wrap gap-10">
        <Card className="rounded-lg lg:w-[70%] w-full p-0 block ">
          <CardHeader className="py-3 border [.border-b]:pb-3 ">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Latest Order (20)</span>
              <Button type="button">
                <Link
                  href={ADMIN_ORDER_SHOW}
                  className="flex items-center gap-2"
                >
                  <FaRegEye className="!w-5 !h-5" /> <span>View All</span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-3 lg:h-[350px] overflow-auto ">
            <LatestOrder data={dashboardData?.data?.latestOrders} loading={loading} />
          </CardContent>
        </Card>
        <Card className="rounded-lg lg:w-[30%] w-full p-0 block">
          <CardHeader className="py-3 border [.border-b]:pb-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Latest Review</span>
              <Button type="button">
                <Link
                  href={ADMIN_REVIEW_SHOW}
                  className="flex items-center gap-2"
                >
                  <FaRegEye className="!w-5 !h-5" /> <span>View All</span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-3 px-1 lg:h-[350px] overflow-auto ">
            <LatestReview data={dashboardData?.data?.latestReviews} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
