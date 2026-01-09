import React from "react";
import UserPanelNavigation from "./UserPanelNavigation";

const UserPanelLayout = ({ children }) => {
  return (
    <div className="flex sm:flex-nowrap flex-wrap sm:gap-5 md:gap-10 lg:px-32 md:px-10 px-5 md:my-20 my-10">
      <div className="sm:w-64 w-full sm:mb-0 mb-5">
        <UserPanelNavigation />
      </div>
      <div className="sm:w-[calc(100%-16rem)] w-full">{children}</div>
    </div>
  );
};

export default UserPanelLayout;
