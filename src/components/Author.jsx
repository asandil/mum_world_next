import React from "react";

const Author = () => {
  return (
    <div>
      <div>
        <p className="w-[45%] h-[4px] bg-[#F69E87] mb-4"></p>
        <div className="flex items-center gap-7">
          <img
            className="border-[#F69E87] rounded-full border-[5px]"
            src="/shriti.webp"
            alt="Author"
            width="70"
            height="70"
          />
          <div>
            <p className="italic font-semibold text-gray-500">Author</p>
            <p className="font-bold text-lg">
              Sriti Jha{" "}
              <span className="text-sm font-semibold text-[rgb(146,142,142)]">
                - Sharing the chaos and joys of motherhood
              </span>
            </p>
            <a
              className="inline-block"
              href="https://www.linkedin.com/in/sriti-jha-93423b57/"
            >
              <img
                className=""
                src="/linkedin.png"
                alt="linkedin-profile"
                width="24"
                height="24"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
