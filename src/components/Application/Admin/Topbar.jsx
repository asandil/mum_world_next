"use client";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import UserDropDown from "./UserDropDown";
import { RiMenu4Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import AdminSearch from "@/components/Application/Admin/AdminSearch";
import Image from "next/image";
import Logo from "@/assets/images/footer_logo.svg";
import AdminMobileSearch from "./AdminMobileSearch";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="px-5 border-t-1 border-b-1 h-14 w-full  z-50 flex justify-between items-center bg-white dark:bg-card ">
      <div className="ml-[-15px] flex items-center md:hidden">
        <Image
          src={Logo.src}
          height={50}
          width={Logo.width}
          alt="logo black"
          className="block dark:hidden h-[50px] w-auto "
        />
        <Image
          src={Logo.src}
          height={50}
          width={Logo.width}
          alt="logo white"
          className="hidden dark:block h-[50px] w-auto "
        />
        <span className=" ml-[-8px] lg:ml-[46px] text-primary text-[16px] sm:text-[20px] lg:text-[28px] font-semibold">
          Mumworld.in
        </span>
      </div>
      <div className="md:block hidden">
        <AdminSearch />
      </div>
      <div className="flex items-center gap-2">
        <AdminMobileSearch />
        <ThemeSwitch />
        <UserDropDown />
        <Button
          onClick={toggleSidebar}
          type="button"
          size="icon"
          className="ms-2 md:hidden"
        >
          <RiMenu4Fill />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
