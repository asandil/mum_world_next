// components/Pagination.jsx
"use client";
import React from "react";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  postsPerPage,
  totalPosts 
}) => {
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="pagination-container">
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-12 space-x-4">
        {/* Previous Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-[#F69E87] hover:bg-[#e6846a] text-white"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === number
                  ? "bg-[#F69E87] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-[#F69E87] hover:bg-[#e6846a] text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center mt-4 text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;