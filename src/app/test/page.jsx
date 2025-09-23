import React from "react";
import Blogs from "@/lib/BlogsData";

const TestBlogPage = () => {
  const blogsData = Blogs;
  return (
    <>
      <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
          MY BLOG
          <hr className="mt-[16px] border-[1px] border-black" />
        </h1>
        <div className="w-[100%] ">
          <div className="w-[100%] mt-[16px]">
            {blogsData.map((blog, id) => (
              <div key={id} >
                <h1>{blog.title}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestBlogPage;
