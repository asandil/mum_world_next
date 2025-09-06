// components/FeedbackForm.tsx
"use client";

import { useState } from "react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    category: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data", formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto ">
      <h4 className="text-center md:text-start text-[22px] text-[rgb(27,27,27)] leading-[1.25] mb-[24px] font-[400]">
        Share Your Feedback
      </h4>
      {/* <h2 className="text-2xl font-bold text-start mb-6 text-gray-800">Share Your Feedback</h2> */}

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Thank you for your feedback! We appreciate you taking the time to
          share your thoughts with us.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          There was an error submitting your feedback. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label> */}
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              className="py-[15.5px] px-[16px] form_text text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] w-[100%] font-[400] text-[16px] focus:outline-none focus:border focus:border-current"
              required
            />
          </div>

          <div>
            {/* <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label> */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              className="py-[15.5px] px-[16px] form_text text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] w-[100%] font-[400] text-[16px] focus:outline-none focus:border focus:border-current"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rate your experience with us
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="focus:outline-none cursor-pointer"
              >
                <svg
                  className={`w-8 h-8 ${
                    star <= formData.rating ? "text-[#F69E87]" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-[8px]"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="py-[15.5px] px-[16px] form_text text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] w-[100%] font-[400] text-[16px] focus:outline-none focus:border focus:border-current"
          >
            <option value="general">General Feedback</option>
            <option value="content">Content Suggestion</option>
            <option value="medical">Medical Information</option>
            <option value="nutrition">Nutrition & Diet</option>
            <option value="fitness">Pregnancy Fitness</option>
            <option value="mental-health">Mental Health</option>
            <option value="preparation">Birth Preparation</option>
            <option value="postpartum">Postpartum Care</option>
            <option value="community">Community Support</option>
            <option value="technical">Technical Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Feedback
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="py-[6px] px-[16px] h-[112px] resize-none form_text text-[rgb(94,94,94)] border-[1px] border-[rgb(226,226,226)] w-[100%] font-[400] text-[16px] focus:outline-none focus:border focus:border-current"
            required
          ></textarea>
        </div>

        <div className="pb-[24px] mt-[24px]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="font-[700] min-h-[56px] w-[100%] bg-[#F69E87] text-[#fff] cursor-pointer text-[14px] hover:bg-[#e6846a] transition-all duration-300 ease-in-out delay-0 disabled:opacity-50 disabled:cursor-not-allowed rounded-[3px] hover:shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center text-white">
                <div className="loader mr-[10px]"></div>
                <style jsx>{`
                  .loader {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    display: inline-block;
                    border-top: 2px solid #ffeb3b;
                    border-right: 2px solid transparent;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                    position: relative;
                  }
                  .loader::after {
                    content: "";
                    box-sizing: border-box;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    border-bottom: 2px solid #ffeb3b;
                    border-left: 2px solid transparent;
                  }
                  @keyframes rotation {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
                Sending...
              </div>
            ) : (
              "SEND"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
