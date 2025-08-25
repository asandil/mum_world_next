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
      <div className="flex w-[73%] justify-between items-center gap-4 mt-8">
        <div>
          {page > 1 && (
            <Link
              href={`/blog?page=${page - 1}`}
              className="px-4 py-2 text-black hover:text-blue-600"
            >
              <div className="flex items-center">
                <img
                  src="/nextPage.png"
                  height="24"
                  width="24"
                  className="mr-1 rotate-180 hover:text-blue-500"
                  alt="Previous"
                />
                Previous
              </div>
            </Link>
          )}
        </div>

        <span className="px-4 py-2 bg-white text-black">
          Page {page} of {totalPages}
        </span>

        <div>
          {page < totalPages && (
            <Link
              href={`/blog?page=${page + 1}`}
              className="px-4 py-2 bg-white text-black hover:text-blue-600"
            >
              <div className="flex items-center">
                NEXT{" "}
                <img
                  src="/nextPage.png"
                  height="24"
                  width="24"
                  className="ml-1"
                  alt="Next"
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
