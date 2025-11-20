"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { ButtonLoading } from "../ButtonLoading";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LastPage } from "@mui/icons-material";

const ProductReview = ({ productId }) => {
  const auth = useSelector((store) => store.authStore.auth);
  const [loading, setLoading] = useState(false);

  const [currentUrl, setCurrentUrl] = useState("");
  const [isReview, setIsReview] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const formSchema = zSchema.pick({
    product: true,
    userId: true,
    rating: true,
    title: true,
    review: true,
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: productId,
      userId: auth?._id,
      rating: 0,
      title: "",
      review: "",
    },
  });

  useEffect(() => {
    form.setValue("userId", auth?._id);
  }, []);

  const handleReviewSubmit = async (values) => {
    console.log("Add Review data", values);
    try {
      setLoading(true);
      const { data: response } = await axios.post(`/api/review/create`, values);

      if (!response.success) {
        throw new Error(response.message);
      }
      form.reset();
      showToast("success", response.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReview = async (pageParam) => {
    const {data:getReviewData} = await axios.get(`/api/review/get?productId=${productId}&page=${pageParam}`)
    if(!getReviewData.success){
      return
    }

    return getReviewData.data

  }

  const {error, data, isFetching, fetchNextPage, hasNextpage} = useInfiniteQuery({
    queryKey:['prouct-review'],
    queryFn: async({pageParam}) => await fetchReview(pageParam),
    initialPageParam: 0,
    getNextPageParam: (LastPage) => {
      return LastPage.nextpage
    }
  })


  console.log("@@!! Review Data",data)

  return (
    <div className="shadow rounded border mb-20">
      <div className="p-3 bg-gray-50 border-b">
        <h2 className="font-semibold text-2xl">Rating & Reviews</h2>
      </div>
      <div className="p-5">
        <div className="flex justify-between flex-wrap items-center">
          <div className="md:w-1/2 w-full md:flex md:gap-10 md:mb-0 mb-5">
            <div className="md:w-[200px] w-full md:mb-0 mb-5 ">
              <h4 className="text-center text-8xl font-semibold">0.0</h4>
              <div className="flex justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    <IoStar />
                  </span>
                ))}
              </div>
              <p className="text-center mt-3">(00 Rating & Reviews)</p>
            </div>
            <div className="md:w-[calc(100%-200px)] flex items-center">
              <div className="w-full">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <p className="w-3">{rating}</p>
                      <IoStar />
                    </div>
                    <Progress value={15} />
                    <span className="text-sm">15</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full md:text-end text-center">
            <Button
              type="button"
              variant="outline"
              className="md:w-fit w-full py-6 px-10 cursor-pointer"
              onClick={() => setIsReview(!isReview)}
            >
              Write Review  
            </Button>
          </div>
        </div>

        {isReview && (
          <div className="my-5">
            <hr className="mb-5" />
            <h4 className="text-xl font-semibold mb-2 ">Write a Review</h4>
            {!auth ? (
              <>
                <p className="mb-2">Login to submit review</p>
                <Button>
                  <Link href={`${WEBSITE_LOGIN}?callback=${currentUrl}`}>
                    Login
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleReviewSubmit)}
                    className="space-y-8"
                  >
                    <div className="mb-5">
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Rating
                                value={field.value}
                                size="large"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-5">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-5">
                      <FormField
                        control={form.control}
                        name="review"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Review</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Write your comment here.... "
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <ButtonLoading
                        loading={loading}
                        type="submit"
                        text="Submit Review"
                        className=" cursor-pointer"
                      />
                    </div>
                  </form>
                </Form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
