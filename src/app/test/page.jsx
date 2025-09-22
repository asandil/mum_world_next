"use client";
import React, { useEffect, useState } from "react";
import Poetry from "@/lib/PoetryData";
import Link from "next/link";
import BlogPageHeader from "@/components/BlogPageHeader";
import Pagination from "@/components/Pagination";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
  const poetData = Poetry;
  const postsPerPage = 4;

  const searchParams = useSearchParams();
  const router = useRouter();

  // Read page number from URL query
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage); // Update state when URL changes
  }, [initialPage]);

  // Calculate total pages
  const totalPages = Math.ceil(poetData.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = poetData.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Update URL without full reload
    router.push(`/test?page=${pageNumber}`);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        <BlogPageHeader />

        <div className="flex flex-wrap justify-center items-center">
          {currentPosts.map((post) => (
            <div
              key={post.title}
              className="w-full md:w-[45%] border rounded-lg border-gray-200 hover:shadow-lg m-4 transition-shadow duration-300"
            >
              <figure className="bg-cover bg-no-repeat px-auto bg-center rounded-lg mt-[12px] md:mt-[16px] lg:mt-[24px]">
                <img
                  className="w-[250px] h-[200px] sm:w-[450px] sm:h-[300px] md:w-[300px] md:h-[400px] lg:w-[450px] lg:h-[400px] mx-auto block rounded-lg"
                  src={post.image.url}
                  alt={post.image.alt}
                />
              </figure>

              <div className="px-6 py-8 flex flex-col">
                <div>
                  <div className="flex gap-3 justify-center text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] pb-[32px]">
                    <span>{new Date(post.date).toDateString()}</span>
                    <span>|</span>
                    <span>Poetry</span>
                  </div>
                  <h4 className="mb-[16px] text-[22px] leading-[1.125] font-[400] text-black text-center">
                    <Link
                      href={`/test/${post.slug}`}
                      className="hover:text-[#e6846a] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-left mb-[12px] pb-[16px] whitespace-pre-line text-[16px] font-[400]">
                    {post.description.replace(/<br\s*\/?>/gi, " ")}
                  </p>
                </div>

                <div className="block text-end">
                  <Link
                    href={`/test/${post.slug}`}
                    className="block text-end cursor-pointer text-[#F69E87] hover:text-[#e6846a] "
                  >
                    Continue Reading
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          postsPerPage={currentPosts.length}
          totalPosts={poetData.length}
        />
      </section>
    </>
  );
};

export default Page;
