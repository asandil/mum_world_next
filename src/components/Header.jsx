// components/Header.js
"use client";
import { useState } from "react";
import Link from "next/link";
import headData from "../assets/navData.js";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const isActive = (href) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Top navigation */}
      <div className="text-[16px] bg-[rgb(246,246,246)] min-w-full">
        <nav className=" relative py-[20px] px-[24px] mx-auto lg:max-w-[984px] xl:max-w-[1160px]">
          <button
            className="text-4xl text-black inline-block md:hidden cursor-pointer"
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
                    ? "text-[rgb(97,64,18)] font-bold"
                    : "hover:text-[rgb(97,64,18)]"
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
                    ? "text-[rgb(97,64,18)] font-bold"
                    : "hover:text-[rgb(97,64,18)]"
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
                    ? "text-[rgb(97,64,18)] font-bold"
                    : "hover:text-[rgb(97,64,18)]"
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
                    ? "text-[rgb(97,64,18)] font-bold"
                    : "hover:text-[rgb(97,64,18)]"
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
                      ? "text-[rgb(97,64,18)] font-bold"
                      : "hover:text-[rgb(97,64,18)]"
                  }`}
                >
                  Baby Vaccination Chart
                </Link>
                <Link
                  href="/due-date-calculator"
                  className={`head block mt-4 text-[14px] ${
                    isActive("/due-date-calculator")
                      ? "text-[rgb(97,64,18)] font-bold"
                      : "hover:text-[rgb(97,64,18)]"
                  }`}
                >
                  Due Date Calculator
                </Link>
              </div>
            </li>
            <li className="text-[14px]">
              <Link
                href="/faqs"
                className={`head ${
                  isActive("/faqs")
                    ? "text-[rgb(97,64,18)] font-bold"
                    : "hover:text-[rgb(97,64,18)]"
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
      {menuOpen && (
        <div className="fixed inset-0 bg-[url('/background-image-contact-us.png')] bg-no-repeat bg-cover opacity-100 h-[100vh] w-[100vw] z-10 sm:hidden">
          <nav className="py-[20px] px-[24px]">
            <div className="flex justify-end border-b-1 border-white">
              <button
                id="closemenu"
                className="text-5xl text-white rotate-45 cursor-pointer"
                onClick={toggleMenu}
              >
                +
              </button>
            </div>
            <ul className="text-[#F69E87] px-[24px] text-[22px] font-[400] flex flex-col mt-[16px]">
              {headData.map((data) => (
                <li
                  key={data.name}
                  className="py-[16px] border-b border-[rgba(76,76,76,0.5)]"
                >
                  <Link
                    href={data.to}
                    className={`mobileHead ${
                      isActive(data.to)
                        ? "text-[#F69E87] font-semibold"
                        : "hover:text-[rgb(97,64,18)]"
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
      )}
    </>
  );
}
