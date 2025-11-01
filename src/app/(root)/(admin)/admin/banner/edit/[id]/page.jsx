"use client";
import { ADMIN_BANNER_SHOW, ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
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
import axios from "axios";
import { showToast } from "@/lib/showToast";
import { useParams, useRouter } from "next/navigation";
import MediaModal from "@/components/Application/Admin/MediaModal";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_BANNER_SHOW, label: "Banner" },
  { href: "", label: "Edit Banner" },
];

const EditBanner = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(false);

  const { data: getBanner, loading: getBannerLoading } = useFetch(
    `/api/banner/get/${id}`
  );
  console.log("Get Banner by ID in Banner Edit Page", getBanner);

  // Media modal states
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  const formSchema = zSchema.pick({
    _id: true,
    name: true,
    discountPercentage: true,
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      name: "",
      discountPercentage: 0,
    },
  });

  console.log("Add Banner Form", form);

  useEffect(() => {
    if (getBanner && getBanner.success) {
      const banner = getBanner.data;
      form.reset({
        _id: banner?._id,
        name: banner?.name,
        discountPercentage: banner?.discountPercentage,
      });

      if (banner.media) {
        const media = banner.media.map((media) => ({
          _id: media._id,
          url: media.secure_url,
        }));
        setSelectedMedia(media);
      }
    }
  }, [getBanner]);

  // 2. Define a login submit handler.
  const onSubmit = async (values) => {
    console.log("Add banner data", values);
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
                        <FormLabel>
                          Banner Name<span className="text-red-500">*</span>{" "}
                        </FormLabel>
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

              <div className="md:col-span-2 border border-dashed rounded p-5 text-center ">
                <MediaModal
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
                          className="size-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div
                  onClick={() => setOpen(true)}
                  className="bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer"
                >
                  <span className="font-semibold">Select Media</span>
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

export default EditBanner;
