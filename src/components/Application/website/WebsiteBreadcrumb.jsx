import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import Link from "next/link";
import React from "react";

const WebsiteBreadcrumb = ({ props }) => {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div className="relative w-[100%] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] xl:h-[520px] bg-[url(https://res.cloudinary.com/dc0wr8hev/image/upload/v1768804102/byywuakdyansgiakjeb7.png)] bg-no-repeat bg-cover  ">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
          <div className="absolute inset-0 flex flex-col justify-center items-center px-4 z-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-3 md:mb-4 drop-shadow-2xl">
                {props.title}
              </h1>

              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 shadow-2xl">
                <ul className="flex flex-wrap justify-center items-center text-white text-sm sm:text-base font-medium">
                  <li>
                    <Link
                      href={WEBSITE_HOME}
                      className="hover:text-primary-light transition-all duration-300 hover:scale-105 inline-flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Home
                    </Link>
                  </li>

                  {props.links.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mx-2 sm:mx-3 text-white/50">/</span>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="hover:text-primary-light transition-all duration-300"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-primary-light font-semibold">
                          {item.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebsiteBreadcrumb;
