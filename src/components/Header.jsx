// components/Header.js
"use client";
import { useState } from "react";
import Link from "next/link";
import headData from "../assets/navData.js";
import { usePathname } from "next/navigation";
import menuItems from "../assets/navData.js";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const isActive = (href) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (index) => {
    if (openSubmenu === index) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(index);
    }
  };

  return (
    <>
      {/* Top navigation */}
      <div className="text-[16px] bg-[rgb(246,246,246)] min-w-full">
        <nav className=" relative py-[20px] px-[24px] mx-auto lg:max-w-[984px] xl:max-w-[1160px]">
          <button
            className="text-4xl text-[#e6846a] inline-block md:hidden cursor-pointer"
            onClick={toggleMenu}
          >
            ≡
          </button>
          <ul className="hidden uppercase md:flex md:justify-around tracking-[0.143em] font-[400]">
            {/* Desktop links */}

            <li className="text-[14px]">
              <Link
                href="/"
                className={`head ${
                  isActive("/")
                    ? "text-[#e6846a] font-bold"
                    : "hover:text-[#e6846a]"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="text-[14px]">
              <Link
                href="/blog"
                className={`head ${
                  isActive("/blog")
                    ? "text-[#e6846a] font-bold"
                    : "hover:text-[#e6846a]"
                }`}
              >
                Blog
              </Link>
            </li>
            <li className="text-[14px]">
              <Link
                href="/the-poetry"
                className={`head ${
                  isActive("/the-poetry")
                    ? "text-[#e6846a] font-bold"
                    : "hover:text-[#e6846a]"
                }`}
              >
                The poetry
              </Link>
            </li>
            <li className="text-[14px] group relative cursor-pointer">
              <div
                className={`child flex items-center gap-2 ${
                  isActive("/baby-vaccination-chart") ||
                  isActive("/due-date-calculator")
                    ? "text-[#e6846a] font-bold"
                    : "hover:text-[#e6846a]"
                }`}
              >
                Tools{" "}
                <svg
                  className="mr-[16px] text-[16px] shrink-0 child1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M19.544 7.236a.773.773 0 0 1-.031 1.06l-7.883 7.743-7.42-7.742a.773.773 0 0 1 0-1.061.699.699 0 0 1 1.017 0l6.433 6.713 6.868-6.745a.698.698 0 0 1 1.016.032" />
                </svg>
              </div>
              <div className="absolute hidden group-hover:block bg-[rgb(246,246,246)] p-5 dropdown-content w-fit">
                <Link
                  href="/baby-vaccination-chart"
                  className={`head block w-[240px] ${
                    isActive("/baby-vaccination-chart")
                      ? "text-[#e6846a] font-bold"
                      : "hover:text-[#e6846a]"
                  }`}
                >
                  Baby Vaccination Chart
                </Link>
                <Link
                  href="/pregnancy-due-date-calculator"
                  className={`head block mt-4 text-[14px] ${
                    isActive("/pregnancy-due-date-calculator")
                      ? "text-[#e6846a] font-bold"
                      : "hover:text-[#e6846a]"
                  }`}
                >
                  Pregnancy Due Date Calculator
                </Link>
                <Link
                  href="/pregnancy-weight-gain-calculator"
                  className={`head block mt-4 text-[14px] ${
                    isActive("/pregnancy-weight-gain-calculator")
                      ? "text-[#e6846a] font-bold"
                      : "hover:text-[#e6846a]"
                  }`}
                >
                  Pregnancy Weight Gain Calculator
                </Link>
              </div>
            </li>
            <li className="text-[14px]">
              <Link
                href="/products"
                className={`head ${
                  isActive("/products")
                    ? "text-[#e6846a] font-bold"
                    : "hover:text-[#e6846a]"
                }`}
              >
                Products
              </Link>
            </li>
            <li className="text-[14px]">
              <Link
                href="/faqs"
                className={`head ${
                  isActive("/faqs")
                    ? "text-[#e6846a] font-bold"
                    : "hover:text-[#e6846a]"
                }`}
              >
                Faqs
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logo and tagline */}
      <div className="my-[24px] text-[16px] px-[24px] flex flex-col">
        <Link href="/" className="block text-center mx-auto">
          <img
            className="inline-block w-[188px] h-[178px] md:w-[547.5px] md:h-[500px] "
            src="/logo.jpg"
            alt="mum_world"
          />
        </Link>
        <h2 className="leading-[1.25] text-center mt-[8px] font-[400] text-[14px] tracking-[0.143em] uppercase">
          Creating healthy Beginnings
        </h2>
      </div>

      {/* Mobile menu (conditionally rendered) */}
      {/* {menuOpen && (
        <div className="fixed inset-0 bg-[url('/background-image-contact-us.png')] bg-no-repeat bg-cover opacity-100 h-[100vh] w-[100vw] z-10 sm:hidden">
          <nav className="py-[20px] px-[24px]">
            <div className="flex justify-end border-b-1 border-[#e6846a]">
              <button
                id="closemenu"
                className="text-5xl text-[#e6846a] rotate-45 cursor-pointer"
                onClick={toggleMenu}
              >
                +
              </button>
            </div>
            <ul className="text-[#F69E87] px-[24px] text-[22px] font-[400] flex flex-col mt-[16px]">
              {headData.map((data) => (
                <li
                  key={data.name}
                  className="py-[16px] border-b border-[#e6846a]"
                >
                  <Link
                    href={data.to}
                    className={`mobileHead ${
                      isActive(data.to)
                        ? "text-[#e6846a] font-semibold"
                        : "hover:text-[#e6846a]"
                    }`}
                    onClick={toggleMenu}
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )} */}

      <>
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-50 md:hidden p-2 rounded-md bg-[#e6846a] text-white"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="absolute inset-0 bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 bg-[url('/background-image-contact-us.png')] bg-no-repeat bg-cover opacity-100 h-[100vh]   md:hidden w-full text-white transform transition-transform duration-300 ease-in-out z-40 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:z-auto`}
        >
          <nav className="mt-14 ml-2 text-[#F69E87]">
            <ul className="space-y-2 text-[22px]">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(index)}
                        className="flex items-center  w-full p-2 rounded hover:bg-gray-700 transition-colors relative"
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                        <span
                          className={`transform transition-transform absolute right-[25px] ${
                            openSubmenu === index ? "rotate-90" : ""
                          }`}
                        >
                          ▶
                        </span>
                      </button>

                      {openSubmenu === index && (
                        <ul className="ml-14 mt-0 space-y-0 overflow-y-auto text-[18px]">
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.link}
                                className=" p-1 rounded hover:bg-gray-700 transition-colors flex items-center"
                                onClick={() => setIsOpen(false)}
                              >
                                <span className="mr-3">{subItem.icon}</span>
                                <span>{subItem.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                <span>U</span>
              </div>
              <div>
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div> */}
        </div>
      </>
    </>
  );
}
