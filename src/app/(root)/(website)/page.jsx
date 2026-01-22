import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import SubscribeForm from "@/components/SubscribeForm";
import TestimonialCarousel from "@/components/Testimonial ";
import FeedBackForm from "@/components/FeedBackForm";
import { BsChatHeartFill, BsFillHeartFill } from "react-icons/bs";
import FeaturedProduct from "@/components/Application/website/FeaturedProduct";
import mainImage from "@/assets/images/ShopHeaderImage.png";
import { FaHandsHelping, FaHeart, FaLeaf } from "react-icons/fa";

export const metadata = {
  title: "Pregnancy Journey & Newborn Care | Tools, Tips & Support | MumWorld",
  description:
    "Explore expert guidance for every stage of motherhood with pregnancy tools, baby care advice, and health calculators on MumWorld — your companion for creating healthy beginnings.",
  keywords: "pregnancy tips, newborn care, baby development, motherhood",
};

export default function MainHome() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 bg-gradient-to-r from-primary/10 to-primary/30">
        <div className="mx-auto px-4 lg:px-32">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-[44px] font-bold text-gray-900 mb-4 md:mb-6">
                Pregnancy Journey &{" "}
                <span className="text-primary">Newborn Care</span>
              </h1>
              <p className="text-lg text-gray-600 mb-4 md:mb-8">
                Explore expert guidance for every stage of motherhood with
                pregnancy tools, baby care advice, and health calculators on
                MumWorld — your companion for creating healthy beginnings.
              </p>
              <div className="flex sm:flex-row flex-col gap-2 sm:gap-4 sm:justify-start justify-center text-center">
                <a
                  href="#what-we-do"
                  className="bg-primary text-white px-3 sm:px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                >
                  Explore Our Mission
                </a>
                <a
                  href="#subscribe"
                  className="border-2 border-primary text-primary px-6 py-3 sm:py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Join Our Community
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://img1.wsimg.com/isteam/stock/WVqjYgr/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1252,h:838,cg:true"
                  alt="Mumworld team"
                  fill
                  className="object-fit"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 right-2 lg:-right-4 bg-white p-3 md:p-4 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <BsFillHeartFill className="text-primary" size={20} />
                  <h3 className="font-bold text-md md:text-lg">
                    Trusted by Mothers
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Your journey, our support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-8 md:py-12">
        <div className="mx-auto px-4 lg:px-32">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Trusted Pregnancy, Postpartum & Parenting Platform for Mothers in
              India
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 mb-8">
            <p className="text-gray-700 mb-6 text-lg">
              At mumworld.in, we provide relevant, personalized, and empowering
              support for women through every stage of motherhood — from
              pregnancy to postpartum recovery and newborn care.
            </p>
            <p className="text-gray-700 mb-6">
              Founded in 2021, Mumworld has been a reliable source of pregnancy
              health information, postpartum wellness guidance, parenting tips,
              and women's mental health support. Today, we go beyond articles to
              offer digital pregnancy and baby care guides designed to help
              mothers feel informed, confident, and supported at every step.
            </p>
            <p className="text-gray-700 mb-6">
              We also combine comfort and style with our thoughtfully designed
              maternity wear and feeding-friendly clothing for new mothers. Our
              clothing is made to support changing bodies while helping moms
              feel comfortable, confident, and beautiful during pregnancy and
              after delivery.
            </p>
            <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary mt-6">
              <p className="text-gray-800 italic font-medium text-lg">
                "Healthy pregnancies, happy mothers, and healthy babies."
              </p>
              <p className="font-semibold mt-2 text-primary">
                — Our Guiding Mission
              </p>
            </div>
          </div>

          {/* Pregnancy Health */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <FaHeart className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Pregnancy Health
                </h3>
              </div>
              <p className="text-lg text-gray-700 mb-4 font-semibold">
                Complete Pregnancy Care, Tips & Tools for Expecting Mothers
              </p>
              <p className="text-gray-600 mb-6">
                Pregnancy should be a positive and stress-free experience. At
                Mumworld, we simplify pregnancy by offering clear, expert-backed
                pregnancy health information that helps women make confident
                decisions throughout all three trimesters.
              </p>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Pregnant women are often overwhelmed with confusing dos and
                  don'ts — we help cut through the noise with:
                </p>
                <ul className="space-y-3">
                  {[
                    "Easy-to-follow pregnancy care tips",
                    "Trimester-wise health and wellness guidance",
                    "Practical digital tools for pregnancy planning and tracking",
                    "Supportive content focused on both physical and emotional well-being",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 font-medium">
                  Our goal is to help every expecting mother enjoy a healthier,
                  happier pregnancy journey.
                </p>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center z-20 p-6">
                  <BsChatHeartFill size={48} className="mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Mother-First Approach
                  </h3>
                  <p>Every step designed with mothers in mind</p>
                </div>
                <Image
                  src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1768660724/jqzudsvhwxgov904unca.jpg"
                  alt="Mumworld team"
                  fill
                  className="object-fit"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Postpartum and Newborn Care */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <FaHandsHelping className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Postpartum and Newborn Care
                </h3>
              </div>
              <p className="text-lg text-gray-700 mb-4 font-semibold">
                Postpartum Recovery & Newborn Care Support for New Moms
              </p>
              <p className="text-gray-600 mb-6">
                Our support doesn't end with delivery. Mumworld provides trusted
                postpartum care and newborn care resources to help mothers
                navigate life after birth with confidence.
              </p>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We offer digital guides and practical resources covering:
                </p>
                <ul className="space-y-3">
                  {[
                    "Postpartum recovery and healing after childbirth",
                    "Emotional wellness and mental health support for new mothers",
                    "Newborn care essentials, routines, and early milestones",
                    "Guidance to help moms feel supported during the early days of motherhood",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 font-medium">
                  From recovery after birth to caring for your newborn, Mumworld
                  is here to support both mother and baby — every step of the
                  way.
                </p>
              </div>
            </div>
            <div className="lg:order-1 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center z-20 p-6">
                  <FaLeaf size={48} className="mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Natural Support</h3>
                  <p>Gentle care for mother and baby</p>
                </div>
                <Image
                  src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1768660723/lvdhhbf9ujq1zd0zga44.jpg"
                  alt="Mumworld team"
                  fill
                  className="object-fit"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section
        id="subscribe"
        className="py-8 md:py-12 bg-gradient-to-r from-primary/10 to-primary/20"
      >
        <div className="mx-auto px-4 lg:px-32">
          <div className="bg-[url(https://res.cloudinary.com/dc0wr8hev/image/upload/v1768660948/mygwj3pdpar1chkoarxl.webp)] bg-no-repeat bg-cover rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                SUBSCRIBE
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-white text-lg">
                Sign up to hear more from us.
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <SubscribeForm />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team / Founder Section */}
      <section className="py-8 md:py-12">
        <div className="mx-auto px-4 lg:px-32">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Sriti - Founder of Mumworld
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <div className="space-y-6">
              <p className="text-gray-700">
                Hi, I'm Sriti, a proud mama and the founder of MumWorld.in — a
                trusted space created with love, experience, and a deep
                understanding of motherhood.
              </p>
              <p className="text-gray-700">
                My journey into motherhood changed everything. Like many moms, I
                found myself searching for honest information, emotional
                reassurance, and practical guidance during pregnancy, postpartum
                recovery, and early parenting. That search inspired me to create
                Mumworld — a supportive, reliable, and judgment-free platform
                for mothers.
              </p>
              <p className="text-gray-700">
                At Mumworld, I share real-life experiences, expert-backed
                insights, and thoughtful guidance to make everyday motherhood
                feel less overwhelming and more joyful. We celebrate both the
                chaos and beauty of motherhood — from diaper disasters to
                heartwarming milestones — because that's what real motherhood
                looks like.
              </p>
              <p className="text-gray-700">
                More than just a website, Mumworld is a community built on
                empathy, honesty, and connection. I pour my heart into every
                post, hoping to inspire, uplift, and remind moms that they are
                never alone on this journey.
              </p>
              <p className="text-gray-700">
                I'm here as your virtual cheerleader, confidante, and fellow
                mom, walking alongside you through pregnancy, postpartum, and
                the many stages of raising little humans.
              </p>
              <div className="bg-primary/10 p-6 rounded-lg mt-6 border-l-4 border-primary">
                <p className="text-gray-800 italic text-lg">
                  "Because motherhood doesn't need perfection — it needs
                  support."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="mx-auto px-4">
          <FeaturedProduct />
        </div>
      </section>

      {/* Testimonial section */}
      <section className="py-8 md:py-12">
        <div className="mx-auto px-4">
          <TestimonialCarousel />
        </div>
      </section>
    </div>
  );
}
