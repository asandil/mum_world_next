"use client";
import React, { useState, useEffect } from "react";
import Blogs from "@/lib/BlogsData";
import Image from "next/image";
import Link from "next/link";
import SignUp from "@/components/SignUp";
import Pagination from "@/components/Pagination";
import CategoryFilter from "@/components/CategoryFilter";
import { useSearchParams, useRouter } from "next/navigation";

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

const TestBlogPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

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

  // 🔄 Sync state with URL
  useEffect(() => {
    const categoryFromURL = searchParams.get("category") || "All";
    const pageFromURL = parseInt(searchParams.get("page")) || 1;
    setSelectedCategory(categoryFromURL);
    setCurrentPage(pageFromURL);
  }, [searchParams]);

  // 🔗 Handle category click
  const handleCategoryClick = (category) => {
    const query = new URLSearchParams(window.location.search);
    if (category === "All") {
      query.delete("category");
    } else {
      query.set("category", category);
    }
    query.set("page", "1"); // reset page when category changes
    router.replace(`/blog?${query.toString()}`);
  };

  // 🔗 Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      const query = new URLSearchParams(window.location.search);
      query.set("page", page.toString());
      router.replace(`/blog?${query.toString()}`);

      window.scrollTo({ top: 0, behavior: "smooth" });
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
        <div className="flex w-full lg:w-[73%] flex-wrap justify-center  lg:border-r-[2px] border-[rgb(226,226,226)]">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div key={blog.slug}>
                <div className="pb-[40px] border-b-[1px] border-[rgb(226,226,226)] flex flex-col md:flex-row gap-8 justify-center items-center mr-[24px]">
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
                        href={`/blog/${blog.slug}`}
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
                        href={`/blog/${blog.slug}`}
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

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[27%] px-[20px]">
          {/* <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryClick}
          /> */}

          <SignUp />
        </div>
      </div>
    </section>
  );
};

export default TestBlogPage;
