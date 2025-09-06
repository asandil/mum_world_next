// components/FAQAccordion.js
"use client"; // needed because we are using DOM event listeners in React

import { useState } from "react";

export default function FAQAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[100%] md:w-[66%] xl:w-[60%] mx-auto">
      <div className="py-[16px] border-b-[1px] border-[rgb(226,226,226)] faq-accordion">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-[100%] justify-between items-center cursor-pointer ${
          isOpen ? "text-[#F69E87]" : ""
        }`}
      >
        <p className="leading-[1.25] text-[22px] font-[400] text-start">
          {question}
        </p>
        <svg
          className={`mr-[16px] text-[16px] shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
          width="16"
          height="16"
          data-ux="Icon"
        >
          <path d="M19.544 7.236a.773.773 0 0 1-.031 1.06l-7.883 7.743-7.42-7.742a.773.773 0 0 1 0-1.061.699.699 0 0 1 1.017 0l6.433 6.713 6.868-6.745a.698.698 0 0 1 1.016.032"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="py-[8px] faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
    </div>
  );
}
