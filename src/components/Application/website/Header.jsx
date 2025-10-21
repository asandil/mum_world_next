"use client";
import {
  USER_DASHBOARD,
  WEBSITE_HOME,
  WEBSITE_LOGIN,
} from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/images/logo.jpg";
import { IoIosSearch } from "react-icons/io";
import Cart from "./Cart";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const auth = useSelector((store) => store.authStore.auth);

  return (
    <div className="bg-white border-b lg:px-32 px-4 ">
      <div className="flex justify-between items-center lg:py-5 py-3">
        <Link href={WEBSITE_HOME}>
          <Image
            src={logo}
            alt="logo"
            width={383}
            height={146}
            className="lg:w-32 w-24"
          />
        </Link>
        <div className="flex justify-between gap-20 ">
          <nav className="">
            <ul className="flex justify-between items-center gap-10 px-3">
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME}>Home</Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME}>About</Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME}>Shop</Link>
              </li>

              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME}>T-shirt</Link>
              </li>

              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME}>Hoodies</Link>
              </li>

              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME}>Oversized</Link>
              </li>
            </ul>
          </nav>

          <div className="flex justify-between items-center gap-8  ">
            <button type="button">
              <IoIosSearch
                className="text-gray-500 hover:text-primary cursor-pointer "
                size={25}
              />
            </button>
            <Cart />

            {!auth ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount
                  className="text-gray-500 hover:text-primary cursor-pointer "
                  size={25}
                />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar>
                  <AvatarImage></AvatarImage>
                </Avatar>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
