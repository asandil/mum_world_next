import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WEBSITE_HOME, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import {
  FaHeart,
  FaShieldAlt,
  FaShippingFast,
  FaLeaf,
  FaHandsHelping,
} from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import aboutHero from "@/assets/images/test.png";
// import aboutHero from "@/assets/images/slider-1.png";
import aboutTeam from "@/assets/images/slider-6.png";
import aboutQuality from "@/assets/images/slider-1.png";
import aboutCommunity from "@/assets/images/banner1.png";
import MainSlider from "@/components/Application/website/MainSlider";

const AboutSection = () => {
  const values = [
    {
      icon: <FaHeart className="text-primary" size={40} />,
      title: "Mother-First Approach",
      description:
        "Every product is designed with mothers' comfort, health, and happiness as our top priority.",
    },
    {
      icon: <FaShieldAlt className="text-primary" size={40} />,
      title: "Safety & Quality",
      description:
        "Rigorous testing ensures all products meet the highest safety standards for mothers and babies.",
    },
    {
      icon: <FaLeaf className="text-primary" size={40} />,
      title: "Natural & Organic",
      description:
        "We prioritize natural, organic ingredients that are gentle on sensitive skin.",
    },
    {
      icon: <FaHandsHelping className="text-primary" size={40} />,
      title: "Community Support",
      description:
        "Building a supportive community where mothers can share, learn, and grow together.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description: "Mumworld began with a simple mission: support mothers",
    },
    {
      year: "2021",
      title: "1000+ Moms",
      description: "Served over 1000 mothers across India",
    },
    {
      year: "2022",
      title: "Product Launch",
      description: "Launched our exclusive mom-care product line",
    },
    {
      year: "2023",
      title: "Community",
      description: "Built an active community of 5000+ mothers",
    },
    {
      year: "2024",
      title: "National Reach",
      description: "Expanded delivery to 50+ cities across India",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 bg-gradient-to-r from-primary/10 to-primary/40">
        <div className=" mx-auto px-4 lg:px-32">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Empowering Mothers,{" "}
                <span className="text-primary">One Product at a Time</span>
              </h1>
              <p className="text-lg text-gray-600 mb-4 md:mb-8">
                At Mumworld, we believe that motherhood is a beautiful journey
                that deserves the best care, support, and products. We're
                dedicated to providing mothers with high-quality, safe, and
                nurturing products that make every stage of motherhood more
                comfortable and joyful.
              </p>
              <div className="flex gap-4">
                <Link
                  href={WEBSITE_SHOP}
                  className="bg-primary text-white px-4 sm:px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                >
                  Shop Our Products
                </Link>
                <Link
                  href="#our-story"
                  className="border-2 border-primary text-primary px-4 sm:px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={aboutHero}
                  alt="Happy mother with baby"
                  fill
                  className="object-fit"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* <MainSlider/> */}
              </div>
              <div className="absolute -bottom-6 right-2 lg:-right-6 bg-white p-3 md:p-6 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <GiFamilyHouse className="text-primary" size={24} />
                  <h3 className="font-bold text-lg">5000+ Happy Families</h3>
                </div>
                <p className="text-gray-600">Trusted by mothers across India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-8 md:py-12">
        <div className=" mx-auto px-4 lg:px-32">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Mumworld was born from a simple realization: mothers deserve
              better. Better products, better support, and a better shopping
              experience tailored to their unique needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center mb-8 md:mb-12">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1768661774/uvtvdlkp4tgtulfunxmn.png"
                alt="Mumworld team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 md:mb-6">
                From Mother to Mother
              </h3>
              <p className="text-gray-600 mb-2 md:mb-4">
                Our journey began when our founder, a new mother herself,
                struggled to find products that were both effective and safe for
                her newborn. Frustrated by the lack of options and confusing
                information, she decided to create a space where mothers could
                find exactly what they need.
              </p>
              <p className="text-gray-600 mb-3 md:mb-6">
                Today, Mumworld is more than just a store - it's a community, a
                resource, and a trusted partner for mothers at every stage of
                their journey. Every product in our collection is carefully
                selected or developed with input from real mothers, healthcare
                professionals, and child development experts.
              </p>
              <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
                <p className="text-gray-700 italic">
                  "We don't just sell products - we provide solutions that make
                  motherhood a little easier and a lot more joyful."
                </p>
                <p className="font-semibold mt-2">- Mumworld Founder</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-0 md:mb-12">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-5 md:mb-10">
              Our Journey
            </h3>
            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
              <div className="space-y-0">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex flex-col lg:flex-row items-center ${
                      index % 2 === 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`lg:w-1/2 ${
                        index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                      }`}
                    >
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <BsStars className="text-primary" size={28} />
                          <span className="font-bold text-lg">
                            {milestone.year}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="my-4 lg:my-0 lg:w-8 flex justify-center">
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                    <div
                      className={`lg:w-1/2 ${
                        index % 2 === 0 ? "lg:pl-12" : "lg:pr-12"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className=" mx-auto px-4 lg:px-32">
          <div className="text-center mb-5 md:mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at Mumworld, from product
              selection to customer service and community building.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-8 md:py-12">
        <div className=" mx-auto px-4 lg:px-32">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-6">
                Our Quality Promise
              </h2>
              <p className="text-gray-600 mb-3 md:mb-6">
                We understand that when it comes to mothers and babies, there's
                no room for compromise. That's why every product at Mumworld
                goes through a rigorous 5-step quality check:
              </p>
              <ul className=" space-y-2 md:space-y-4">
                {[
                  "Material Safety Testing",
                  "Ingredient Transparency",
                  "Performance Evaluation",
                  "Mother Feedback Integration",
                  "Continuous Improvement",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className=" mt-4 md:mt-8 p-6 bg-primary/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <FaShippingFast className="text-primary" size={24} />
                  <h3 className="font-bold text-lg">
                    Free Shipping & Easy Returns
                  </h3>
                </div>
                <p className="text-gray-600">
                  Enjoy free shipping on all orders above ₹599 and 10-day easy
                  returns on all products.
                </p>
              </div>
            </div>
            <div className="bg-[url(https://res.cloudinary.com/dc0wr8hev/image/upload/v1768661774/vodzu2lloittcqvyhwh9.png)] bg-no-repeat bg-cover relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"></div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary/10 to-primary/10">
        <div className=" mx-auto px-4 lg:px-32">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1768661774/wm7gphs1potrx3ie6pmx.png"
                alt="Mumworld community"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-6">
                Join Our Community
              </h2>
              <p className="text-gray-600 mb-3 md:mb-6">
                Mumworld is more than products - it's a thriving community of
                mothers supporting each other through every challenge and
                celebration.
              </p>
              <div className=" space-y-3 md:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <FaHandsHelping className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-0 md:mb-2">
                      Weekly Support Groups
                    </h4>
                    <p className="text-gray-600">
                      Connect with other mothers in our virtual meetups
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <FaHeart className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-0 md:mb-2">
                      Expert Advice
                    </h4>
                    <p className="text-gray-600">
                      Access to pediatricians, nutritionists, and parenting
                      coaches
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <BsStars className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-0 md:mb-2">
                      Member-Only Benefits
                    </h4>
                    <p className="text-gray-600">
                      Exclusive discounts, early access, and personalized
                      recommendations
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-8 flex gap-4">
                <Link
                  href={WEBSITE_SHOP}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
