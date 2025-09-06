// src/app/blog/BlogPageClient.jsx
"use client";

import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import Link from "next/link";
import Image from "next/image";
import Recent from "./Recent";
import SignUp from "@/components/SignUp";

const BlogPageClient = ({ allPosts, displayPosts }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (displayPosts) {
      setFilteredPosts(displayPosts);
      setIsLoading(false);
    }
  }, [displayPosts]);

  const handleFilterChange = (category) => {
    if (!category) {
      setFilteredPosts(displayPosts);
    } else {
      setFilteredPosts(
        allPosts.filter((post) => {
          const postCategories = [];

          // Extract from tags
          if (post.frontmatter.tags) {
            if (typeof post.frontmatter.tags === "string") {
              postCategories.push(
                ...post.frontmatter.tags.split(",").map((tag) => tag.trim())
              );
            } else if (Array.isArray(post.frontmatter.tags)) {
              postCategories.push(
                ...post.frontmatter.tags.map((tag) => tag.toString().trim())
              );
            }
          }

          // Extract from category
          if (post.frontmatter.category) {
            postCategories.push(post.frontmatter.category.toString().trim());
          }

          return postCategories.includes(category);
        })
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-white">
        {/* <p className="text-gray-500">Loading posts...</p> */}
        <div className="loader mr-[10px]"></div>
        <style jsx>{`
          .loader {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: inline-block;
            border-top: 2px solid #f69e87;
            border-right: 2px solid transparent;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
            position: relative;
          }
          .loader::after {
            content: "";
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border-bottom: 2px solid #f69e87;
            border-left: 2px solid transparent;
          }
          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full">
      <div className="flex w-full lg:w-[73%] flex-wrap justify-center items-center lg:border-r-[2px] border-[rgb(226,226,226)]">
        {filteredPosts.map((post) => (
          <div
            key={post.slug}
            className="pb-[40px] mt-[40px] border-b-[1px] border-[rgb(226,226,226)] flex flex-col md:flex-row gap-8 justify-center items-center mr-[24px]"
          >
            <div className="relative w-full md:w-[300px] h-[250px] overflow-hidden rounded-lg">
              <Image
                src={post.frontmatter.image.url}
                alt={post.frontmatter.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px"
              />
            </div>

            <div className="text-start md:text-start flex flex-col flex-1">
              <p className="flex gap-3 justify-center md:justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[16px]">
                <span>{new Date(post.frontmatter.date).toDateString()}</span>
                <span>|</span>
                <span>{post.frontmatter.tags}</span>
              </p>
              <h4 className="mb-[16px] leading-[1.125] text-[22px] font-[400] text-black">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[#F69E87] transition-colors"
                >
                  {post.frontmatter.title}
                </Link>
              </h4>
              <p className="mb-[16px] leading-[1.5]">
                {post.frontmatter.description}
              </p>
              <span className="text-[#F69E87] cursor-pointer text-end block text-[16px] hover:text-[#e6846a]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-end cursor-pointer text-[#F69E87] hover:text-[#e6846a]"
                >
                  Continue Reading →
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-[27%] px-[20px]">
        <FilterSection posts={allPosts} onFilterChange={handleFilterChange} />
        {/* <Recent/> */}
        <SignUp />
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 w-full">
          <p className="text-gray-500">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default BlogPageClient;
