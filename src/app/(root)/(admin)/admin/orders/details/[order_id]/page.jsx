"use client";
import React, { use, useEffect, useState } from "react";
import imgPlaceholder from "@/assets/images/img-placeholder.webp";
import Image from "next/image";
import Link from "next/link";
import { WEBSITE_PRODUCT_DETAILS } from "@/routes/WebsiteRoute";
import { ButtonLoading } from "@/components/Application/ButtonLoading";
import PrintButton from "@/components/Application/website/PrintOrderDetails";
import { MdOutgoingMail } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";
import useFetch from "@/hooks/useFetch";
import { ADMIN_DASHBOARD, ADMIN_ORDER_SHOW } from "@/routes/AdminPanelRoute";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import Select from "@/components/Application/Select";
import { orderStatus } from "@/lib/utils";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_ORDER_SHOW, label: "Orders" },
  { href: "", label: "Order Details" },
];

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Unverified", value: "unverified" },
];

const OrderDetails = ({ params }) => {
  const { order_id } = use(params);
  const [orderData, setOrderData] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const { data, loading } = useFetch(`/api/orders/get/${order_id}`);

  console.log("Order Data in Admin Page.", data);

  useEffect(() => {
    if (data && data.success) {
      setOrderData(data?.data);
      setOrderStatus(data?.data?.status);
    }
  }, [data]);

  const handleOrderStatus = async () => {};

  // Define status progression
  // const statusSteps = [
  //   { status: "pending", label: "Pending", step: 1 },
  //   { status: "confirmed", label: "Confirmed", step: 2 },
  //   { status: "processing", label: "Processing", step: 3 },
  //   { status: "shipped", label: "Shipped", step: 4 },
  //   { status: "delivered", label: "Delivered", step: 5 },
  // ];

  // Find current status step
  // const currentStatus = orderData?.data?.status?.toLowerCase() || "pending";
  // const currentStep =
  //   statusSteps.find((step) => step.status === currentStatus)?.step || 1;

  return (
    <div>
      <BreadCrumb breadCrumbData={breadcrumbData} />
      <div className="lg:px-0 px-0 my-0">
        {!orderData ? (
          <div className="flex justify-center items-center py-32">
            <h4 className="text-red-500 text-xl font-semibold">
              Order Not Found
            </h4>
          </div>
        ) : (
          <div>
            {/* Order Status Progress Bar */}
            <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Order Id: #{orderData?.order_id}
                  </h2>
                </div>
                {/* <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : currentStatus === "confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : currentStatus === "processing"
                        ? "bg-purple-100 text-purple-800"
                        : currentStatus === "shipped"
                        ? "bg-indigo-100 text-indigo-800"
                        : currentStatus === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {currentStatus.charAt(0).toUpperCase() +
                      currentStatus.slice(1)}
                  </span>
                </div> */}
              </div>

              {/* Progress Bar */}
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
                {/* <div
                  className="absolute top-5 left-0 h-1 bg-green-500 transition-all duration-500"
                  style={{
                    width: `${
                      ((currentStep - 1) / (statusSteps.length - 1)) * 100
                    }%`,
                  }}
                ></div> */}

                {/* Status Steps */}
                {/* <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => (
                    <div
                      key={step.status}
                      className="flex flex-col items-center relative"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 mb-2 ${
                          step.step <= currentStep
                            ? "bg-green-500 text-white border-2 border-green-500"
                            : "bg-white text-gray-400 border-2 border-gray-300"
                        }`}
                      >
                        {step.step <= currentStep ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        ) : (
                          <span className="text-sm font-medium">
                            {step.step}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          step.step <= currentStep
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Status Description */}
              <div className="mt-8 p-4 bg-[#EEE7E7] rounded-lg">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#F69E87] mt-0.5 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {/* <div>
                    <p className="text-sm text-[#F69E87]">
                      {currentStatus === "pending" &&
                        "Your order has been received and is awaiting confirmation."}
                      {currentStatus === "confirmed" &&
                        "Your order has been confirmed and is being prepared for processing."}
                      {currentStatus === "processing" &&
                        "Your order is being processed. We'll notify you when it ships."}
                      {currentStatus === "shipped" &&
                        "Your order has been shipped! Track your package for delivery updates."}
                      {currentStatus === "delivered" &&
                        "Your order has been delivered. Thank you for shopping with us!"}
                      {![
                        "pending",
                        "confirmed",
                        "processing",
                        "shipped",
                        "delivered",
                      ].includes(currentStatus) &&
                        `Your order status is: ${currentStatus}`}
                    </p>
                  </div> */}
                </div>
              </div>

              {/* Order Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2 text-[#F69E87]">
                    <MdOutgoingMail size={32} />
                    <span className="text-sm font-medium text-gray-700">
                      Email
                    </span>
                  </div>
                  <p className="text-gray-900">{orderData?.email}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2 text-[#F69E87]">
                    <FiPhone size={32} />
                    <span className="text-sm font-medium text-gray-700">
                      Phone
                    </span>
                  </div>
                  <p className="text-gray-900">{orderData?.phone}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2 text-[#F69E87]">
                    <TbTransactionDollar size={32} />
                    <span className="text-sm font-medium text-gray-700">
                      Transaction ID
                    </span>
                  </div>
                  <p className="text-gray-900">{orderData?.payment_id}</p>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <table className="w-full rounded-lg shadow-sm ">
              <thead className="border-b bg-gray-50 dark:bg-card md:table-header-group hidden">
                <tr>
                  <th className="text-start p-3">Product</th>
                  <th className="text-center p-3">Price</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderData &&
                  orderData?.products?.map((product) => (
                    <tr
                      key={product.variantId._id}
                      className="md:table-row block border-b"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-5">
                          <Image
                            src={
                              product?.variantId?.media[0]?.secure_url ||
                              imgPlaceholder.src
                            }
                            width={60}
                            height={60}
                            alt="product"
                            className="rounded"
                          />
                          <div>
                            <h4 className="text-lg">
                              <Link
                                href={WEBSITE_PRODUCT_DETAILS(
                                  product?.productId?.slug
                                )}
                              >
                                {product?.productId?.name}
                              </Link>
                              <p>Color: {product?.variantId?.color}</p>
                              <p>Size: {product?.variantId?.size}</p>
                            </h4>
                          </div>
                        </div>
                      </td>
                      <td className="md:table-cell flex justify-between md:mb-3 px-3 pb-2 text-center">
                        <span className="md:hidden  font-medium">Price</span>
                        <span>
                          {product.sellingPrice.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </span>
                      </td>
                      <td className="md:table-cell flex justify-between md:mb-3 px-3 pb-2 text-center">
                        <span className="md:hidden  font-medium">Quantity</span>
                        <span>{product.qty}</span>
                      </td>
                      <td className="md:table-cell flex justify-between md:mb-3 px-3 pb-2 text-center">
                        <span className="md:hidden  font-medium">Total</span>
                        <span>
                          {product.qty *
                            product.sellingPrice.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-10">
              <div className="p-5 rounded-lg border shadow-sm">
                <h4 className="text-lg font-semibold mb-5">Shipping Address</h4>
                <div>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="font-medium py-2">Name:-</td>
                        <td className="text-end py-2">{orderData?.name}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Email:-</td>
                        <td className="text-end py-2">{orderData?.email}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Phone:-</td>
                        <td className="text-end py-2">{orderData?.phone}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Address:-</td>
                        <td className="text-end py-2">{orderData?.address}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Street:-</td>
                        <td className="text-end py-2">{orderData?.street}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Country:-</td>
                        <td className="text-end py-2">{orderData?.country}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">State:-</td>
                        <td className="text-end py-2">{orderData?.state}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">City:-</td>
                        <td className="text-end py-2">{orderData?.city}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">PineCode:-</td>
                        <td className="text-end py-2">{orderData?.pincode}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">LandMark:-</td>
                        <td className="text-end py-2">{orderData?.landmark}</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">OrderNote:-</td>
                        <td className="text-end py-2">
                          {orderData?.ordernote || "---"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-5 bg-gray-50 dark:bg-card rounded-lg border shadow-sm">
                <h4 className="text-lg font-semibold mb-5">Order Summary</h4>
                <div>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="font-medium py-2">Subtotal:-</td>
                        <td className="text-end py-2">
                          {orderData?.subtotal.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Discount:-</td>
                        <td className="text-end py-2">
                          {orderData?.discount.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Coupon Discount:-</td>
                        <td className="text-end py-2">
                          {orderData?.couponDiscountAmount.toLocaleString(
                            "en-IN",
                            {
                              style: "currency",
                              currency: "INR",
                            }
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2">Total:-</td>
                        <td className="text-end py-2">
                          {orderData?.totalAmount.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr />

                <div className="pt-3">
                  <h4 className="text-lg font-semibold mb-2">Order Status</h4>
                  <Select
                    options={statusOptions}
                    selected={orderStatus}
                    setSelected={(value) => setOrderStatus(value)}
                    placeholder="Select"
                    isMulti={false}
                  />
                  <ButtonLoading
                    type="button"
                    onClick={handleOrderStatus}
                    text="Save Status"
                    className="mt-5 cursor-pointer"
                  />
                </div>

                <div className="w-full flex justify-between">
                  <ButtonLoading
                    type="button"
                    text="Cancel"
                    variant="destructive"
                    className="cursor-pointer"
                  />
                  <PrintButton orderData={orderData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
