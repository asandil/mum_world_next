"use client";
// React & Next.js imports
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// External libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// UI components
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Custom components & utilities
import { ButtonLoading } from "@/components/Application/ButtonLoading";
import { zSchema } from "@/lib/zodSchema";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

// Assets
import Logo from "@/assets/images/logo.jpg";
import OTPVerification from "@/components/Application/OTPVerification";
import UpdatePassword from "@/components/Application/UpdatePassword";
import { showToast } from "@/lib/showToast";
import axios from "axios";

const ResetPassword = () => {
  const [emailVerificationLoading, setEmailVerificationLoading] =
    useState(false);
  const [optVerificationLoading, setOptVerificationLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState();
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const formSchema = zSchema.pick({ email: true });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // handle email verification
  const handleEmailVerification = async (values) => {
    try {
      setEmailVerificationLoading(true);
      const { data: sendOtpResponse } = await axios.post(
        `/api/auth/reset-password/send-otp`,
        values
      );
      if (!sendOtpResponse.success) {
        throw new Error(sendOtpResponse.message);
      }
      setOtpEmail(values.email)
      showToast("success", sendOtpResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setEmailVerificationLoading(false);
    }
  };

  // handle otp verification
  const handleOtpVerification = async (values) => {
    try {
      setOptVerificationLoading(true);
      const { data: otpResponse } = await axios.post(
        `/api/auth/reset-password/verify-otp`,
        values
      );
      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }
      showToast("success", otpResponse.message);
      setIsOtpVerified(true);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOptVerificationLoading(false);
    }
  };

  return (
    <>
      <Card className="w-[450px]">
        <CardContent>
          <div>
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[150px]"
            />
          </div>

          {!otpEmail ? (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Reset Password</h1>
                <p>Enter your email for pasword reset.</p>
              </div>
              <div className="mt-5">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleEmailVerification)}
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
                    <div className="mb-3">
                      <ButtonLoading
                        loading={emailVerificationLoading}
                        type="submit"
                        text="Send OTP"
                        className="w-full cursor-pointer"
                      />
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center items-center gap-1">
                        <Link
                          href={WEBSITE_LOGIN}
                          className="text-primary underline"
                        >
                          Back To Login
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            <>
              {!isOtpVerified ? (
                <OTPVerification
                  email={otpEmail}
                  loading={optVerificationLoading}
                  onSubmit={handleOtpVerification}
                />
              ) : (
                <UpdatePassword email={otpEmail} />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPassword;
