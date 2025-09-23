import React from "react";
import Blogs from "@/lib/BlogsData";
import Image from "next/image";
import Link from "next/link";

const TestBlogPage = () => {
  const blogsData = Blogs;
  return (
    <>
      <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
          MY BLOG
          <hr className="mt-[16px] border-[1px] border-black" />
        </h1>
        <div className="w-[100%] ">
          <div className="w-[100%] mt-[16px]">
            {blogsData.map((blog, id) => (
              <div key={id}>
                <div
                  key={blog.slug}
                  className="pb-[40px] mt-[40px] border-b-[1px] border-[rgb(226,226,226)] flex flex-col md:flex-row gap-8 justify-center items-center mr-[24px]"
                >
                  <div className="relative w-full md:w-[300px] h-[250px] overflow-hidden rounded-lg">
                    <Image
                      src={blog.image.url}
                      alt={blog.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px"
                    />
                  </div>

                  <div className="text-start md:text-start flex flex-col flex-1">
                    <p className="flex gap-3 justify-center md:justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[16px]">
                      <span>{new Date(blog.date).toDateString()}</span>
                      <span>|</span>
                      <span>{blog.tags}</span>
                    </p>
                    <h4 className="mb-[16px] leading-[1.125] text-[22px] font-[400] text-black">
                      <Link
                        href={`/test/${blog.slug}`}
                        className="hover:text-[#F69E87] transition-colors"
                      >
                        {blog.title}
                      </Link>
                    </h4>
                    <p className="mb-[16px] leading-[1.5]">
                      {blog.description}
                    </p>
                    <span className="text-[#F69E87] cursor-pointer text-end block text-[16px] hover:text-[#e6846a]">
                      <Link
                        href={`/test/${blog.slug}`}
                        className="block text-end cursor-pointer text-[#F69E87] hover:text-[#e6846a]"
                      >
                        Continue Reading →
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestBlogPage;
