import faqdata from "@/assets/FaqData";
import FAQAccordion from "@/components/Faq";
import React from "react";


export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "Pregnancy & Newborn FAQs | MumWorld Answers",
  description: "Explore answers to top pregnancy and newborn care questions. Find clear guidance on health, nutrition, and parenting from MumWorld experts.",
  keywords: "pregnancy blog, parenting articles, motherhood blog, baby care tips",
}

const page = () => {
  return (
    <div>
      <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        <div className="">
          <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase">
            FREQUENTLY ASKED QUESTIONS
            <hr className="mt-[16px] mb-[20px] border-[1px] border-black" />
          </h1>
          <p className="text-[16px] text-left font-[400] mb-[40px]">
            Please reach us at{" "}
            <a
              className="text-[#F69E87] underline"
              href="mailto:mumworld.in@gmail.com"
            >
              mumworld.in@gmail.com
            </a>{" "}
            if you cannot find an answer to your question.
          </p>
        </div>
        {/* questions and answers */}
        <div className="mt-10">
          {faqdata.map((item, idx) => (
            <FAQAccordion
              key={idx}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
