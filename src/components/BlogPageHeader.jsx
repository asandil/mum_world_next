import Image from "next/image";
import React from "react";

const BlogPageHeader = () => {
  return (
    <div>
      <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
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
      <h2 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
        Beautiful And Inspirational Poems For You
        <hr className="mt-[16px] border-[1px] border-black" />
      </h2>
      <p className="mb-[40px]">
        Keep reading to explore our collection of poems that you will surely
        enjoy. Bouts of love, suspense, and nervousness – you may experience a
        range of emotions, and these poems beautifully portray them all. Whether
        you’re looking for cheeky poems on pregnancy, newborns, motherhood or
        parenting, we have got you covered. <br />
        Here is our collection of some happy, sad, wacky and funny poems you
        would love to read.
      </p>
      <div className="pb-[48px] font-bold">
        <nav>
          <ul className="flex justify-center items-center gap-[1rem] text-[16px] font-[700]">
            <li>
              <a
                className="active-link text-[#F69E87] hover:text-[#e6846a]"
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
  );
};

export default BlogPageHeader;
