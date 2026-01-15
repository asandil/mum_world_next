import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "@/store/reducer/authReducer";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { RiLogoutCircleLine } from "react-icons/ri";

const LogoutButton = () => {
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
    <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
      <RiLogoutCircleLine color="red" />
      LogOut
    </DropdownMenuItem>
  );
};

export default LogoutButton;
