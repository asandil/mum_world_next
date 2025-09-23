"use client";
import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? "bg-[#F69E87] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
