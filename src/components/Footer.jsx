import Link from "next/link";
import React from "react";
import TestimonialCarousel from "./Testimonial ";

const Footer = () => {
  return (
    <div>
      <footer className="py-[32px] md:py-[56px] lg:w-[984px] xl:w-[1160px] mx-auto">
        <section>
          <TestimonialCarousel />
        </section>
        <div className="p-[24px]">
          <hr className="border-[1px] border-[rgb(226,226,226)]" />
        </div>

        <div className="p-[24px] md:flex md:justify-between">
          <p className="text-[rgb(89,89,89)] leading-[1.5] font-[400] text-[14px] text-center">
            Copyright © 2023 mumworld.in - All Rights Reserved.
          </p>
          <div className="py-[16px] md:py-[0] flex justify-center">
            <Link href={"https://www.facebook.com/MumWorldIn"} target="_blank">
              <img
                className="inline-block h-[24px] w-[45px]"
                src="/facebook.png"
                alt=""
              />
            </Link>
            <Link
              href={"https://www.instagram.com/mum_world_/"}
              target="_blank"
            >
              <img
                className="inline-block"
                src="/instagram.png"
                height={24}
                width={24}
                alt=""
              />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
