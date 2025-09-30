
import AppSidebar from "@/components/Application/Admin/AppSidebar";
import ThemeProvider from "@/components/Application/Admin/ThemeProvider";
import Topbar from "@/components/Application/Admin/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className=" md:w-[calc(100vw-16rem)] w-full ">
            <div className=" min-h-[calc(100vh-40px)] pb-10 ">
              <Topbar />
              <div className="p-5">{children}</div>
            </div>
            <div className="border-t h-[40px] flex justify-center items-center bg-gray-50 dark:bg-background text-sm">
              @ 2025 MumWorld. All Rights Reserved.
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default layout;
