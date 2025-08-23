import Author from "@/components/Author";
import BlogList from "@/components/blog/BlogList";
import BlogPost from "@/components/blog/BlogPost";
import Categories from "@/components/Categories";
import RecentPosts from "@/components/RecentPosts";
import SharePost from "@/components/SharePost";
import SignUp from "@/components/SignUp";
import { getBlogPosts } from "@/lib/content";

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <p>Post not found</p>;

  return (
    <section className="py-[26px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
      <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
        MY BLOG
        <hr className="mt-[1px] border-[1px] border-black" />
      </h1>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-[100%] lg:w-[34.2%] order-2 lg:px-[24px] border-t-[1px] lg:border-t-0 pt-[1.25rem] lg:pt-[16px]">
          {/* <!-- categories --> */}
          <Categories />

          {/* <!-- Sign Up for blog Updates */}
          <SignUp />
          {/* <!-- RecentPosts --> */}
          <RecentPosts />
        </div>
        <div className="w-[100%] lg:w-[65.8%]">
          <div className="w-[100%] lg:border-r-[2px] border-[rgb(226,226,226)]">
            {/* <BlogPost posts={posts} /> */}

            <article className="mt-[16px]">
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="w-[100%]  px-[24px]">
                  <a
                    className="text-[rgb(158,108,52)] text-[16px] font-[500] inline-flex mb-[40px] items-center gap-2 hover:text-[rgb(97,64,18)]"
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
                    All Blogs
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
                  <figure className="mb-[24px] w-[272px] mx-auto">
                    <img
                      src={
                        "https://tse1.mm.bing.net/th/id/OIP.Nf1Al2vYM7KnKK32pPSJ5gHaFE?pid=Api&P=0&h=180"
                      }
                      // src={post.frontmatter.image.url} alt={post.frontmatter.image.alt}

                      width="272"
                    />
                    <figcaption className="text-[rgb(82,82,82)] px-[8px] py-[4px] bg-[rgb(246,246,246)] font-[400] font-[Lato] text-center">
                      {post.frontmatter.image.alt}
                    </figcaption>
                  </figure>
                  {/* <!-- slot --> */}
                  {/* <slot /> */}

                  <div>
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
                  </div>

                  <div className="mt-[20px]">
                    <Author />
                  </div>
                  {/* <!-- Share this post --> */}
                  <div className="mt-5">
                    <SharePost />
                  </div>
                </div>
              </div>
            </article>

            {/* commom */}
          </div>
        </div>
      </div>
    </section>
  );
}
