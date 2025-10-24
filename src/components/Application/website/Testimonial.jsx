"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoStar } from "react-icons/io5";
import { BsChatQuote } from "react-icons/bs";

const testimonials = [
  {
    name: "Sarah Johnson",
    review: `The service I received was absolutely outstanding! 
The team went above and beyond to ensure my needs were met.
I would definitely recommend them to anyone looking for quality service.
Their attention to detail is remarkable.`,
    rating: 5,
  },
  {
    name: "Michael Chen",
    review: `This product has completely transformed my daily workflow.
It's intuitive and easy to use while being powerful enough for complex tasks.
The customer support team is also very responsive and helpful.
I couldn't be happier with my purchase!`,
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    review: `Good value for the price, though there's some room for improvement.
The interface could be more user-friendly for beginners.
However, the core functionality works well and meets my basic needs.
I'm satisfied overall with the performance.`,
    rating: 4,
  },
  {
    name: "David Thompson",
    review: `An excellent experience from start to finish!
The onboarding process was smooth and well-guided.
Features are well-documented and work as advertised.
It has significantly improved our team's productivity.`,
    rating: 5,
  },
  {
    name: "Priya Patel",
    review: `Solid product with great potential.
I've encountered minor bugs but the team quickly addressed them.
The regular updates show commitment to improvement.
Looking forward to seeing how the platform evolves.`,
    rating: 4,
  },
  {
    name: "James Wilson",
    review: `Outstanding customer service and product quality!
They handled my custom requirements with professional expertise.
The solution was delivered ahead of schedule.
Will certainly be using their services again in the future.`,
    rating: 5,
  },
  {
    name: "Lisa Zhang",
    review: `A decent product that gets the job done.
The learning curve was steeper than I expected.
Once you master it, the capabilities are impressive.
Wish the documentation was more comprehensive though.`,
    rating: 4,
  },
  {
    name: "Robert Garcia",
    review: `Exceeded all my expectations in every way!
The implementation was seamless and disruption-free.
It has saved our company countless hours of manual work.
The ROI was achieved much faster than anticipated.`,
    rating: 5,
  },
  {
    name: "Amanda Foster",
    review: `Good overall but needs some polish in certain areas.
Mobile experience could be more optimized.
However, the desktop version works flawlessly.
Looking forward to future updates and enhancements.`,
    rating: 4,
  },
  {
    name: "Kevin O'Malley",
    review: `Absolutely phenomenal service and support!
The team was patient and thorough throughout implementation.
They customized several features to match our workflow perfectly.
This has been our best software investment this year!`,
    rating: 5,
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
      <h2 className="text-center sm:text-4xl text-2xl mb-5 font-semibold ">
        Customer Review
      </h2>
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div key={index} className="p-5" >
            <div className="border rounded-lg p-5" >
              <BsChatQuote size={30} className="mb-5" />
              <p className="mb-5" >{item.review}</p>
              <h4 className="font-semibold" >{item.name}</h4>
              <div className="flex mt-1 ">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <IoStar
                    key={`star${i}`}
                    className="text-yellow-400"
                    size={20}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
