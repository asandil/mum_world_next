// app/blog/page.js
import ArticleList from "@/components/the-poetry/ArticleList";
import BlogList from "@/components/the-poetry/ArticleList";
import { getBlogPosts } from "@/lib/api/blog";
import { getPoetryPosts } from "@/lib/content";
import Link from "next/link";

const POSTS_PER_PAGE = 4;

export default async function ArticlePage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const posts = getPoetryPosts();
  // console.log("kolkkolk!!!!!!!!!!!!!!!!",posts)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
      <div>
        <h1
          className="mb-[24px]
            leading-[1.4]
            tracking-[1px]
            text-[22px]
            font-[700]
            uppercase
            text-black"
        >
          Poetry of Pregnancy, New Born, Motherhood and Parenting
          <hr className="mt-[16px] border-[1px] border-black" />
        </h1>
        <div className="mb-[24px]">
          <img
            className="w-[100%]
                md:w-[50%]
                lg:w-[33%]"
            src="//img1.wsimg.com/isteam/ip/7d906beb-bc9b-4377-9b06-b22a3566899c/20230222_225058.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:400,h:400,cg:true"
            alt="The Poetry of Modern Pregnancy, Newborn Motherhood and parenting "
            sizes="(max-width: 600px) 100%, (max-width: 900px) 50vw, 33.3vw"
          />
        </div>
        <h2
          className="mb-[24px]
            leading-[1.4]
            tracking-[1px]
            text-[22px]
            font-[700]
            uppercase
            text-black"
        >
          Beautiful And Inspirational Poems For You
          <hr className="mt-[16px] border-[1px] border-black" />
        </h2>
        <p className="mb-[40px]">
          Keep reading to explore our collection of poems that you will surely
          enjoy. Bouts of love, suspense, and nervousness – you may experience a
          range of emotions, and these poems beautifully portray them all.
          Whether you’re looking for cheeky poems on pregnancy, newborns,
          motherhood or parenting, we have got you covered. <br />
          Here is our collection of some happy, sad, wacky and funny poems you
          would love to read.
        </p>
        <div className="pb-[48px] font-bold">
          <nav>
            <ul
              className="flex
                    justify-center
                    items-center
                    gap-[1rem]
                    text-[16px]
                    font-[700]"
            >
              <li>
                <a
                  className="active-link text-[rgb(158,108,52)] hover:text-[rgb(97,64,18)]"
                  href="/the-poetry"
                >
                  All Posts
                </a>
              </li>
              <li>
                <a className="" href="/the-poetry">
                  Poetry
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {paginatedPosts.map((post) => (
          <div
            key={post.frontmatter.title}
            className="w-full md:w-[45%] border border-gray-200 hover:shadow-lg m-4 transition-shadow duration-300"
          >
            {/* Image Container */}
            <div
              className="bg-cover bg-no-repeat bg-center"
              // style={`background-image: url(${post.frontmatter.image.url})`}
            >
              <img
                className="z-10 h-[300px] block mx-auto bg-black"
                src={post.frontmatter.image.url}
                // src="https://tse3.mm.bing.net/th/id/OIP.isXwJc2soLmlBLYvbWcxYAHaE8?pid=Api&P=0&h=180"
                alt={post.frontmatter.image.alt}
                height={300}
              />
            </div>

            {/* Content Container */}
            <div className="px-6 py-8 flex flex-col justify-between min-h-[345px]">
              <div>
                <div className="flex gap-3 justify-center text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] pb-[32px]">
                  <span class="">
                    {new Date(post.frontmatter.date).toDateString()}
                  </span>
                  <span class="">|</span>
                  <span class="">Poetry</span>
                </div>
                <h4 className="mb-[16px] text-[22px] leading-[1.125] font-[400] text-black text-center">
                  <Link
                    href={`/the-poetry/${post.slug}`}
                    className="hover:text-amber-800 transition-colors"
                  >
                    {post.frontmatter.title}
                  </Link>
                </h4>
                <p className="text-left pb-[16px] whitespace-pre-line text-[16px] font-[400]">
                  {post.frontmatter.description.replace(/<br\s*\/?>/gi, " ")}
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

      {/* Pagination */}
      <div className="flex justify-between  items-center gap-4 mt-8">
        {/* Previous Button */}
        <div>
          {""}
          {page > 1 && (
            <Link
              href={`/the-poetry?page=${page - 1}`}
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
              href={`/the-poetry?page=${page + 1}`}
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
    </section>
  );
}
