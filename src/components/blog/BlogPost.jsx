import React from "react";
import Author from "../Author";
import SharePost from "../SharePost";
import SignUp from "../SignUp";
import RecentPosts from "../RecentPosts";

const BlogPost = ({ post }) => {
  return (
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
            {/* {post.title} */}
            Apple Banana Barley Porridge for Babies :
          </h1>
          <p className="flex gap-3 justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[32px]">
            <span className="">February 24, 2023</span>
            <span className="">|</span>
            <span>poetry</span>
          </p>
          <figure className="mb-[24px] w-[272px] mx-auto">
            <img
              src={
                "https://tse1.mm.bing.net/th/id/OIP.Nf1Al2vYM7KnKK32pPSJ5gHaFE?pid=Api&P=0&h=180"
              }
              alt={""}
              width="272"
            />
            <figcaption className="text-[rgb(82,82,82)] px-[8px] py-[4px] bg-[rgb(246,246,246)] font-[400] font-[Lato] text-center">
              {/* {image.alt} */}
              Family of Four
            </figcaption>
          </figure>
          {/* <!-- slot --> */}
          {/* <slot /> */}

          <div>
            <h1 className="font-[600] text-[20px] text-black mb-2">
              You will Need:
            </h1>
            <ul className="list-disc list-inside text-gray-600 space-y-1 marker:text-gray-400">
              <li>Barley dry cereal powder - 2 tbs</li>
              <li>Banana - 1 small</li>
              <li>Apple - 1 small sized apple</li>
              <li>Breastmilk or formula - ¼ cup</li>
              <li>Water - 1 cup</li>
            </ul>
          </div>

          <div>
            <h1 className="font-[600] text-[20px] text-black mb-2">
              How to Prepare:
            </h1>
            <ul className="list-disc list-inside text-gray-600 space-y-2 marker:text-gray-400">
              <li>
                Peel the apple with a peeler and remove the seeds. Cut the
                banana into slices. Puree the apple & banana using a blender
                with less water.
              </li>
              <li>
                Add 2 tablespoon of barley into a saucepan. Add 1 cup of water
                to it and mix it well with a whisk so that no lumps are formed.
              </li>
              <li>
                Cook the barley on low-medium flame until the barley gets cooked
                thoroughly. Stir it occasionally while cooking, otherwise it may
                stick to the vessel. Once it is cooked, add pureed apple banana.
              </li>
              <li>
                Mix well. Cook it further for 3 more minutes. Switch off the
                flame when it becomes thick. Cool it down and add breastmilk or
                formula whatever you desire. Healthy barley porridge with apples
                & bananas is ready to feed your baby.
              </li>
            </ul>
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
  );
};

export default BlogPost;
