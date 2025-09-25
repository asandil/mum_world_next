import ContactForm from "@/components/ContactForm";
import FeedbackForm from "@/components/FeedBackForm";
import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const ShareYourFeedback = () => {
  return (
    <div>
          <section className="py-[32px] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px] lg:px-[0px]">
            <h2 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
              <div className="flex relative ">
                <span>Feedback Form</span>{" "}
                <span className="absolute left-[210px] top-1">
                  <BsFillHeartFill color="#F69E87" />
                </span>
              </div>
              <p className="text-[16px] font-[500]">
                We’re here to help and would love your feedback.
              </p>
    
              <hr className="mt-[8px] border-[1px] border-black" />
            </h2>
            <div className="flex justify-center bg-[url('/background-image-contact-us.png')] bg-no-repeat bg-cover px-[30px] py-[20px] rounded-lg  shadow-xl">
              
              {/* contact details */}
              {/* <div className="lg:mt-[40px] md:mt-[50px] sm:mt-[50px] ">
                  <div className="lg:mb-[40px] mb-[20px]">
                    <p className="leading-[1.5] font-[400] flex flex-wrap text-[rgb(94,94,94)] text-start sm:text-start text-[16px]">
                      Please contact us directly with any questions, comments, or
                      inquiries you may have. <br />
                      <br />
                    </p>
                    <p className="leading-[1.5] font-[400] text-[rgb(94,94,94)] text-start sm:text-start text-[16px]">
                      Email id:{" "}
                      <a
                        className="underline text-[rgb(158,108,52)]"
                        href="mailto:mumworld.in@gmail.com"
                      >
                        mumworld.in@gmail.com
                      </a>
                    </p>
                  </div>
                  <div className="lg:mb-[40px]">
                    <a
                      className="mb-[20px] lg:mb-[40px] w-fit px-[16px] py-[8px] bg-[rgb(69,90,100)] flex max-w-[100%] gap-5 lg:max-w-[50%] min-h-[56px] md:mx-0 items-center"
                      href="https://wa.me/918010213009"
                    >
                      <img
                        className="w-[24px] h-[24px]"
                        src="/whatsapp.webp"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <span className="text-[16px] text-white font-[700]">
                        Message us on Whatsapp
                      </span>
                    </a>
                    <h4 className="mb-[24px] leading-[0.5] lg:leading-[1.25] text-[22px] font-[400] text-black text-start md:text-start">
                      mumworld.in
                    </h4>
                    <p className="mb-[12px] lg:mb-[24px] leading-[1.5] font-[400] text-[rgb(94,94,94)] text-[16px] text-start sm:text-start">
                      Omicron II, Greater Noida, Uttar Pradesh, India
                    </p>
                    <p className="mb-[12px] lg:mb-[24px] text-start sm:text-start text-wrap">
                      <a
                        className="w-[100%] block text-[rgb(158,108,52)] text-[16px] leading-[1] lg:leading-[1.5] px-auto text-wrap break-words"
                        href="mailto:8010213009/mumworld.in@gmail.com"
                      >
                        8010213009/mumworld.in@gmail.com
                      </a>
                    </p>
                    <h4 className="mb-[12px] lg:mb-[24px] leading-[1.25] text-[22px] font-[400] text-black text-start sm:text-start">
                      Hours
                    </h4>
                    <p className="text-start sm:text-start">
                      <span className="leading-[0.5] lg:leading-[1.5] font-[400] text-[rgb(94,94,94)] text-[16px]">
                        <strong className="font-[700]">Center Hours:</strong>
                        <br />
                        Monday - Friday: 9am - 5pm
                      </span>
                    </p>
                  </div>
                </div> */}
                <div className="w-full bg-[#fff] px-[30px] py-[20px] rounded-lg shadow-xl opacity-80">
              <FeedbackForm />
            </div>
            </div>
          </section>
        </div>
  )
}

export default ShareYourFeedback