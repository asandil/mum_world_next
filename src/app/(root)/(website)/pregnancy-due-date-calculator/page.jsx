import PregnancyCalculator from "@/components/PregnancyCalculator";
import PregnancyCalculatorDetailed from "@/components/PregnancyCalculatorDetailed";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Pregnancy Due Date Calculator | Track Your Baby’s Arrival",
  description: "Use our free pregnancy due date calculator to estimate your baby’s arrival, monitor growth milestones, and plan your pregnancy journey with ease.",
  keywords: "pregnancy blog, parenting articles, motherhood blog, baby care tips",
}

const page = () => {
  return (
    <div>
      <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        <h1 className="leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
          Pregnancy Due Date Calculator
        </h1>
        <p className="text-gray-600 mx-auto">
          Calculate your estimated due date and track your pregnancy progress
          with our easy-to-use calculator
        </p>

        <hr className="my-[8px] border-[1px] border-black" />
        <div>
          <p>Last Updated on Sep 12, 2025</p>
        </div>

        {/* Figure Section */}
        <div className="mb-[24px] rounded-2xl w-full h-[500px] relative">
          <Image
            src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1757403137/Pregnancy_due_date_calculator_df7szw.jpg"
            alt="The Poetry of Modern Pregnancy, Newborn Motherhood and parenting"
            fill
            className="object-cover rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1160px"
          />
        </div>

        <PregnancyCalculator />
        <PregnancyCalculatorDetailed />



      </section>
    </div>
  );
};

export default page;
