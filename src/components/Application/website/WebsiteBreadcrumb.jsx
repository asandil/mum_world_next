import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import Link from "next/link";
import React from "react";

import shop from "@/assets/images/shop.png";
import Image from "next/image";

const WebsiteBreadcrumb = ({ props }) => {
  return (
    <div className="py-10 flex justify-center items-center relative h-[25vh] min-h-[200px]">
      {/* Background Image */}
      <Image
        src={shop}
        alt="Background"
        fill
        className="object-fill -z-10 "
        priority
      />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-2xl font-semibold mb-2 text-center text-white">
          {props.title}
        </h1>
        <ul className="flex gap-2 justify-center text-white">
          <li>
            <Link href={WEBSITE_HOME} className="font-semibold">
              Home
            </Link>
          </li>
          {props.links.map((item, index) => (
            <li key={index}>
              <span className="me-1">/</span>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebsiteBreadcrumb;
