import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import Link from "next/link";
import React from "react";

import shop from "@/assets/images/ShopHeaderImage.png";
import Image from "next/image";

const WebsiteBreadcrumb = ({ props }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
        {/* Background Image */}
        <Image
          src={shop}
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl  font-bold text-center text-white drop-shadow-lg">
            {props.title}
          </h1>
          <ul className="flex flex-wrap justify-center items-center text-white text-sm sm:text-base md:text-lg drop-shadow">
            <li>
              <Link
                href={WEBSITE_HOME}
                className="font-semibold hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            {props.links.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="mx-1">/</span>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBreadcrumb;
