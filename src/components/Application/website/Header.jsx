"use client";
import {
  USER_DASHBOARD,
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/images/footer_logo.svg";
import { IoIosSearch } from "react-icons/io";
import Cart from "./Cart";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/user.png";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import Search from "./Search";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import UserDropDown from "./UserDropDown";

const Header = () => {
  const auth = useSelector((store) => store.authStore.auth);
  const pathname = usePathname();
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const isActive = (href) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const isShopPage = pathname.includes("/shop");

  const toggleSubmenu = (index) => {
    if (openSubmenu === index) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(index);
    }
  };

  const navItems = [
    {
      name: "Home",
      href: WEBSITE_HOME,
      submenu: null,
    },
    {
      name: "Blog",
      href: "/blog",
      submenu: null,
    },
    {
      name: "The Poetry",
      href: "/the-poetry",
      submenu: null,
    },
    {
      name: "Tools",
      href: "#",
      submenu: [
        {
          name: "Baby Vaccination Chart",
          href: "/baby-vaccination-chart",
        },
        {
          name: "Pregnancy Due Date Calculator",
          href: "/pregnancy-due-date-calculator",
        },
        {
          name: "Pregnancy Weight Gain Calculator",
          href: "/pregnancy-weight-gain-calculator",
        },
      ],
    },
    {
      name: "Help & Support",
      href: "#",
      submenu: [
        {
          name: "Contact Us",
          href: "/contact-us",
        },
        {
          name: "Share Your Feedback",
          href: "/share-your-feedback",
        },
        {
          name: "FAQS",
          href: "/faqs",
        },
      ],
    },
    {
      name: "Shop",
      href: WEBSITE_SHOP,
      submenu: null,
    },
  ];

  return (
    <div className="bg-white border-b lg:px-32 px-4 ">
      <div className="flex justify-between items-center lg:py-5 py-3">
        <Link href={WEBSITE_HOME} className="flex gap-2 relative  ">
          <Image
            src={logo}
            alt="logo"
            className="lg:w-22 sm:w-18 w-14 absolute -left-6 top-[-16px] lg:top-[-26px] block"
          />
          <span className="ml-[18px] sm:ml-[32px] lg:ml-[46px] text-primary text-[18px] sm:text-[28px] font-semibold">
            Mumworld.in
          </span>
        </Link>

        <div className="flex justify-between gap-10 2xl:gap-20">
          {/* Desktop Navigation */}
          <nav className="hidden xl:block">
            <ul className="flex justify-between items-center gap-5 2xl:gap-12">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                  {item.submenu ? (
                    <div className="flex items-center gap-1 cursor-pointer">
                      <Link
                        href={item.href}
                        className={`text-[14px] uppercase tracking-[0.143em] ${
                          isActive(item.href)
                            ? "text-[#e6846a] font-bold"
                            : "text-gray-600 hover:text-[#e6846a]"
                        }`}
                      >
                        {item.name}
                      </Link>
                      <svg
                        className="text-[16px] shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="16"
                        height="16"
                      >
                        <path d="M19.544 7.236a.773.773 0 0 1-.031 1.06l-7.883 7.743-7.42-7.742a.773.773 0 0 1 0-1.061.699.699 0 0 1 1.017 0l6.433 6.713 6.868-6.745a.698.698 0 0 1 1.016.032" />
                      </svg>
                      <div className="absolute hidden group-hover:block bg-white shadow-lg p-5 dropdown-content w-[240px] top-full left-0 z-50 border">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={`block text-[14px] ${
                              subIndex > 0 ? "mt-4" : ""
                            } ${
                              isActive(subItem.href)
                                ? "text-[#e6846a] font-bold"
                                : "text-gray-600 hover:text-[#e6846a]"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-[14px] uppercase tracking-[0.143em] ${
                        isActive(item.href)
                          ? "text-[#e6846a] font-bold"
                          : "text-gray-600 hover:text-[#e6846a]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons Section */}
          <div className="flex justify-between items-center gap-6 sm:gap-8">
            {isShopPage && (
              <button type="button" onClick={() => setShowSearch(!showSearch)}>
                <IoIosSearch
                  className="text-gray-500 hover:text-[#e6846a] cursor-pointer"
                  size={25}
                />
              </button>
            )}
            <Cart />

            {!auth ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount
                  className="text-gray-500 hover:text-[#e6846a] cursor-pointer"
                  size={25}
                />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar>
                  <AvatarImage src={auth?.avatar?.url || userIcon.src} />
                </Avatar>
              </Link>
            )}

            <UserDropDown />

            <button
              type="button"
              className="xl:hidden block"
              onClick={() => setIsMobileMenu(true)}
            >
              <HiMiniBars3
                size={25}
                className="text-primary hover:text-primary-hover"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - EXACTLY LIKE OLD HEADER */}
      {isMobileMenu && (
        <div className="fixed inset-0 bg-[url('/background-image-contact-us.png')] bg-no-repeat bg-cover opacity-100 h-[100vh] w-[100vw] z-50 lg:hidden">
          <nav className="py-[20px] px-[24px]">
            {/* Mobile menu header */}
            <div className="flex justify-between items-center border-b border-[#e6846a] pb-3 mb-6 h-[60px] relative">
              <Image
                src={logo}
                alt="logo"
                className="w-22 absolute -left-6 top-[-26px] "
              />
              <span className="ml-[48px] text-primary text-[28px] font-semibold">
                Mumworld.in
              </span>
              <button
                className="absolute right-0 -top-2 text-[#e6846a] cursor-pointer"
                onClick={() => setIsMobileMenu(false)}
              >
                <IoMdCloseCircleOutline size={32} />
              </button>
            </div>

            {/* Mobile menu items */}
            <ul className="text-[#F69E87] text-[18px] sm:text-[22px] font-[400] flex flex-col mt-[16px]">
              {navItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.submenu ? (
                    <li className="py-[4px] border-b border-[#e6846a]">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSubmenu(index)}
                      >
                        <span className="mobileHead">{item.name}</span>
                        <span
                          className={`transform transition-transform ${
                            openSubmenu === index ? "rotate-180" : ""
                          }`}
                        >
                          <FaChevronDown />
                        </span>
                      </div>

                      {openSubmenu === index && (
                        <ul className="ml-6 mt-4 space-y-3 text-[18px]">
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex} className="pb-2">
                              <Link
                                href={subItem.href}
                                className={`block ${
                                  isActive(subItem.href)
                                    ? "text-[#e6846a] font-semibold"
                                    : "hover:text-[#e6846a]"
                                }`}
                                onClick={() => setIsMobileMenu(false)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li className="py-[4px] border-b border-[#e6846a]">
                      <Link
                        href={item.href}
                        className={`mobileHead block ${
                          isActive(item.href)
                            ? "text-[#e6846a] font-semibold"
                            : "hover:text-[#e6846a]"
                        }`}
                        onClick={() => setIsMobileMenu(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <Search isShow={showSearch} />
    </div>
  );
};

export default Header;
