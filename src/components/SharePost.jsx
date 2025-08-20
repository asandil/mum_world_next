import React from "react";

const SharePost = () => {
  return (
    <div>
      <div className="mt-[24px] flex items-center gap-2 cursor-pointer w-fit">
        <p className="font-[700] text-[14px] leading-[1.5] text-[rgb(27,27,27)]">
          Share this post:
        </p>
        <svg
          className="text-[rgb(59,89,152)]"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="28"
          height="28"
          data-ux="Icon"
          data-aid="RSS_SOCIAL_SHARE_BOTTOM_FACEBOOK"
          data-tccl="ux2.rss.blog.facebook_share_link.click,click"
          class="x-el x-el-svg c2-1 c2-2 c2-3d c2-3e c2-s c2-j c2-3f c2-3 c2-4 c2-5 c2-6 c2-7 c2-8"
        >
          <path
            fill-rule="evenodd"
            d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061c0 5.022 3.657 9.184 8.438 9.939v-7.03h-2.54v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.908h-2.33V22c4.78-.755 8.437-4.917 8.437-9.939z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SharePost;
