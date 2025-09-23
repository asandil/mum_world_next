"use client";
import React, { useState } from "react";
import Blogs from "@/lib/BlogsData";
import Image from "next/image";
import Link from "next/link";
import SignUp from "@/components/SignUp";

const categories = [
  "All",
  "Babies",
  "Babies Food",
  "Baby",
  "Breastfeeding",
  "Infertility",
  "Miscarriage",
  "Postnatal Care",
  "Pregnancy",
  "Pregnancy Health",
  "Second Pregnancy",
  "Toddler",
  "Healthcare",
  "Lifestyle",
]; // add more as needed

const TestBlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const blogsData = Blogs;

  // Filter blogs
  const filteredBlogs = blogsData.filter((blog) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-[40px] w-full lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
      <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
        MY BLOG
        <hr className="mt-[16px] border-[1px] border-black" />
      </h1>

      {/* 🔍 Search Bar */}
      <div className="mb-6 w-full">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F69E87]"
        />
      </div>

      {/* Blog List */}
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="flex w-full lg:w-[73%] flex-wrap justify-center items-center lg:border-r-[2px] border-[rgb(226,226,226)]">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, id) => (
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
                    <p className="flex gap-3 justify-center md:justify-start text-[14px] leading-[1.5] text-[rgb(89,89,89)] mb-[16px]">
                      <span>{new Date(blog.date).toDateString()}</span>
                      <span>|</span>
                      <span>{blog.category}</span>
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
            ))
          ) : (
            <p className="mt-10 text-gray-500">No blogs found...</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[27%] px-[20px]">
          {/* 🏷️ Category Filter */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#F69E87] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <SignUp />
        </div>
      </div>
    </section>
  );
};

export default TestBlogPage;
