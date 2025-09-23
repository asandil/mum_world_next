"use client";
import Link from "next/link";
import { useState } from "react";

export default function ArticleList({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

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
    <div className=" pl-10">
      {/* Posts List */}
      <div className="flex flex-wrap">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="w-full md:w-[45%] border border-gray-200 hover:shadow-lg m-4 transition-shadow duration-300"
          >
            {/* Image Container */}
            <div
              className="bg-cover bg-no-repeat bg-center"
              // style={`background-image: url(${post.data.image.url});`}
            >
              <img
                className="z-10 h-[300px] block mx-auto bg-black"
                src={post.image}
                alt={post.image}
                height={300}
              />
            </div>

            {/* Content Container */}
            <div className="px-6 py-8 flex flex-col justify-between min-h-[345px]">
              <div>
                <div className="flex gap-3 justify-center text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] pb-[32px]">
                  <span>February 22, 2023</span>
                  <span>|</span>
                  <span>Poetry</span>
                </div>
                <h4 className="mb-[16px] text-[22px] leading-[1.125] font-[400] text-black text-center">
                  <Link
                    href={`/the-poetry/${post.slug}`}
                    className="hover:text-amber-800 transition-colors"
                  >
                    {post.title.substring(0, 20)}
                  </Link>
                </h4>
                <p className="text-left pb-[16px] whitespace-pre-line text-[16px] font-[400]">
                  {post.body.substring(0, 150)}...
                </p>
              </div>

              <div className="block text-end">
                <Link
                  href={`/the-poetry/${post.slug}`}
                  className="block text-end cursor-pointer text-[rgb(158,108,52)] hover:text-[rgb(97,64,18)]"
                >
                  Continue Reading
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

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

      {/* <div className="flex justify-between items-center mt-8 px-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-amber-600 text-white hover:bg-amber-700"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-amber-600 text-white hover:bg-amber-700"
          }`}
        >
          Next
        </button>
      </div> */}

      {/* <div className="flex justify-between items-center mt-8 ">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={` py-2 rounded-lg ${
            currentPage === 1
              ? " text-gray-400 cursor-not-allowed"
              : " text-black hover:text-blue-500 cursor-pointer"
          }`}
        >
          <div class="flex items-center">
            <img
              src="/nextPage.png"
              height="24"
              width="24"
              class="mr-1 rotate-180 hover:text-blue-500"
            />
            PREV
          </div>
        </button>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={` py-2 rounded-lg ${
            currentPage === totalPages
              ? " text-gray-400 cursor-not-allowed"
              : " text-black hover:text-blue-500 cursor-pointer"
          }`}
        >
          <div class="flex items-center">
            NEXT <img src="/nextPage.png" height="24" width="24" class="ml-1" />
          </div>
        </button>
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
