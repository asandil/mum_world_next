import ContactForm from "@/components/ContactForm";
import FeedbackForm from "@/components/FeedBackForm";
import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

export const metadata = {
  title: "Contact MumWorld | Pregnancy & Newborn Support Team",
  description: "Have questions about pregnancy or newborn care? Contact MumWorld’s expert support team for fast assistance and personalized guidance.",
  keywords: "pregnancy blog, parenting articles, motherhood blog, baby care tips",
}

const ContactUs = () => {
  return (
    <div>
      <section className="py-[32px] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px] lg:px-[0px]">
        <h2 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
          <div className="flex relative ">
            <span>Contact Us</span>{" "}
            <span className="absolute left-[160px] top-1">
              <BsFillHeartFill color="#F69E87" />
            </span>
          </div>
          <p className="text-[16px] font-[500]">
            We’re here to help and would love your feedback.
          </p>

          <hr className="mt-[8px] border-[1px] border-black" />
        </h2>
        <div className="flex justify-center bg-[url('/background-image-contact-us.png')] bg-no-repeat bg-cover px-[30px] py-[20px] rounded-lg  shadow-xl">
          {/* Send message */}
          <div className="w-full bg-[#fff] px-[30px] py-[20px] rounded-lg shadow-xl opacity-80">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
