import PregnancyCalculator from "@/components/PregnancyCalculator";
import PregnancyCalculatorDetailed from "@/components/PregnancyCalculatorDetailed";
import PregnancyWeightGainCalculator from "@/components/WeightCalculator";
import WeightCalculator from "@/components/WeightCalculator";
import WeightGainCalculatorDetailed from "@/components/WeightGainCalculatorDetailed";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        <h1 className="leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
          Pregnancy Weight Gain Calculator
        </h1>
        <p className="text-gray-600 mx-auto">Updated on Sep 12, 2025</p>

        <hr className="my-[8px] border-[1px] border-black" />

        {/* Figure Section */}
        <div className="mb-[24px] rounded-2xl w-full h-[500px] relative">
          <Image
            src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1757407064/Pregnancy_Weight_Gain_Calculator_sowovx.webp"
            alt="The Poetry of Modern Pregnancy, Newborn Motherhood and parenting"
            fill
            className="object-cover rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1160px"
          />
        </div>

        <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-info-circle text-primary-600"></i>
            Pregnancy Weight Gain Calculator: How Much Should You Gain During
            Pregnancy?
          </h3>
          <p className="text-gray-600 mb-1">
            “Am I gaining enough weight?” or “Am I putting on too much?” — these
            are common worries during pregnancy. Your doctor may even advise you
            to adjust your weight for a healthier pregnancy. Maintaining the
            right weight gain during pregnancy is important to avoid
            complications for both you and your baby. Gaining too little can
            increase the risk of preterm birth or low birth weight, while
            gaining too much can lead to labor complications, C-sections, or
            gestational issues.
          </p>
          <p className="text-gray-600">
            That’s why keeping track with a Pregnancy Weight Gain Calculator can help you stay within safe and recommended ranges.
          </p>
        </div>

        <PregnancyWeightGainCalculator />
        <WeightGainCalculatorDetailed />
      </section>
    </div>
  );
};

export default page;
