import { getPoetryPosts } from "@/lib/content";
import Author from "@/components/Author";
import SharePost from "@/components/SharePost";
import RecentPosts from "@/components/RecentPosts";
import SignUp from "@/components/SignUp";
import Image from "next/image";

export default async function PoetryPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = getPoetryPosts();
  const post = posts.find((p) => p.slug === decodedSlug);

  if (!post) return <p>Post not found</p>;

  return (
    <>
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
            enjoy. Bouts of love, suspense, and nervousness – you may experience
            a range of emotions, and these poems beautifully portray them all.
            Whether you’re looking for cheeky poems on pregnancy, newborns,
            motherhood or parenting, we have got you covered. <br />
            Here is our collection of some happy, sad, wacky and funny poems you
            would love to read.
          </p>
        </div>

        <article>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-[100%] lg:w-[67%] lg:border-r-[1px] border-[rgb(226,226,226)] px-[24px]">
              <a
                className="text-[rgb(158,108,52)] text-[16px] font-[500] inline-flex mb-[40px]  items-center gap-2 hover:text-[rgb(97,64,18)]"
                href="/the-poetry"
              >
                <svg
                  className="rotate-90"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                  data-ux="Icon"
                >
                  <path d="M19.544 7.236a.773.773 0 0 1-.031 1.06l-7.883 7.743-7.42-7.742a.773.773 0 0 1 0-1.061.699.699 0 0 1 1.017 0l6.433 6.713 6.868-6.745a.698.698 0 0 1 1.016.032"></path>
                </svg>
                All Posts
              </a>
              <h1 className="font-[400] text-[28px] text-black mb-[8px] leading-[1.125]">
                {post.frontmatter.title}
              </h1>
              <p className="flex gap-3 justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[32px]">
                <span className="">
                  {new Date(post.frontmatter.date).toDateString()}
                </span>
                <span className="">|</span>
                <span>poetry</span>
              </p>

              <figure className="mb-[24px] w-full max-w-[372px] md:max-w-[500px] flex flex-col mx-auto">
                <div className="relative  w-full h-[350px] overflow-hidden rounded-lg">
                  <Image
                    src={post.frontmatter.image.url}
                    alt={post.frontmatter.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px"
                  />
                </div>
                <figcaption className="text-[rgb(82,82,82)] px-[8px] py-[4px] bg-[rgb(246,246,246)] font-[400] text-center">
                  {post.frontmatter.image.alt}
                </figcaption>
              </figure>
              {/* <!-- slot --> */}
              {/* <slot /> */}
              <p className="w-[60%] mb-[12px]">
                {post.content.replace(/<br\s*\/?>/gi, " ")}
              </p>
              <div className="mt-[20px] ">
                <Author />
              </div>
              {/* <!-- Share this post --> */}
              <div className="mt-5">
                <SharePost />
              </div>
            </div>
            <div className="w-[100%] lg:w-[33%] order-2 lg:px-[24px] border-t-[1px] lg:border-t-0 pt-[1.25rem] lg:pt-0 px-[24px]">
              {/* <!-- categories --> */}
              <h4 className="mb-[24px] text-[22px] font-[400] text-black leading-[1.25]">
                Categories
              </h4>
              <ul className="flex  flex-col gap-5 text-[16px] text-black mb-[56px]">
                <li>
                  <a className="active-link font-bold" href="/the-poetry">
                    All Posts
                  </a>
                </li>
                <li>
                  <a href="/the-poetry">Poetry</a>
                </li>
              </ul>
              {/* <!-- Sign Up for blog Updates */}
              <SignUp />
              {/* <!-- RecentPosts --> */}
              <RecentPosts />
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
