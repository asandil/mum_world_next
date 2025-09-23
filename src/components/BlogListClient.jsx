"use client"; // ✅ This is a client component

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Blogs from "@/lib/BlogsData";
import Image from "next/image";
import Link from "next/link";
import SignUp from "@/components/SignUp";
import Pagination from "@/components/Pagination";
import CategoryFilter from "@/components/CategoryFilter";
import RecentPosts from "./RecentPosts";

const categories = [
  "All",
  "Babies",
  "Babies Food(6-24Months)",
  "Baby",
  "Baby Growth",
  "Breastfeeding",
  "Baby Travel",
  "Formula Feeding",
  "Hair Care",
  "Healthcare",
  "Hospital Bag",
  "Infertility",
  "Lifestyle",
  "Miscarriage",
  "Nutrition",
  "Parenting Hacks",
  "Postnatal Care",
  "Pregnancy",
  "Pregnancy Health",
  "Second Pregnancy",
  "Self-Care",
  "Toddler",
  "Weaning",
  "Work-Life Balance",
];

const blogsPerPage = 10;

const BlogListClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get URL params
  const categoryQuery = searchParams.get("category") || "All";
  const pageQuery = parseInt(searchParams.get("page") || "1", 10);

  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [currentPage, setCurrentPage] = useState(pageQuery);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blogs
  const filteredBlogs = Blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    router.push(`/blog?category=${category}&page=1`);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`/blog?category=${selectedCategory}&page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-10 w-full lg:w-[984px] xl:w-[1160px] mx-auto px-6">
      {/* Search Box */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold uppercase">MY BLOG</h1>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F69E87]"
        />
      </div>

      <hr className="my-4 border-black" />

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Blog List */}
        <div className="w-full lg:w-[73%] flex flex-col gap-6 lg:border-r border-r-0 pr-0 lg:pr-6">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div key={blog.slug} className="flex flex-col md:flex-row gap-6 border-b pb-6">
                <div className="relative w-full md:w-[300px] h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src={blog.image.url}
                    alt={blog.image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(blog.date).toDateString()} | {blog.category}
                  </p>
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/blog/${blog.slug}`} className="hover:text-[#F69E87]">
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="mb-2">{blog.description}</p>
                  <div className="text-end  ">
                    <Link
                    href={`/blog/${blog.slug}`}
                    className="text-[#F69E87] hover:text-[#e6846a] "
                  >
                    Continue Reading →
                  </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-10">No blogs found...</p>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[27%]">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
          <SignUp />
          <RecentPosts />
        </div>
      </div>
    </section>
  );
};

export default BlogListClient;
