"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import notFound from "@/assets/images/not-found.png";
import { statusBadge } from "@/lib/helperFunction";
import { ADMIN_ORDER_DETAILS } from "@/routes/AdminPanelRoute";
import Link from "next/link";

const LatestOrder = () => {
  const [latestOrder, setLatestOrder] = useState();
  const { data, loading } = useFetch("/api/dashboard/admin/latest-order");

  console.log("Latest order data:", data);

  useEffect(() => {
    if (data && data.success) {
      setLatestOrder(data.data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!latestOrder || latestOrder.length === 0) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Image
          src={notFound.src}
          width={notFound.width}
          height={notFound.height}
          alt="not-found"
          className="w-20"
        />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order Id</TableHead>
          <TableHead>Payment Id</TableHead>
          <TableHead>Total Item</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {latestOrder?.map((order) => (
          <TableRow key={order._id}>
            <TableCell className=" hover:text-primary hover:underline-offset-2"> <Link href={ADMIN_ORDER_DETAILS(order.order_id)} > {order._id} </Link></TableCell>
            <TableCell>{order.payment_id}</TableCell>
            <TableCell>{order.products.length}</TableCell>
            <TableCell>{statusBadge(order.status)}</TableCell>
            <TableCell>
              {order.totalAmount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LatestOrder;
