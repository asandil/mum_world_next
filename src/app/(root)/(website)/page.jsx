import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import SubscribeForm from "@/components/SubscribeForm";
import TestimonialCarousel from "@/components/Testimonial ";
import FeedBackForm from "@/components/FeedBackForm";
import { BsChatHeartFill } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import FeaturedProduct from "@/components/Application/website/FeaturedProduct";

export const metadata = {
  title: "Pregnancy Journey & Newborn Care | Tools, Tips & Support | MumWorld",
  description:
    "Explore expert guidance for every stage of motherhood with pregnancy tools, baby care advice, and health calculators on MumWorld — your companion for creating healthy beginnings.",
  keywords: "pregnancy tips, newborn care, baby development, motherhood",
};

export default function MainHome() {
  return (
    <>
      <div className="">
        <div className="px-[24px]">
          <div className="my-[24px] text-center">
            <img
              className="inline-block md:w-[626px] md:h-[419px] lg:h-[500px] lg:w-[747px]"
              src="https://img1.wsimg.com/isteam/stock/WVqjYgr/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1252,h:838,cg:true"
              alt=""
            />
          </div>
          <div className="mb-[24px]">
            <div className="mb-[24px]">
              <p className="text-center text-[16px] leading-[1.25] font-[400]">
                Everything about pregnancy Journey, Motherhood & baby care: Dos
                and don'ts.
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
        {/* what we do */}
        <section className="py-[32px] lg:px-32 px-4 ">
          <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
            What we do
            <hr className="mt-[16px] border-[1px] border-black" />
          </h1>
          <div className="">
            <div className="pb-[48px] flex flex-col gap-[12px]">
              <p>
                Trusted Pregnancy, Postpartum & Parenting Platform for Mothers
                in India
              </p>
              <p>
                At mumworld.in, we provide relevant, personalized, and
                empowering support for women through every stage of motherhood —
                from pregnancy to postpartum recovery and newborn care.
              </p>
              <p>
                Founded in 2021, Mumworld has been a reliable source of
                pregnancy health information, postpartum wellness guidance,
                parenting tips, and women’s mental health support. Today, we go
                beyond articles to offer digital pregnancy and baby care guides
                designed to help mothers feel informed, confident, and supported
                at every step.
              </p>
              <p>
                We also combine comfort and style with our thoughtfully designed
                maternity wear and feeding-friendly clothing for new mothers.
                Our clothing is made to support changing bodies while helping
                moms feel comfortable, confident, and beautiful during pregnancy
                and after delivery.
              </p>
              <p className="flex flex-col">
                <span> Everything we do is guided by one simple mission:</span>
                <span>
                  “Healthy pregnancies, happy mothers, and healthy babies.”
                </span>{" "}
              </p>
            </div>
            <h4 className="mb-[16px] leading-[1.25] text-[22px] font-[400] text-[rgb(27,27,27)]">
              Pregnancy Health
            </h4>
            <div className="pb-[48px] flex flex-col gap-[12px]">
              <p>Complete Pregnancy Care, Tips & Tools for Expecting Mothers</p>
              <p>
                Pregnancy should be a positive and stress-free experience. At
                Mumworld, we simplify pregnancy by offering clear, expert-backed
                pregnancy health information that helps women make confident
                decisions throughout all three trimesters
              </p>
              <p>
                Pregnant women are often overwhelmed with confusing dos and
                don’ts — we help cut through the noise with:
              </p>
              <p>Easy-to-follow pregnancy care tips</p>
              <p>Trimester-wise health and wellness guidance</p>
              <p>Practical digital tools for pregnancy planning and tracking</p>
              <p>
                Supportive content focused on both physical and emotional
                well-being
              </p>
              <p>
                Our goal is to help every expecting mother enjoy a healthier,
                happier pregnancy journey.
              </p>
            </div>
            <h4 className="mb-[16px] leading-[1.25] text-[22px] font-[400] text-[rgb(27,27,27)]">
              Postpartum and Newborn Care
            </h4>
            <div className="pb-[48px] flex flex-col gap-[12px]">
              <p>Postpartum Recovery & Newborn Care Support for New Moms</p>
              <p>
                Our support doesn’t end with delivery. Mumworld provides trusted
                postpartum care and newborn care resources to help mothers
                navigate life after birth with confidence.
              </p>
              <p>We offer digital guides and practical resources covering:</p>
              <p>Postpartum recovery and healing after childbirth</p>
              <p>
                Emotional wellness and mental health support for new mothers
              </p>
              <p>Newborn care essentials, routines, and early milestones</p>
              <p>
                Guidance to help moms feel supported during the early days of
                motherhood
              </p>
              <p>
                From recovery after birth to caring for your newborn, Mumworld
                is here to support both mother and baby — every step of the way.
              </p>
            </div>
          </div>
        </section>
        {/* Subscribe */}
        <section className="bg-[url(https://img1.wsimg.com/isteam/stock/NeWWRNm/:/rs=w:1534,m)] bg-no-repeat bg-cover">
          <div className="py-[32px] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px] lg:px-[0px]">
            <h2 className="mb-[32px] text-[32px] text-[rgb(255,255,255)] leading-[1.2] font-[Cabin] tracking-[1px] text-center font-[700]">
              SUBSCRIBE
            </h2>
            <div className="max-w-[100%] md:max-w-[83.33%] lg:max-w-[66.66%] mx-auto">
              <p className="mb-[16px] font-[400] text-[rgb(255,255,255)] text-center leading-[1.5] text-[16px]">
                Sign up to hear more from us.
              </p>
              <SubscribeForm />
            </div>
          </div>
        </section>
        {/* Our team */}
        <section className="py-[32px]">
          <div className="mb-[24px] text-center md:max-w-[50%] lg:max-w-[33.33%] mx-auto">
            <h4 className="mb-[12px] mt-[12px] text-center leading-[1.25] text-[22px] font-[400] text-[rgb(27,27,27)]">
              Meet Sriti
            </h4>
            <p className="text-center">
              I am a proud mama on a mission to sprinkle a little bit of magic
              into your daily routine through my humble corner of the internet,
              mumworld.in. Ever since I embarked on this journey of motherhood,
              I've been passionate about sharing my experiences, insights, and
              tips to make life a little bit sweeter for fellow moms like you.
              Here at mumworld.in, we're all about celebrating the chaos and
              beauty of motherhood. From diaper disasters to heartwarming
              milestones, I pour my heart into every post, hoping to inspire,
              uplift, and connect with each and every one of you. Whether it's
              sharing family-friendly recipes that even the pickiest eaters will
              love, offering practical parenting hacks to navigate the twists
              and turns of raising tiny humans, or simply creating a safe space
              where we can laugh, cry, and cheer each other on, I'm here to be
              your virtual cheerleader and confidante.
            </p>
            <a
              className="inline-block"
              href="https://www.linkedin.com/in/sriti-jha-93423b57/"
              target="_blank"
            >
              <img
                className="m-auto mt-4"
                src="/linkedin.png"
                alt="linkedin-profile"
                width="48"
                height="48"
              />
            </a>
          </div>
        </section>

        {/* Featured Product Section */}
        <FeaturedProduct />

        {/* Testimonial section */}
        <section>
          <TestimonialCarousel />
        </section>
      </div>
    </>
  );
}
