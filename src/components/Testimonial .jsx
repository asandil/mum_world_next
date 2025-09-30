"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react"; // install lucide-react if not already

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 3; // show 3 testimonials at a time

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/feedback");
      const result = await response.json();

      if (result.success) {
        setTestimonials(result.data.feedback);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
  };

  if (loading) {
    return <div className="text-center">Loading testimonials...</div>;
  }

  const start = currentIndex * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleTestimonials = testimonials.slice(start, end);

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Users Say
      </h2>

      {/* Carousel */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>

        {/* Left Arrow */}
        {testimonials.length > itemsPerPage && (
          <button
            onClick={prevSlide}
            className="absolute left-[-25px] top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Arrow */}
        {testimonials.length > itemsPerPage && (
          <button
            onClick={nextSlide}
            className="absolute right-[-25px] top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dots */}
      {testimonials.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {testimonials.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No testimonials yet. Be the first to share your feedback!
        </div>
      )}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className=" flex flex-col h-full">
        <div className="flex items-center">
          <figure></figure>
          <div  >
            <div className="font-semibold text-gray-900">
              {testimonial.name}
            </div>
            <div className="flex gap-[10px] " >
              
              <p className="text-gray-700 text-sm">
                {testimonial.feedBackAddress}
              </p>
              <p className="text-gray-700 text-sm">
                {testimonial.feedBackCity}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-[12px] items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xl ${
                  i < testimonial.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-400 text-end">
            {new Date(testimonial.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="">
          <div className="text-sm text-gray-500 capitalize mb-2">
            Category: {testimonial.feedBackCategory}
          </div>
          <p className="text-gray-700 mb-2 italic">"{testimonial.bio}"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonials;
