import React from "react";
import logo from "@/assets/images/footer_logo.svg";
import Image from "next/image";
import {
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_REGISTER,
} from "@/routes/WebsiteRoute";
import Link from "next/link";
// import { IoLocationOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { TiSocialFacebookCircular } from "react-icons/ti";

import { SiGmail } from "react-icons/si";
import { MdOutgoingMail } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { FaClock } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="flex xl:flex-row flex-col py-10 lg:px-32 px-4 xl:justify-between justify-center items-center gap-8">
        <div className=" mt-[-48px]">
          <Image
            src={logo}
            alt="logo"
            width={383}
            height={146}
            className="w-42"
          />
          <div className="flex flex-col">
            <p className="text-[24px] text-center xl:text-start font-[600]">
              Mumworld.in
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 text-center sm:text-start gap-2 sm:gap-4 xl:gap-10">
          <div>
            <h4 className="text-[18px] font-bold uppercase mb-2">Categories</h4>
            <ul>
              <li className=" mb-0 sm:mb-2 text-gray-500">
                <Link href="">T-shirt</Link>
              </li>
              <li className="mb-0 sm:mb-2 text-gray-500">
                <Link href="">Hoodies</Link>
              </li>
              <li className="mb-0 sm:mb-2 text-gray-500">
                <Link href="">Oversized</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href="">Full Sleeves</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href="">Polo</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold uppercase mb-2">
              Userfull Links
            </h4>
            <ul>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href={WEBSITE_HOME}>Home</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href="">Shop</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href="/about">About</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href={WEBSITE_REGISTER}>Register</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href={WEBSITE_LOGIN}>Login</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold uppercase mb-2">
              Help Center
            </h4>
            <ul>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href="">Register</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href="">Login</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href="">My Account</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href={WEBSITE_REGISTER}>Privacy Policy</Link>
              </li>
              <li className="mb-0 md:mb-2 text-gray-500">
                <Link href="">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold uppercase mb-2">Contact Us</h4>
            <ul>
              <li className="mb-1 md:mb-2 text-gray-500 flex items-center gap-2 ">
                <FaClockRotateLeft
                  size={24}
                  color="#F69E87"
                  className="mt-[2px] sm:mt-[0px]"
                />
                <span className="text-[16px]">Monday - Friday : 9am - 5pm</span>
              </li>
              <li className="mb-1 md:mb-2 text-gray-500 flex items-center gap-2 ">
                <MdOutlinePhone size={28} className="text-primary" />
                <Link
                  href="tel:+91-8569874589"
                  className="hover:text-primary text-[16px]"
                >
                  91-8569874589
                </Link>
              </li>
              <li className="mb-1 md:mb-2 text-gray-500 flex items-center gap-2 ">
                <MdOutgoingMail size={32} className="text-primary" />
                <Link
                  href="mailto:mumworld.in@gmail.com"
                  className="hover:text-primary text-[16px]"
                >
                  <span>mumworld.in@gmail.com</span>
                </Link>
              </li>
              <li className="mb-1 md:mb-2 text-gray-500 flex gap-1">
                <FaLocationDot size={28} className="text-primary" />
                <span className=" hover:text-primary text-[16px]">
                  Mumworld market Noida, India 201310
                </span>
              </li>
            </ul>
            <div className="flex gap-5 mt-5">
              <Link
                href={"https://www.instagram.com/mum_world_/"}
                target="_blank"
              >
                <FaInstagram className="text-primary" size={25} />
              </Link>
              <Link href={"https://wa.me/918010213009"} target="_blank">
                <FaWhatsapp className="text-primary" size={25} />
              </Link>
              <Link
                href={"https://www.facebook.com/MumWorldIn"}
                target="_blank"
              >
                <TiSocialFacebookCircular className="text-primary" size={25} />
              </Link>
              <Link href="">
                <AiOutlineYoutube className="text-primary" size={25} />
              </Link>
              <Link href="">
                <FiTwitter className="text-primary" size={25} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 bg-gray-100">
        <p className="text-center">
          Copyright © 2025 mumworld.in - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
