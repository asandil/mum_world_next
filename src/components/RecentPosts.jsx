import React from "react";
import { getPoetryPosts } from "@/lib/content";
import Link from "next/link";

const POSTS_PER_PAGE = 4;

const RecentPosts = ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1;
  const posts = getPoetryPosts();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  return (
    <div>
      <h4 className="mb-[24px] text-[22px] leading-[1.25] font-[400] text-[rgb(27,27,27)]">
        Recent Posts
      </h4>

      {/* <div className="mb-[24px] flex gap-5">
        <div className="min-h-[110px] min-w-[110px]">
          <img
            classNameName="border-[#FAB66B] rounded-full border-[5px]"
            src="/shriti.webp"
            alt="Author"
            width="70"
            height="70"
          />
        </div>
        <div>
          <a
            className="leading-[1.5] font-[400] text-[rgb(27,27,27)] text-[16px]"
            href={`/the-poetry`}
          >
            Mom will always love you
          </a>
          <p className="mt-[16px] text-[14px] leading-[1.5] font-[400] text-[rgb(89,89,89)]">
            March 1, 2023
          </p>
        </div>
      </div> */}

      {paginatedPosts.map((post) => (
        <div key={post.frontmatter.title} className="mb-[24px] flex gap-5">
          <div className="min-h-[110px] min-w-[110px]">
            <img
              className="border-[#FAB66B] rounded-full border-[2px]"
              // src="/shriti.webp"
              src={post.frontmatter.image.url}
              // src="https://tse3.mm.bing.net/th/id/OIP.isXwJc2soLmlBLYvbWcxYAHaE8?pid=Api&P=0&h=180"
              alt={post.frontmatter.image.alt}
              // alt="Author"
              width="70"
              height="70"
            />
          </div>
          <div>
            <a
              className="leading-[1.5] font-[400] text-[rgb(27,27,27)] text-[16px]"
              href={`/the-poetry/${post.slug}`}
            >
              {post.frontmatter.title}
            </a>
            <p className="mt-[16px] text-[14px] leading-[1.5] font-[400] text-[rgb(89,89,89)]">
              <span className="">{new Date(post.frontmatter.date).toDateString()}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
