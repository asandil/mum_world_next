"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Logo from "@/assets/images/logo.jpg";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
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
import {
  USER_DASHBOARD,
  WEBSITE_REGISTER,
  WEBSITE_RESETPASSWORD,
} from "@/routes/WebsiteRoute";

// Icons
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import OTPVerification from "@/components/Application/OTPVerification";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/store/reducer/authReducer";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";

const LoginPage = () => {
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [optVerificationLoading, setOptVerificationLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState();

  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(3, { message: "Password field is required." }),
    });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a login submit handler.
  const handleLoginSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const { data: loginResponse } = await axios.post(
        `/api/auth/login`,
        values
      );
      if (!loginResponse.success) {
        throw new Error(loginResponse.message);
      }
      setOtpEmail(values.email);
      form.reset();
      showToast("success", loginResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // otp verification submit handler
  const handleOtpVerification = async (values) => {
    console.log("handleOtpVerification", values);
    try {
      setOptVerificationLoading(true);
      const { data: otpResponse } = await axios.post(
        `/api/auth/verify-otp`,
        values
      );
      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }
      setOtpEmail("");
      showToast("success", otpResponse.message);
      dispatch(login(otpResponse.data));

      if (searchParams.has("callback")) {
        router.push(searchParams.get("callback"));
      } else {
        otpResponse.data.role === "admin"
          ? router.push(ADMIN_DASHBOARD)
          : router.push(USER_DASHBOARD);
      }
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOptVerificationLoading(false);
    }
  };

  return (
    <div>
      <Card className="w-[340px] sm:w-[550px]">
        <CardContent>
          <div className="flex justify-center mb-5">
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[100px]"
            />
          </div>

          {!otpEmail ? (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Login into Account</h1>
                <p>Login into your account by filling out the form below.</p>
              </div>
              <div className="mt-5">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleLoginSubmit)}
                    className="space-y-8"
                  >
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
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type={isTypePassword ? "password" : "text"}
                                  placeholder="Enter your Password"
                                  {...field}
                                />
                              </FormControl>
                              <button
                                className="absolute top-2 right-2 cursor-pointer"
                                type="button"
                                onClick={() =>
                                  setIsTypePassword(!isTypePassword)
                                }
                              >
                                {isTypePassword ? (
                                  <FaRegEyeSlash />
                                ) : (
                                  <FaRegEye />
                                )}
                              </button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-3">
                      <ButtonLoading
                        loading={loading}
                        type="submit"
                        text="Login"
                        className="w-full cursor-pointer"
                      />
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center items-center gap-1">
                        <p>Don't have account?</p>
                        <Link
                          href={WEBSITE_REGISTER}
                          className="text-primary underline"
                        >
                          Create account
                        </Link>
                      </div>
                      <div className="mt-3">
                        <Link
                          href={WEBSITE_RESETPASSWORD}
                          className="text-primary underline"
                        >
                          Forget password?
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            <>
              <OTPVerification
                email={otpEmail}
                loading={optVerificationLoading}
                onSubmit={handleOtpVerification}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
