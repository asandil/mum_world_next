"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { ButtonLoading } from "@/components/Application/ButtonLoading";

// Icons
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Star Rating Component
const StarRating = ({ value, onChange, maxStars = 5 }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className="text-2xl focus:outline-none"
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => {
              // Optional: Add hover effect
              document
                .querySelectorAll(".star-rating button")
                .forEach((btn, i) => {
                  if (i <= index) {
                    btn.classList.add("text-yellow-500");
                    btn.classList.remove("text-gray-300");
                  }
                });
            }}
            onMouseLeave={() => {
              // Reset to current value
              document
                .querySelectorAll(".star-rating button")
                .forEach((btn, i) => {
                  if (i < value) {
                    btn.classList.add("text-yellow-500");
                    btn.classList.remove("text-gray-300");
                  } else {
                    btn.classList.add("text-gray-300");
                    btn.classList.remove("text-yellow-500");
                  }
                });
            }}
          >
            {ratingValue <= value ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-gray-300" />
            )}
          </button>
        );
      })}
      <span className="ml-2 text-sm text-gray-600">
        {value} / {maxStars}
      </span>
    </div>
  );
};

const FeedBackForm = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = zSchema
    .pick({
      email: true,
      name: true,
      bio: true,
      feedBackCategory: true,
      feedBackAddress: true,
      feedBackCity: true,
    })
    .extend({
      rating: z
        .number()
        .min(1, "Rating is required")
        .max(5, "Maximum rating is 5"),
    });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      feedBackCategory: "",
      rating: 0,
      feedBackAddress: "",
      feedBackCity: "",
    },
  });

  // 2. Define a submit handler.
  const handleFeedbackSubmit = async (values) => {
    console.log("Submitting feedback:", values);

    try {
      setLoading(true);

      const { data: feedbackResponse } = await axios.post(
        `/api/feedback`, // Your new API route
        values
      );

      if (!feedbackResponse.success) {
        throw new Error(feedbackResponse.message);
      }

      form.reset();
      showToast("success", feedbackResponse.message);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      showToast("error", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardContent>
          <div className="mt-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFeedbackSubmit)}
                className="space-y-8"
              >
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your name"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="mumWorld@gmail.com"
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
                    name="feedBackCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>FeedBack Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a feedBack category to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="General Feedback">
                              General Feedback
                            </SelectItem>
                            <SelectItem value="Content Suggestion">
                              Content Suggestion
                            </SelectItem>
                            <SelectItem value="Medical Information">
                              Medical Information
                            </SelectItem>
                            <SelectItem value="Nutrition & Diet">
                              Nutrition & Diet
                            </SelectItem>
                            <SelectItem value="Pregnancy Fitness">
                              Pregnancy Fitness
                            </SelectItem>
                            <SelectItem value="Mental Health">
                              Mental Health
                            </SelectItem>
                            <SelectItem value="Birth Preparation">
                              Birth Preparation
                            </SelectItem>
                            <SelectItem value="Postpartum Care">
                              Postpartum Care
                            </SelectItem>
                            <SelectItem value="Community Support">
                              Community Support
                            </SelectItem>
                            <SelectItem value="Technical Issue">
                              Technical Issue
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="feedBackAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your address"
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
                    name="feedBackCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your city name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-5 ">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div className="star-rating">
                            <StarRating
                              value={field.value}
                              onChange={field.onChange}
                              maxStars={5}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => {
                      const [wordCount, setWordCount] = useState(0);

                      const handleChange = (e) => {
                        field.onChange(e); // keep form state in sync
                        const words = e.target.value
                          .trim()
                          .split(/\s+/)
                          .filter(Boolean).length;
                        setWordCount(words);
                      };

                      return (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little bit about yourself"
                              className="resize-none"
                              {...field}
                              onChange={handleChange}
                            />
                          </FormControl>
                          <div className="text-right text-sm text-gray-500 mt-1">
                            {wordCount} / 150 words
                          </div>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="mb-3">
                  <ButtonLoading
                    loading={loading}
                    type="submit"
                    text="Create Account"
                    className="w-full cursor-pointer"
                  />
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FeedBackForm;
