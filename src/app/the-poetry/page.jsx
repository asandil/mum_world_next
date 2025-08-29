// app/blog/page.js
import ArticleList from "@/components/the-poetry/ArticleList";
import BlogList from "@/components/the-poetry/ArticleList";
import { getBlogPosts } from "@/lib/api/blog";
import { getPoetryPosts } from "@/lib/content";
import Image from "next/image";
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
        <div className="mb-[24px] rounded-2xl w-full h-[500px] relative">
          <Image
            src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1756450957/Poetry_section_top_image_nqwdva.jpg"
            alt="The Poetry of Modern Pregnancy, Newborn Motherhood and parenting"
            fill
            className="object-cover rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1160px"
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
            className="w-full md:w-[45%] border rounded-lg border-gray-200 hover:shadow-lg m-4 transition-shadow duration-300"
          >
            <figure className="bg-cover bg-no-repeat  px-auto bg-center rounded-lg mt-[12px] md:mt-[16px] lg:mt-[24px]">
              <img
                className="w-[250px] h-[200px] sm:w-[450px] sm:h-[300px] md:w-[300px] md:h-[400px] lg:w-[450px] lg:h-[400px] mx-auto block rounded-lg"
                src={post.frontmatter.image.url}
                alt={post.frontmatter.image.alt}
                // height={400}
              />
            </figure>

            {/* Content Container */}
            <div className="px-6 py-8 flex flex-col ">
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
                <p className="text-left mb-[12px] pb-[16px] whitespace-pre-line text-[16px] font-[400]">
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

      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
        {/* Previous Button */}
        {page > 1 ? (
          <Link
            href={`/the-poetry?page=${page - 1}`}
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
              href={`/the-poetry?page=${i + 1}`}
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
            href={`/the-poetry?page=${page + 1}`}
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
