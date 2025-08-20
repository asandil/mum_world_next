// components/PoetryCard.tsx
"use client";

import Link from "next/link";
import formatDate from "../js/utils.js";

export default function PoetryCard({ post }) {
  const blog = async (node) => {
    try {
      const response = await axios.get(`${baseuri}${node}/json`);
      console.log("first!!!!!!", response);
      return response.data;
    } catch (error) {
      console.log("error while fetching blogdata");
    }
  };
  

  return (
    <div className="w-full md:w-[45%] border border-gray-200 hover:shadow-lg m-4 transition-shadow duration-300">
      {/* Image Container */}
      <div
        className="relative bg-cover bg-no-repeat bg-center"
        // style={{ backgroundImage: `url(${post.data.image.url})` }}
      >
        <img
          className="z-10 h-[300px] block mx-auto object-cover w-full"
          // src={post.data.image.url}
          // alt={post.data.image.alt}
          width={400}
          height={300}
        />
      </div>

      {/* Content Container */}
      <div className="px-6 py-8 flex flex-col justify-between min-h-[345px]">
        <div>
          {/* Meta Info */}
          <div className="flex gap-3 justify-center text-sm leading-6 text-gray-500 pb-8">
            {/* <span>{formatDate(post.data.date)}</span> */}
            <span>kola</span>
            <span>|</span>
            <span>Poetry</span>
          </div>
          {/* Title */}
          <h4 className="mb-4 text-2xl leading-tight font-normal text-black text-center">
            <Link
              // href={`/the-poetry/${post.slug}`}
              href={`/the-poetry`}
              className="hover:text-amber-800 transition-colors"
            >
              {/* {post.data.title} */}
              kola
            </Link>
          </h4>
          {/* Description */}
          {/* <div 
            className="text-left pb-4 whitespace-pre-line text-base font-normal"
            dangerouslySetInnerHTML={{ __html: post.data.description.slice(0, 150) + "..." }}
          /> */}
          kola
        </div>

        {/* Read More Link */}
        <div className="block text-end">
          <Link
            // href={`/the-poetry/${post.slug}`}
            href={`/the-poetry`}
            className="text-amber-700 hover:text-amber-900 transition-colors font-medium"
          >
            Continue Reading →
          </Link>
        </div>
      </div>
    </div>
  );
}
