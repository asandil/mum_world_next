"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
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
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

// Icons
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/showToast";

const UpdatePassword = ({ email }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], // show error on confirmPassword field
    });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  const handlePasswordUpdate = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const { data: passwordUpdate } = await axios.put(
        `/api/auth/reset-password/update-password`,
        values
      );
      if (!passwordUpdate.success) {
        throw new Error(passwordUpdate.message);
      }
      form.reset();
      showToast("success", passwordUpdate.message);
      router.push(WEBSITE_LOGIN);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Update Password</h1>
          <p>Create new password by filling out the form below.</p>
        </div>
        <div className="mt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePasswordUpdate)}
              className="space-y-8"
            >
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={isTypePassword ? "password" : "text"}
                          placeholder="Enter your Password"
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute top-1/2 right-2 cursor-pointer text-[24px] text-primary hover:text-primary-hover"
                        type="button"
                        onClick={() => setIsTypePassword(!isTypePassword)}
                      >
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={isTypePassword ? "password" : "text"}
                          placeholder="Enter your Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute top-1/2 right-2 cursor-pointer text-[24px] text-primary hover:text-primary-hover"
                        type="button"
                        onClick={() => setIsTypePassword(!isTypePassword)}
                      >
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Update Password"
                  className="w-full cursor-pointer"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
