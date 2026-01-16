"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import axios from "axios";

const ArrowNext = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white  right-10"
    >
      <LuChevronRight size={25} className="text-gray-600" />
    </button>
  );
};

const ArrowPrev = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white  left-10"
    >
      <LuChevronLeft size={25} className="text-gray-600" />
    </button>
  );
};

const MainSlider = () => {

   const id = '69049df0bda4fe5a7b9cf6a4'

  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBannerData();
  }, []);

  const fetchBannerData = async () => {
    try {
      const response = await axios.get(`/api/banner/get/${id}`);
      console.log("banner data", response)
      setBannerData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: false,
          arrow: false,
          nextArrow: "",
          prevArrow: "",
        },
      },
    ],
  };

  if (loading) {
    return <div className="h-64 bg-gray-200 animate-pulse rounded"></div>;
  }

  return (
    <div>
      {bannerData.length > 0 ? (
        <Slider {...settings}>
          {bannerData.map((banner, index) => (
            <div key={banner._id || index}>
              <Image
                src={banner.image?.url || `/api/banner/${banner.image}` || "/placeholder.jpg"}
                width={1200}
                height={400}
                alt={banner.name || `Banner ${index + 1}`}
                className="h-100 w-full object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </Slider>
      ) : (
        // Fallback to static images if no banner data
        <Slider {...settings}>
          <div>
            <Image
              src={slider1.src}
              width={1200}
              height={400}
              alt="slider 1"
              className="h-100 w-full object-cover"
            />
          </div>
          <div>
            <Image
              src={slider2.src}
              width={1200}
              height={400}
              alt="slider 2"
              className="h-100 w-full object-cover"
            />
          </div>
        </Slider>
      )}
    </div>
  );
};

// Don't forget to import your static images
import slider1 from "@/assets/images/slider-1.png";
import slider2 from "@/assets/images/slider-2.png";
// ... other imports

export default MainSlider;