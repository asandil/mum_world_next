"use client";
import React from "react";
import { useParams } from "next/navigation";
import Poetry from "@/lib/PoetryData";
import Link from "next/link";
import BlogPageHeader from "@/components/BlogPageHeader";
import Image from "next/image";
import Author from "@/components/Author";
import SharePost from "@/components/SharePost";
import SignUp from "@/components/SignUp";

const PoetryDetailPage = () => {
  const params = useParams();
  const { slug } = params;

  // Find the poetry by slug
  const post = Poetry.find((p) => p.slug === slug);

  if (!post) return <p>Poetry not found.</p>;

  return (
    <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
      <BlogPageHeader />
      <article>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-[100%] lg:w-[67%] lg:border-r-[1px] border-[rgb(226,226,226)] px-[24px]">
            <Link
              className="text-[#F69E87] text-[16px] font-[500] inline-flex mb-[40px]  items-center gap-2 hover:text-[#e6846a]"
              href="/the-poetry"
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
              All Posts
            </Link>

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="flex gap-3 justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[32px]">
              <span className="">{new Date(post.date).toDateString()}</span>
              <span className="">|</span>
              <span>poetry</span>
            </p>
            <figure className="mb-[24px] w-full max-w-[372px] md:max-w-[500px] flex flex-col mx-auto">
              <div className="relative  w-full h-[350px] overflow-hidden rounded-lg">
                <Image
                  src={post.image.url}
                  alt={post.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px"
                />
              </div>
              <figcaption className="text-[rgb(82,82,82)] px-[8px] py-[4px] bg-[rgb(246,246,246)] font-[400] text-center">
                {post.image.alt}
              </figcaption>
            </figure>

            <p className="text-lg mb-6 whitespace-pre-line">{post.content}</p>

            <div className="mt-[20px] ">
              <Author />
            </div>
            <div className="mt-5">
              <SharePost />
            </div>
            </div>
            <div className="w-[100%] lg:w-[33%] order-2 lg:px-[24px] border-t-[1px] lg:border-t-0 pt-[1.25rem] lg:pt-0 px-[24px]">
              {/* <!-- categories --> */}
              <h4 className="mb-[24px] text-[22px] font-[400] text-black leading-[1.25]">
                Categories
              </h4>
              <ul className="flex  flex-col gap-5 text-[16px] text-black mb-[56px]">
                <li>
                  <a className="active-link font-bold" href="/the-poetry">
                    All Posts
                  </a>
                </li>
                <li>
                  <a href="/the-poetry">Poetry</a>
                </li>
              </ul>
              {/* <!-- Sign Up for blog Updates */}
              <SignUp />
              {/* <!-- RecentPosts --> */}
              {/* <RecentPosts /> */}
            </div>
          
        </div>
      </article>
    </section>
  );
};

export default PoetryDetailPage;
