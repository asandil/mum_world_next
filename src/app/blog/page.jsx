import BlogList from "@/components/blog/BlogList";
import Categories from "@/components/Categories";
// import { getBlogPosts } from "@/lib/api/blog";
import { getBlogPosts } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

const POSTS_PER_PAGE = 4;

export default async function BlogPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const data = await getBlogPosts();
  // console.log("!!!!!!!!!!!!data",data)
  const posts = Array.isArray(data)
    ? data
    : Array.isArray(data.posts)
    ? data.posts
    : [];
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
      <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
        MY BLOG
        <hr className="mt-[16px] border-[1px] border-black" />
      </h1>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-[100%] lg:w-[25%] order-2 border-t-[1px] lg:border-t-0 pt-[1.25rem] lg:pt-[12px]">
          {/* <!-- categories --> */}
          <Categories />
        </div>
        <div className="w-[100%] lg:w-[73.2%]">
          <div className="w-[100%] mt-[16px] lg:border-r-[2px] border-[rgb(226,226,226)]">
            {/* <BlogList posts={posts} /> */}

            <div className="flex flex-wrap justify-center items-center">
              {paginatedPosts.map((post) => (
                <div
                  key={post.slug}
                  className="pb-[40px] mt-[40px] border-b-[1px] border-[rgb(226,226,226)] flex flex-col md:flex-row gap-8 justify-center items-center mr-[24px]"
                >
                  <div className="relative w-full md:w-[300px] h-[250px] overflow-hidden rounded-lg">
                    <Image
                      src={post.frontmatter.image.url}
                      alt={post.frontmatter.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px"
                    />
                  </div>

                  <div className="text-start md:text-start flex flex-col flex-1">
                    <p className="flex gap-3 justify-center md:justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[16px]">
                      <span>
                        {new Date(post.frontmatter.date).toDateString()}
                      </span>
                      <span>|</span>
                      <span>{post.frontmatter.tags}</span>
                    </p>
                    <h4 className="mb-[16px] leading-[1.125] text-[22px] font-[400] text-black">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-amber-800 transition-colors"
                      >
                        {/* {post.title.substring(0, 20)} */}
                        {post.frontmatter.title}
                      </Link>
                    </h4>
                    <p className="mb-[16px] leading-[1.5]">
                      {post.frontmatter.description}
                    </p>
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
            </div>

            {/* Pagination */}
            <div className="flex justify-between  items-center gap-4 mt-8">
              {/* Previous Button */}
              <div>
                {""}
                {page > 1 && (
                  <Link
                    href={`/blog?page=${page - 1}`}
                    className="px-4 py-2  text-black hover:text-blue-600"
                  >
                    <div className="flex items-center">
                      <img
                        src="/nextPage.png"
                        height="24"
                        width="24"
                        className="mr-1 rotate-180 hover:text-blue-500"
                      />
                      Previous
                    </div>
                  </Link>
                )}
              </div>

              {/* Page Numbers */}
              {/* {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            href={`/the-poetry?page=${i + 1}`}
            className={`px-4 py-2 border ${
              i + 1 === page
                ? "bg-amber-800 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </Link>
        ))} */}

              <span className="px-4 py-2  bg-white text-black">
                Page {page} of {totalPages}
              </span>

              {/* Next Button */}
              <div>
                {""}
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
                      />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
