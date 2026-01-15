"use client";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/showToast";
import {
  USER_DASHBOARD,
  USER_ORDERS,
  USER_PROFILE,
  WEBSITE_LOGIN,
} from "@/routes/WebsiteRoute";
import { logout } from "@/store/reducer/authReducer";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const UserPanelNavigation = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const { data: logoutResponse } = await axios.post(`/api/auth/logout`);
      if (!logoutResponse.success) {
        throw new Error(logoutResponse.message);
      }
      dispatch(logout());
      showToast("success", logoutResponse.message);
      router.push(WEBSITE_LOGIN);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <div className="border shadow-sm p-4 rounded">
      <ul>
        <li className="mb-2">
          <Link
            href={USER_DASHBOARD}
            className={`flex items-center gap-2 px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-colors text-sm sm:text-lg ${
              pathname.startsWith(USER_DASHBOARD)
                ? "bg-primary text-white cursor-not-allowed"
                : ""
            }`}
          >
            <TbLayoutDashboardFilled size={28} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href={USER_PROFILE}
            className={`flex items-center gap-2 px-2 py-1.5 text-sm sm:text-lg rounded hover:bg-primary hover:text-white ${
              pathname.startsWith(USER_PROFILE)
                ? "bg-primary text-white cursor-not-allowed"
                : ""
            }`}
          >
            <FaUserCog size={28} />
            <span>Profile</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href={USER_ORDERS}
            className={`flex items-center gap-2 px-2 py-1.5 text-sm sm:text-lg rounded hover:bg-primary hover:text-white ${
              pathname.startsWith(USER_ORDERS)
                ? "bg-primary text-white cursor-not-allowed"
                : ""
            }`}
          >
            <HiOutlineShoppingBag size={28} />
            <span>Orders</span>
          </Link>
        </li>
        <li className="mb-2">
          <Button
            type="button"
            onClick={handleLogOut}
            variant="destructive"
            className="w-full flex items-center justify-center gap-2 text-sm sm:text-lg  "
          >
            <LuLogOut className="!w-6 !h-6" />
            <span>LogOut</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default UserPanelNavigation;
