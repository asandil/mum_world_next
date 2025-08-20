import BlogList from "@/components/blog/BlogList";
import BlogPost from "@/components/blog/BlogPost";
import Categories from "@/components/Categories";
import RecentPosts from "@/components/RecentPosts";
import SignUp from "@/components/SignUp";
import { getBlogPosts } from "@/lib/api/blog";

export default async function BlogPostPage() {
  const posts = await getBlogPosts();

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
            <BlogPost posts={posts} />
            {/* commom */}
          </div>
        </div>
      </div>
    </section>
  );
}
