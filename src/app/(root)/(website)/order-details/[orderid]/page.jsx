import WebsiteBreadcrumb from "@/components/Application/website/WebsiteBreadcrumb";
import axios from "axios";
import React from "react";

const OrderDetails = async ({ params }) => {
  const { orderid } = await params;
  const { data: orderData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/get/${orderid}`
  );

  const breadCrumb = {
    title: "Order Details",
    links: [{ label: "Order Details" }],
  };

  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumb} />
      <div className="lg:px-32 px-5 my-20">
        {orderData && !orderData.success ? (
          <div className="flex justify-center items-center py-32">
            <h4 className="text-red-500 text-xl font-semibold">
              Order Not Found
            </h4>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <p>
                <b>Order Id:</b>
                {orderData?.data?.order_id}
              </p>
              <p>
                <b>Transaction Id:</b>
                {orderData?.data?.payment_id}
              </p>
              <p className="capitalize">
                <b>Status:</b>
                {orderData?.data?.status}
              </p>
            </div>
            <table className="w-full border" >

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
