import Author from "@/components/Author";
import RecentPosts from "@/components/RecentPosts";
import SharePost from "@/components/SharePost";
import SignUp from "@/components/SignUp";
import Blogs from "@/lib/BlogsData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const Blog = ({ params }) => {
  const { slug } = params;

  // Find blog by slug
  const blog = Blogs.find((b) => b.slug === slug);

  if (!blog) {
    return notFound(); // Show 404 if no blog found
  }

  return (
    <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
      <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
        MY BLOG
        <hr className="mt-[16px] border-[1px] border-black" />
      </h1>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-[100%] lg:w-[34.2%] order-2 border-t-[1px] lg:border-t-0 pt-[1rem] lg:pt-[12px]">
          <SignUp />
          {/* <!-- RecentPosts --> */}
          {/* <RecentPosts /> */}
        </div>
        <div className="w-[100%] lg:w-[100%]">
          <div className="w-[100%] lg:border-r-[2px] border-[rgb(226,226,226)]">
            {/* <BlogPost posts={posts} /> */}

            <article className="mt-[16px]">
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="  px-[24px]">
                  <Link
                    className="text-[#F69E87] text-[16px] font-[500] inline-flex mb-[40px] items-center gap-2 hover:text-[#e6846a]"
                    href="/test"
                  >
                    <svg
                      className="rotate-90"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="16"
                      height="16"
                      data-ux="Icon"
                    >
                      <path d="M19.544 7.236a.773.773 0 0 1-.031 1.06l-7.883 7.743-7.42-7.742a.773.773 0 0 1 0-1.061.699.699 0 0 1 1.017 0l6.433 6.713 6.868-6.745a.698.698 0 0 1 1.016.032"></path>
                    </svg>
                    All Blogs
                  </Link>
                  <h1 className="font-[400] text-[28px] text-black mb-[8px] leading-[1.125]">
                    {blog.title}
                  </h1>
                  <p className="flex gap-3 justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[32px]">
                    <span className="">
                      {new Date(blog.date).toDateString()}
                    </span>
                    <span className="">|</span>
                    <span>Blog</span>
                  </p>
                  <figure className="mb-[24px] w-full max-w-[372px] md:max-w-[500px] flex flex-col mx-auto">
                    <div className="relative  w-full h-[350px] overflow-hidden rounded-lg">
                      <Image
                        src={blog.image.url}
                        alt={blog.image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px"
                      />
                    </div>
                    <figcaption className="text-[rgb(82,82,82)] px-[8px] py-[4px] bg-[rgb(246,246,246)] font-[400] text-center">
                      {blog.image.alt}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </article>

            {blog.content?.map((section, idx) => (
              <div key={idx} className="mb-[32px]">
                <h3 className="text-[20px] font-[600] text-black mb-[12px]">
                  {section.heading}
                </h3>

                {Array.isArray(section.items) ? (
                  <ul className="list-disc pl-[20px] space-y-2 text-[16px] text-[rgb(89,89,89)] leading-[1.6]">
                    {section.items.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                ) : (
                  <p
                    className="text-[16px] leading-[1.6] text-[rgb(89,89,89)] whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: section.items }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-[20px]">
            <Author />
          </div>
          {/* <!-- Share this post --> */}
          <div className="mt-5">
            <SharePost />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
