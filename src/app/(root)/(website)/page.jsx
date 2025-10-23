import MainSlider from "@/components/Application/website/MainSlider";
import Link from "next/link";
import React from "react";
import banner1 from "@/assets/images/banner1.png";
import banner2 from "@/assets/images/banner2.png";
import Image from "next/image";
import FeaturedProduct from "@/components/Application/website/FeaturedProduct";
import advertisingBanner from "@/assets/images/advertisingBanner.png";

const Home = () => {
  return (
    <>
      <section>
        <MainSlider />
      </section>
      <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
        <div className="grid grid-cols-2 sm:gap-10 gap-2 ">
          <div className="border rounded-lg overflow-hidden">
            <Link href="">
              <Image
                src={banner1.src}
                width={banner1.width}
                height={banner1.height}
                alt="banner 1"
                className="transition-all hover:scale-110"
              />
            </Link>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <Link href="">
              <Image
                src={banner2.src}
                width={banner2.width}
                height={banner2.height}
                alt="banner 2"
                className="transition-all hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </section>
      <FeaturedProduct />
      <section className="w-full sm:pt-20 pt-5 pb-10">
        <Image
          src={advertisingBanner.src}
          width={advertisingBanner.width}
          height={advertisingBanner.height}
          alt="advertisingBanner"
          className="w-full"
        />
      </section>
    </>
  );
};

export default Home;
