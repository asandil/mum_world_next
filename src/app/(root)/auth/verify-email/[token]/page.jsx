"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import verifiedImg from "@/assets/images/verified.gif";
import verificationFailedImg from "@//assets/images/verification-failed.gif";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";

const EmailVerification = ({ params }) => {
  const { token } = use(params);
  console.log("token", token);

  const [isVerfied, setIsverified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const { data: verificationResponse } = await axios.post(
        "/api/auth/verify-email",
        { token },
      );
      if (verificationResponse.success) {
        setIsverified(true);
      }
    };

    verify();
  }, [token]);

  return (
    <Card className="w-[400px]">
      <CardContent>
        {isVerfied ? (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verifiedImg.src}
                alt="verification success"
                height={verifiedImg.height}
                width={verifiedImg.width}
                className="h-[200px] w-auto"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-500 my-5 ">
                Email verification success!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verificationFailedImg.src}
                alt="verification failed"
                height={verificationFailedImg.height}
                width={verificationFailedImg.width}
                className="h-[200px] w-auto"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500 my-5">
                Email verification failed!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailVerification;
