import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { FaHeart, FaShieldAlt, FaLeaf, FaHandsHelping } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { FaBagShopping } from "react-icons/fa6";

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "About Mumworld.in | MumWorld",
  description: "Discover inspiring articles on pregnancy, parenting, baby nutrition, and wellness. Stay informed and supported throughout your motherhood journey on the MumWorld blog.",
  keywords: "pregnancy blog, parenting articles, motherhood blog, baby care tips",
}

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
      year: "2022",
      title: "Founded",
      description: "Mumworld began with a simple mission: support mothers",
    },
    {
      year: "2023",
      title: "1000+ Moms",
      description: "Served over 1000 mothers across India",
    },
    {
      year: "2024",
      title: "Product Launch",
      description: "Launched our exclusive mom-care product line",
    },
    {
      year: "2025",
      title: "Community",
      description: "Built an active community of 5000+ mothers",
    },
    {
      year: "2026",
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
              <div className="flex gap-4 flex-col sm:flex-row ">
                <Link
                  href={WEBSITE_SHOP}
                  className="bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors flex gap-2 justify-center items-center"
                >
                  <FaBagShopping size={28} />
                  <span>Shop Our Products</span>
                </Link>
                <Link
                  href="#our-story"
                  className="border-2 border-primary text-primary px-4 py-3 flex justify-center rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-[280px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1768815502/d1uunlhyjptwpvd5bosg.png"
                  alt="Happy mother with baby"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* <Link
                href={WEBSITE_SHOP}
                className="bg-primary text-white px-2 py-2 sm:px-4 sm:py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors flex gap-2 justify-center items-center absolute bottom-[10%] left-[2%] sm:bottom-[20%] sm:left-[13%]"
              >
                <FaBagShopping size={28} />
                <p className="flex gap-1.5">
                  <span>Shop</span>
                  <span className="sm:block hidden">Our Products</span>
                </p>
              </Link> */}

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
            <div className="relative w-full h-[280px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1768661774/uvtvdlkp4tgtulfunxmn.png"
                alt="Mumworld team"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
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
        </div>
      </section>

      {/* Our Values */}
      <section className="py-8 md:py-12 bg-primary/10">
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

      {/* Timeline */}

      <section className="py-8 md:py-12">
        <div className="mx-auto px-4 lg:px-32">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Journey
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto mb-3"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2 md:mb-0">
              Milestones in our mission to support mothers
            </p>
          </div>

          <div className="relative">
            {/* Desktop: Horizontal Timeline */}
            <div className="hidden md:block">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200"></div>

              <div className="relative grid grid-cols-5 gap-8 pt-10">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative group">
                    {/* Node on Progress Line */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-white border-4 border-primary shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="text-primary font-bold">
                          {milestone.year}
                        </div>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="text-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl inline-block mb-3">
                          <BsStars className="text-primary" size={20} />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {milestone.description}
                        </p>
                      </div>
                      <div className="text-center text-xs text-gray-500">
                        Step {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet: Vertical Timeline */}
            <div className="md:hidden">
              <div className="relative pl-10">
                {/* Vertical Line */}
                <div className="absolute left-5 top-0 bottom-0 w-1 bg-gray-200"></div>

                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      {/* Node */}
                      <div className="absolute -left-10 top-0">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md">
                          {milestone.year}
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-xl">
                            <BsStars className="text-primary" size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">
                              {milestone.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 text-xs text-gray-500">
                          Milestone {index + 1} of {milestones.length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary/10 to-primary/10">
        <div className=" mx-auto px-4 lg:px-32">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="relative w-full h-[280px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1768661774/wm7gphs1potrx3ie6pmx.png"
                alt="Mumworld community"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
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
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  <FaBagShopping size={28} />
                  <span>Shop Now</span>
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
