"use client";
import Link from "next/link";
import { useState } from "react";

export default function ArticleList({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Calculate current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Change page
  const goToPage = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };
  return (
    <div className="">
      {currentPosts.map((post) => (
        <div className="pb-[40px] mt-[40px] border-b-[1px] border-[rgb(226,226,226)] flex flex-col md:flex-row gap-8 justify-center items-center mr-[24px]">
          <img
            className="max-w-[200px] h-auto"
            src="https://tse3.mm.bing.net/th/id/OIP.isXwJc2soLmlBLYvbWcxYAHaE8?pid=Api&P=0&h=180"
            alt={post.image}
            height={300}
          />
          <div className="text-start md:text-start flex flex-col">
            <p className="flex gap-3 justify-center md:justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[16px]">
              <span>February 22, 2023</span>
              <span>|</span>
              <span>Babies Food(6-24Months)</span>
            </p>
            <h4 className="mb-[16px] leading-[1.125] text-[22px] font-[400] text-black">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-amber-800 transition-colors"
              >
                {post.title.substring(0, 20)}
              </Link>
            </h4>
            <p className="mb-[16px] leading-[1.5]">{post?.body}</p>
            <span className="text-[rgb(158,108,52)] cursor-pointer text-end block text-[16px] hover:text-[rgb(97,64,18)]">
              <Link
                href={`/blog/${post.slug}`}
                className="block text-end cursor-pointer text-[rgb(158,108,52)] hover:text-[rgb(97,64,18)]"
              >
                Continue Reading →
              </Link>
            </span>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      {/* <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === index + 1
                ? 'bg-amber-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div> */}
      <div className="flex justify-between items-center mt-8">
        {/* Show Prev button only if not on first page */}
        <div>
          {""}
          {currentPage > 1 && (
            <button
              onClick={() => goToPage(currentPage - 1)}
              className="py-2 rounded-lg text-black hover:text-blue-500 cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  src="/nextPage.png"
                  height="24"
                  width="24"
                  className="mr-1 rotate-180 hover:text-blue-500"
                />
                PREV
              </div>
            </button>
          )}
        </div>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next button */}
        <div>
          {""}
          {currentPage < totalPages && (
            <button
              onClick={() => goToPage(currentPage + 1)}
              className="py-2 rounded-lg text-black hover:text-blue-500 cursor-pointer"
            >
              <div className="flex items-center">
                NEXT{" "}
                <img
                  src="/nextPage.png"
                  height="24"
                  width="24"
                  className="ml-1"
                />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
