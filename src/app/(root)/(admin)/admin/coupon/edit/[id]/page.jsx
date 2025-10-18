"use client";
import {
  ADMIN_COUPON_SHOW,
  ADMIN_DASHBOARD,
} from "@/routes/AdminPanelRoute";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ButtonLoading } from "@/components/Application/ButtonLoading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imgPlaceholder from "@/assets/images/img-placeholder.webp";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import Select from "@/components/Application/Select";
import Editor from "@/components/Application/Admin/Editor";
import MediaModal from "@/components/Application/Admin/MediaModal";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_COUPON_SHOW, label: "Coupon" },
  { href: "", label: "Edit Coupon" },
];

const EditCoupon = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(false);

  const { data: getCoupon, loading: getProductLoading } = useFetch(
    `/api/coupon/get/${id}`
  );
  console.log("Get Coupon by ID in Product Edit Page", getCoupon);



  const formSchema = zSchema.pick({
    _id: true,
    code: true,
    discountPercentage: true,
    minShoppingAmount: true,
    validity: true,
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      code: "",
      discountPercentage: "",
      minShoppingAmount: "",
      validity: 0,
    },
  });

  console.log("Update Coupon Form", form);

  useEffect(() => {
    if (getCoupon && getCoupon.success) {
      const couponData = getCoupon.data;
      // Format the date for the date input
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };
      form.reset({
        _id: couponData?._id,
        code: couponData?.code,
        minShoppingAmount: couponData?.minShoppingAmount,
        discountPercentage: couponData?.discountPercentage,
        validity: formatDate(couponData.validity),
      });
    }
  }, [getCoupon]);

  // 2. Define a login submit handler.
  const onSubmit = async (values) => {
    console.log("Update coupon data", values);
    setLoading(true);
    try {
      const { data: response } = await axios.put(`/api/coupon/update`, values);
      if (!response.success) {
        throw new Error(response.message);
      }
      showToast("success", response.message);
      router.push(ADMIN_COUPON_SHOW);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <Card className="py-0 rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <h4 className="text-xl font-semibold">Edit Coupon</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8 grid md:grid-cols-2 gap-5 ">
                <div className="">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Code<span className="text-red-500">*</span>{" "}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Code name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Discount Percentage
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Discount Percentage"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    control={form.control}
                    name="minShoppingAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Min Shopping Amount
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Min Shopping Amount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    control={form.control}
                    name="validity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Validity
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Enter Validity"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mb-3 mt-5">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Save Changes"
                  className=" cursor-pointer"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCoupon;
