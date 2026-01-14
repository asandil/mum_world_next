"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { IoShirtOutline } from "react-icons/io5";
import adminLogo from "@/assets/images/admin-log.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import { MdOutlineShoppingBag } from "react-icons/md";
import LogoutButton from "./LogoutButton";
import { IoBagHandle } from "react-icons/io5";
import { ADMIN_ORDER_SHOW, ADMIN_PRODUCT_ADD } from "@/routes/AdminPanelRoute";

const UserDropDown = () => {
  const auth = useSelector((store) => store.authStore.auth);
  console.log("loggedIn auth", auth);
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <IoBagHandle size={38} color="#F59F8A" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="me-5 w-44">
        <DropdownMenuLabel>
          <p className="font-semibold">{auth?.name}</p>
          <p className="font-semibold">{auth?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ADMIN_PRODUCT_ADD} className="cursor-pointer">
            <IoShirtOutline />
            New Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={ADMIN_ORDER_SHOW} className="cursor-pointer">
            <MdOutlineShoppingBag />
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
