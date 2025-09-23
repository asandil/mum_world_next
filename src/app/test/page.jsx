"use client";
import React, { useState } from "react";
import Blogs from "@/lib/BlogsData";
import Image from "next/image";
import Link from "next/link";
import SignUp from "@/components/SignUp";
import Pagination from "@/components/Pagination";

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
];

const TestBlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 10;
  const blogsData = Blogs;

  // 🔎 Filter blogs
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

  // 📌 Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    }
  };

  return (
    <section className="py-[40px] w-full lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
      {/* Header with Search */}
      <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between w-full mb-6 gap-4">
        <h1 className="leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
          MY BLOG
        </h1>
        <div className="w-full sm:max-w-[300px]">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F69E87]"
          />
        </div>
      </div>

      <hr className="my-[16px] border-[1px] border-black" />

      <div className="flex flex-col lg:flex-row gap-5 w-full">
        {/* Blog List */}
        <div className="flex w-full lg:w-[73%] flex-wrap justify-center items-center lg:border-r-[2px] border-[rgb(226,226,226)]">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div key={blog.slug}>
                <div className="pb-[40px] mt-[40px] border-b-[1px] border-[rgb(226,226,226)] flex flex-col md:flex-row gap-8 justify-center items-center mr-[24px]">
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
                    <p className="mb-[16px] leading-[1.5]">{blog.description}</p>
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

          {/* 📄 Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[27%] px-[20px]">
          {/* <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#F69E87] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div> */}
          <SignUp />
        </div>
      </div>
    </section>
  );
};

export default TestBlogPage;
