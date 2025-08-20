import React from "react";

const RecentPosts = () => {
  return (
    <div>
      <h4 className="mb-[24px] text-[22px] leading-[1.25] font-[400] text-[rgb(27,27,27)]">
        Recent Posts
      </h4>

      <div className="mb-[24px] flex gap-5">
        <div className="min-h-[110px] min-w-[110px]">
          <img
            classNameName="border-[#FAB66B] rounded-full border-[5px]"
            src="/shriti.webp"
            alt="Author"
            width="70"
            height="70"
          />
        </div>
        <div>
          <a
            className="leading-[1.5] font-[400] text-[rgb(27,27,27)] text-[16px]"
            href={`/the-poetry`}
          >
            Mom will always love you
          </a>
          <p className="mt-[16px] text-[14px] leading-[1.5] font-[400] text-[rgb(89,89,89)]">
            March 1, 2023
          </p>
        </div>
      </div>

      <div className="mb-[24px] flex gap-5">
        <div className="min-h-[110px] min-w-[110px]">
          <img
            classNameName="border-[#FAB66B] rounded-full border-[5px]"
            src="/shriti.webp"
            alt="Author"
            width="70"
            height="70"
          />
        </div>
        <div>
          <a
            className="leading-[1.5] font-[400] text-[rgb(27,27,27)] text-[16px]"
            href={`/the-poetry`}
          >
            First Year!!
          </a>
          <p className="mt-[16px] text-[14px] leading-[1.5] font-[400] text-[rgb(89,89,89)]">
            December 5, 2023
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default RecentPosts;
