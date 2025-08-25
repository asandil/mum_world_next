// src/app/blog/FilterSection.jsx
"use client";
import React, { useState, useEffect } from 'react';

const FilterSection = ({ posts, onFilterChange }) => {
  const [allCategories, setAllCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    console.log("=== FILTERSECTION DEBUG ===");
    console.log("Posts received:", posts);
    
    if (!posts || !Array.isArray(posts)) {
      console.log("No posts array provided");
      setAllCategories(['All']);
      return;
    }

    console.log("Number of posts:", posts.length);
    
    if (posts.length > 0) {
      console.log("First post:", posts[0]);
      console.log("First post frontmatter:", posts[0]?.frontmatter);
    }

    const categories = new Set(['All']);
    
    // Extract categories from all posts
    posts.forEach(post => {
      if (post?.frontmatter) {
        // Extract from tags field
        if (post.frontmatter.tags) {
          if (typeof post.frontmatter.tags === 'string') {
            // Handle comma-separated tags
            post.frontmatter.tags.split(',').forEach(tag => {
              const trimmed = tag.trim();
              if (trimmed) categories.add(trimmed);
            });
          } else if (Array.isArray(post.frontmatter.tags)) {
            // Handle array of tags
            post.frontmatter.tags.forEach(tag => {
              const trimmed = tag?.toString().trim();
              if (trimmed) categories.add(trimmed);
            });
          }
        }
        
        // Extract from category field
        if (post.frontmatter.category) {
          const category = post.frontmatter.category.toString().trim();
          if (category) categories.add(category);
        }
      }
    });
    
    const sortedCategories = Array.from(categories).sort();
    console.log("Extracted categories:", sortedCategories);
    
    setAllCategories(sortedCategories);
  }, [posts]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onFilterChange(category === 'All' ? null : category);
  };

  if (allCategories.length <= 1) {
    return (
      <div className="filter-section mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Filter by Category</h3>
        <p className="text-sm text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <div className="filter-section mb-8">
      <h3 className="mb-[24px] text-[22px] font-[400] text-black leading-[1.25]">Categories</h3>
      <div className="flex flex-col flex-wrap gap-2 ">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={` py-2 text-start transition-colors text-[16px] font-[400] ${
              activeCategory === category
                ? ' text-amber-600 font-bold cursor-not-allowed'
                : 'hover:text-[rgb(97,64,18)] cursor-pointer'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;