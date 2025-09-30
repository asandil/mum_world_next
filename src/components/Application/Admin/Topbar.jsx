"use client"
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import UserDropDown from "./UserDropDown";
import { RiMenu4Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

const Topbar = () => {

  const { toggleSidebar } = useSidebar();

  return (
    <div className="px-5 border-t-1 border-b-1 h-14 w-full  z-50 flex justify-between items-center bg-white dark:bg-card ">
      <div>Search</div>
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        <UserDropDown />
        <Button onClick={toggleSidebar} type="button" size="icon" className="ms-2 md:hidden">
          <RiMenu4Fill />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
