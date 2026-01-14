"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Logo from "@/assets/images/footer_logo.svg";
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { adminAppSidebarMenu } from "@/lib/adminSidebarMenu";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar className="z-50">
      <SidebarHeader className="border-b h-14 p-0 ">
        <div className="flex justify-between items-center pr-4">
          <div className="flex items-center">
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
            <span className="ml-[0px] text-primary text-[18px] sm:text-[24px] font-semibold">
              Mumworld.in
            </span>
          </div>
          <Button
            onClick={toggleSidebar}
            type="button"
            size="icon"
            className="md:hidden"
          >
            <IoMdClose />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarMenu>
          {adminAppSidebarMenu.map((menu, index) => (
            <Collapsible key={index} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    className="font-semibold px-2 py-5"
                  >
                    <Link href={menu?.url}>
                      <menu.icon />
                      {menu.title}
                      {menu.submenu && menu.submenu.length > 0 && (
                        <LuChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {menu.submenu && menu.submenu.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.submenu.map((submenuItem, subMenuIndex) => (
                        <SidebarMenuSubItem key={subMenuIndex}>
                          <SidebarMenuSubButton asChild className="px-2 py-5">
                            <Link href={submenuItem.url}>
                              {submenuItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* <SidebarFooter /> */}
    </Sidebar>
  );
};

export default AppSidebar;
