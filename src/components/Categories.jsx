"use client";

import CategoriesData from '@/assets/CategoriesData';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// helper to create slugs from names
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/[^\w-]+/g, '') 
    .replace(/--+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, ''); 

const Categories = () => {
  const pathname = usePathname(); // ✅ current active path

  return (
    <div>
      <h4 className="mb-[24px] text-[22px] font-[400] text-black leading-[1.25]">
        Categories
      </h4>
      <ul className="flex flex-col gap-5 text-[16px] font-[400] text-black mb-[56px]">
        {/* All Posts */}
        <li>
          <Link
            href="/blog"
            className={`categ ${
              pathname === "/blog"
                ? "text-[rgb(97,64,18)] font-semibold"
                : "hover:text-[rgb(97,64,18)]"
            }`}
          >
            All Posts
          </Link>
        </li>

        {/* Dynamic Categories */}
        {CategoriesData.map((tag, index) => {
          const slug = slugify(tag?.name);
          const url = `/blog/category/${slug}`;
          return (
            <li key={index}>
              <Link
                href={url}
                className={`categ ${
                  pathname === url
                    ? "text-[rgb(97,64,18)] font-semibold"
                    : "hover:text-[rgb(97,64,18)]"
                }`}
              >
                {tag?.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
