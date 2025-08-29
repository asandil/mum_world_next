// src/app/blog/page.jsx
import BlogPageClient from "./BlogPageClient";
import Categories from "@/components/Categories";
import { getBlogPosts } from "@/lib/content";
import Link from "next/link";

const POSTS_PER_PAGE = 10;

export default async function BlogPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const data = await getBlogPosts();
  const posts = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
      <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
        MY BLOG
        <hr className="mt-[16px] border-[1px] border-black" />
      </h1>

      <div className="w-[100%] ">
        <div className="w-[100%] mt-[16px]">
          {/* FIX: Pass ALL posts to allPosts, paginated posts to displayPosts */}
          <BlogPageClient allPosts={posts} displayPosts={paginatedPosts} />
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
        {/* Previous Button */}
        {page > 1 ? (
          <Link
            href={`/blog?page=${page - 1}`}
            className="px-4 py-2 bg-[rgb(158,108,52)] text-white rounded hover:bg-[rgb(97,64,18)]"
          >
            Prev
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
          >
            Prev
          </button>
        )}

        {/* Page Numbers */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={`/blog?page=${i + 1}`}
              className={`px-4 py-2 rounded ${
                i + 1 === page
                  ? "bg-[rgb(158,108,52)] text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>

        {/* Next Button */}
        {page < totalPages ? (
          <Link
            href={`/blog?page=${page + 1}`}
            className="px-4 py-2 bg-[rgb(158,108,52)] text-white rounded hover:bg-[rgb(97,64,18)]"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
}
