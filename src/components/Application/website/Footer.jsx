import React from "react";
import logo from "@/assets/images/logo.jpg";
import Image from "next/image";
import {
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_REGISTER,
} from "@/routes/WebsiteRoute";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
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
      <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4 ">
        <div className="lg:col-span-1 md:col-span-2 col-span-1">
          <Image
            src={logo}
            alt="logo"
            width={383}
            height={146}
            className="w-36 mb-2"
          />
          <p className="text-gray-500 text-sm ">
            Mumworld is your trusted destination for quality and convenience.
            From fashion to essentials, we bring everything you need right to
            your doorstep. Shop smart, live better - only at Mumworld.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Categories</h4>
          <ul>
            <li className="mb-2 text-gray-500">
              <Link href="">T-shirt</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Hoodies</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Oversized</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Full Sleeves</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Polo</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Userfull Links</h4>
          <ul>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_HOME}>Home</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Shop</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">About</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_REGISTER}>Register</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_LOGIN}>Login</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Help Center</h4>
          <ul>
            <li className="mb-2 text-gray-500">
              <Link href="">Register</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Login</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">My Account</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_REGISTER}>Privacy Policy</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href="">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Contact Us</h4>
          <ul>
            <li className="mb-2 text-gray-500 flex gap-2 ">
              <IoLocationOutline size={20} />
              <span className="text-sm">
                Mumworld market Noida, India 201310
              </span>
            </li>
            <li className="mb-2 text-gray-500 flex gap-2 ">
              <MdOutlinePhone size={20} />
              <Link
                href="tel:+91-8569874589"
                className="hover:text-primary text-sm"
              >
                91-8569874589
              </Link>
            </li>
            <li className="mb-2 text-gray-500 flex gap-2 ">
              <MdOutlineEmail size={20} />
              <Link
                href="mailto:mumworld.in@gmail.com"
                className="hover:text-primary text-sm"
              >
                mumworld.in@gmail.com
              </Link>
            </li>
          </ul>
          <div className="flex gap-5 mt-5 ">
            <Link href="">
              <AiOutlineYoutube className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FaInstagram className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FaWhatsapp className="text-primary" size={25} />
            </Link>
            <Link href="">
              <TiSocialFacebookCircular className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FiTwitter className="text-primary" size={25} />
            </Link>
          </div>
        </div>
      </div>
      <div className="py-5 bg-gray-100">
        <p className="text-center">
          Copyright © 2025 mumworld.in - All Rights Reserved.
        </p>
      </div>
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
    </footer>
  );
};

export default Footer;
