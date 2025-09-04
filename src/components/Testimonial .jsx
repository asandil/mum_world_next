// components/TestimonialCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import testimonials from "@/lib/TestimonialData";

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(1); // Start with 1 for mobile first

  // Update cards to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2); // Tablet
      } else {
        setCardsToShow(3); // Desktop
      }
      
      // Reset index when changing card count to avoid empty spaces
      setCurrentIndex(0);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalGroups = Math.ceil(testimonials.length / cardsToShow);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalGroups - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalGroups - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval;

    if (isAutoPlay) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlay, currentIndex, totalGroups]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
        What Our Clients Say
      </h2>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / totalGroups)}%)`,
          }}
        >
          {Array(totalGroups)
            .fill(0)
            .map((_, groupIndex) => (
              <div
                key={groupIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2"
              >
                {testimonials
                  .slice(
                    groupIndex * cardsToShow,
                    groupIndex * cardsToShow + cardsToShow
                  )
                  .map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-white rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 flex flex-col"
                    >
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm truncate">
                            {testimonial.role}
                          </p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  i < testimonial.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm sm:text-base italic mb-0 mt-auto">
                        "{testimonial.content}"
                      </p>
                    </div>
                  ))}
              </div>
            ))}
        </div>

        {/* Navigation buttons - Hidden on mobile, visible on tablet and up */}
        <button
          onClick={prevTestimonial}
          className="hidden sm:block absolute cursor-pointer left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100 focus:outline-none z-10"
          aria-label="Previous testimonial"
        >
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextTestimonial}
          className="hidden sm:block absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100 focus:outline-none z-10"
          aria-label="Next testimonial"
        >
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Mobile navigation buttons */}
        <div className="flex justify-center mt-6 sm:hidden">
          <button
            onClick={prevTestimonial}
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none mx-2"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none mx-2"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 sm:mt-8">
        {Array(totalGroups)
          .fill(0)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-2 w-2 cursor-pointer sm:h-3 sm:w-3 rounded-full mx-1 sm:mx-2 ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial group ${index + 1}`}
            />
          ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;