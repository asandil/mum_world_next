import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  USER_DASHBOARD,
  USER_ORDERS,
  USER_PROFILE,
  WEBSITE_LOGIN,
} from "@/routes/WebsiteRoute";
import axios from "axios";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaUserCog } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoBagHandle } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "@/assets/images/user.png";
import { AiOutlineLogout } from "react-icons/ai";
import { showToast } from "@/lib/showToast";
import { logout } from "@/store/reducer/authReducer";

const UserDropDown = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((store) => store.authStore.auth);
  console.log("Logged auth in User section.", auth);
  const { setTheme } = useTheme();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div>
          {!auth ? (
            <Link href={WEBSITE_LOGIN}>
              <VscAccount
                className="text-gray-500 hover:text-[#e6846a] cursor-pointer"
                size={25}
              />
            </Link>
          ) : (
            <Link href={USER_DASHBOARD}>
              <Avatar className="border border-primary hover:border-primary-hover">
                <AvatarImage src={auth?.avatar?.url || userIcon.src} />
              </Avatar>
            </Link>
          )}
        </div>
      </DropdownMenuTrigger>
      {!auth ? (
        <DropdownMenuContent className="me-5 w-full border">
          <DropdownMenuLabel>
            <p className="font-semibold">You are signed out.</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={WEBSITE_LOGIN}
              className={`flex items-center px-4 py-2 gap-2 text-sm rounded hover:bg-primary hover:text-white transition-colors cursor-pointer`}
            >
              <AiOutlineLogout size={28} color="red" />
              <span>Login</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="me-5 w-full border px-2">
          <DropdownMenuLabel>
            <p className="font-semibold">Name: {auth?.name}</p>
            <p className="font-semibold">Email: {auth?.email}</p>
            <p className="font-semibold">Role: {auth?.role}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="mb-1">
            <Link
              href={USER_DASHBOARD}
              className={`flex items-center gap-2 p-3 text-sm sm:text-lg rounded hover:bg-primary hover:text-white transition-colors ${
                pathname.startsWith(USER_DASHBOARD)
                  ? "bg-primary text-white cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <TbLayoutDashboardFilled size={28} />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="mb-1">
            <Link
              href={USER_PROFILE}
              className={`flex items-center gap-2 p-3 text-sm sm:text-lg rounded hover:bg-primary hover:text-white ${
                pathname.startsWith(USER_PROFILE)
                  ? "bg-primary text-white cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <FaUserCog size={28} />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="mb-1">
            <Link
              href={USER_ORDERS}
              className={`flex items-center gap-2 p-3 text-sm sm:text-lg rounded hover:bg-primary hover:text-white transition-colors ${
                pathname.startsWith(USER_ORDERS)
                  ? "bg-primary text-white cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <HiOutlineShoppingBag size={34} />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="mb-1">
            <Button
              type="button"
              onClick={handleLogOut}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 text-sm sm:text-lg cursor-pointer"
            >
              <LuLogOut className="!w-6 !h-6" color="white" />
              <span>LogOut</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserDropDown;
