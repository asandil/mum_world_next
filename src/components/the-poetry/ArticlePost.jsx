import Author from "../Author";
import RecentPosts from "../RecentPosts";
import SharePost from "../SharePost";
import SignUp from "../SignUp";

export default function ArticlePost({ post }) {
  if (!post) {
    return <p className="text-center text-gray-500">Post not found.</p>;
  }

  return (
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
            {post.title}
          </h1>
          <p className="flex gap-3 justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[32px]">
            <span className="">February 24, 2023</span>
            <span className="">|</span>
            <span>poetry</span>
          </p>
          <figure className="mb-[24px] w-[272px] mx-auto">
            {/* <img src={""} alt={""} width="272" /> */}
            <figcaption className="text-[rgb(82,82,82)] px-[8px] py-[4px] bg-[rgb(246,246,246)] font-[400] font-[Lato] text-center">
              {/* {image.alt} */}
              Family of Four
            </figcaption>
          </figure>
          {/* <!-- slot --> */}
          {/* <slot /> */}
          <p className="w-[30%] mb-[12px]">
            {post.body}
          </p>
          <p className="w-[30%] mb-[12px]">
            {post.body}
          </p>
          <p className="w-[30%] mb-[12px]">
            {post.body}
          </p>
          <p className="w-[30%] mb-[12px]">
            {post.body}
          </p>
          <p className="w-[30%] mb-[12px]">
            {post.body}
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
  );
}
