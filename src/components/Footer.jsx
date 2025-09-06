import Link from "next/link";
import React from "react";
import { SiGmail } from "react-icons/si";
import { MdOutgoingMail } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { FaClock } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
const Footer = () => {
  return (
    <div>
      <footer className=" md:py-[56px] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px] lg:px-[0px]">
        <div className="">
          <hr className="border-[1px] border-[rgb(226,226,226)]" />
        </div>

        <div className="py-[24px] sm:flex sm:flex-row justify-between flex-col ">
          <a
            href="mailto:mumworld.in@gmail.com"
            className=" text-[#F69E87] mb-2 sm:mb-0 leading-[1.5] font-[400] text-start sm:text-start text-[16px] flex items-center"
          >
            <MdOutgoingMail size={32} />
            <p className="text-[rgb(94,94,94)]">mumworld.in@gmail.com</p>
          </a>

          <div className="flex sm:items-center mb-2 sm:mb-0 gap-[8px] sm:gap-[4px] mt-[4px] sm:mt-[0px] ml-[4px]">
            {/* <FaClock color="F69E87"/> */}
            <FaClockRotateLeft
              size={20}
              color="#F69E87"
              className="mt-[2px] sm:mt-[0px]"
            />
            <div className="flex flex-wrap leading-[1.5] font-[400] text-[rgb(94,94,94)] text-[16px]">
              <p className="font-[700] mr-[4px]">Center Hours:</p>
              <p  >Monday - Friday: 9am - 5pm</p>
            </div>
          </div>

          <div className="py-[1px] md:py-[0] flex justify-start mb-2 sm:mb-0 ">
            <Link href={"https://wa.me/918010213009"} target="_blank">
              <img
                className="inline-block h-[30px] w-[30px]"
                src="/whatsapp.webp"
                height={30}
                width={30}
                alt=""
              />
            </Link>
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
        <p className="text-[rgb(89,89,89)] leading-[1.5] font-[400] text-[14px] text-start">
          Copyright © 2023 mumworld.in - All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
