"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
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
import { showToast } from "@/lib/showToast";
import { zSchema } from "@/lib/zodSchema";
import MediaModel from "@/models/Media.model";
import { ADMIN_BANNER_SHOW, ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_BANNER_SHOW, label: "Banner" },
  { href: "", label: "Edit Banner" },
];

const EditBanner = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);

  const { data: bannerData } = useFetch(`/api/banner/get/${id}`);
  console.log("Get Banner Data by ID in Banner Edit Page.", bannerData);

  const [loading, setLoading] = useState(false);

  // Media model states
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  const formSchema = zSchema.pick({
    _id: true,
    name: true,
    discountPercentage: true,
  });

  // 1. Define your form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      name: "",
      discountPercentage: 0,
    },
  });

  console.log("Add Banner Form Data.", form);

  useEffect(() => {
    if (bannerData && bannerData.success) {
      const data = bannerData.data;
      form.reset({
        _id: data?._id,
        name: data?.name,
        discountPercentage: data?.discountPercentage,
      });
      if (data.media) {
        const media = data.media.map((media) => ({
          _id: media._id,
          url: media.secure_url,
        }));
        setSelectedMedia(media);
      }
    }
  }, [bannerData]);

  // 2. Define a login submit handler
  const onSubmit = async (values) => {
    console.log("Add Banner Data.", values);
    setLoading(true);
    try {
      if (selectedMedia.length <= 0) {
        return showToast("error", "Please select media.");
      }

      const mediaIds = selectedMedia.map((media) => media._id);
      values.media = mediaIds;

      const { data: response } = await axios.put(`/api/banner/update`, values);
      if (!response.success) {
        throw new Error(response.message);
      }
      showToast("success", response.message);
      router.push(ADMIN_BANNER_SHOW);
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
          <h4 className="text-xl font-semibold">Edit Banner</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8 grid md:grid-cols-2 grid-cols-1 gap-5 ">
                <div className="">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter banner name"
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
              </div>
              <div className="md:col-span-2 border border-dashed rounded p-5 text-center">
                <MediaModel
                  open={open}
                  setOpen={setOpen}
                  selectedMedia={selectedMedia}
                  setSelectedMedia={setSelectedMedia}
                  isMultiple={true}
                />
                {selectedMedia.length > 0 && (
                  <div className="flex justify-center items-center flex-wrap mb-3 gap-2">
                    {selectedMedia.map((media) => (
                      <div key={media._id} className="h-24 w-24 border">
                        <Image
                          src={media.url}
                          height={100}
                          width={100}
                          alt=""
                          className="size-full objetc-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBanner;
