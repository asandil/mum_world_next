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
    </footer>
  );
};

export default Footer;
