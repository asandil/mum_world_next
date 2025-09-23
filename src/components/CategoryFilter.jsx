"use client";
import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className=" gap-3 mb-6">
      <h1 className="  text-[18px] font-[500] uppercase text-black">
        Categories
      </h1>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? "bg-[#F69E87] text-white cursor-not-allowed "
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer "
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
