import Image from "next/image";
import Vaccination from "../../components/Vaccination";
import React from "react";
import PregnancyCalculator from "@/components/PregnancyCalculator";
import PregnancyCalculatorDetailed from "@/components/PregnancyCalculatorDetailed";
import ImmunizationScheduleAndChart from "@/components/ImmunizationScheduleAndChart";

const page = () => {
  return (
    <>
      <div>
        <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
          <h1
            className="mb-[25px]
            leading-[1.4]
            tracking-[1px]
            text-[22px]
            font-[700]
            uppercase
            text-black"
          >
            Baby Vaccination Chart
            <hr className="mt-[16px] border-[1px] border-black" />
          </h1>
          <Vaccination />
        </section>
      </div>

      <div>
        <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
          <h1 className="leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
            Baby Vaccination Immunization Schedule and Chart
          </h1>
          <p className="text-gray-600 mx-auto">Last Updated on Sep 12, 2025</p>

          <hr className="my-[8px] border-[1px] border-black" />

          {/* Figure Section */}
          <div className="mb-[24px] rounded-2xl w-full h-[500px] relative">
            <Image
              src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1757408683/Immunization_Scheduler_and_Chart_rgj625.jpg"
              alt="The Poetry of Modern Pregnancy, Newborn Motherhood and parenting"
              fill
              className="object-cover rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1160px"
            />
          </div>

          <div>
            <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary-600"></i>
                Give Your Child a Healthy Start in Life
              </h3>
              <p className="text-gray-600">
                Every giggle, every step, every milestone matters. But behind
                every strong childhood is a shield of protection—vaccines. From
                polio to measles, timely immunization helps your child grow
                without unnecessary health setbacks.
              </p>
            </div>

            <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary-600"></i>
                Why Vaccination Matters
              </h3>

              <p className="text-gray-600 mb-1">
                Safeguards your child against serious diseases
              </p>
              <p className="text-gray-600 mb-1">
                Builds strong immunity for years ahead
              </p>
              <p className="text-gray-600">
                Helps your child thrive, learn, and play without worry
              </p>
            </div>

            <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary-600"></i>
                Mumworld has come up with a Smart Immunization Scheduler
              </h3>
              <p className="text-gray-600 mb-1">
                Just enter your child’s date of birth, and instantly get:
              </p>
              <p className="text-gray-600 mb-1">
                A personalized vaccine timeline (birth to 12 years)
              </p>
              <p className="text-gray-600 mb-1">
                A downloadable printable chart you can carry to the doctor
              </p>
              <p className="text-gray-600">
                Easy reminders so you never miss a shot
              </p>
            </div>

            <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-info-circle text-primary-600"></i>
                Parenting Made Easier
              </h3>
              <p className="text-gray-600 mb-1">
                No more confusion. No missed vaccines. No last-minute rush.
              </p>
              <p className="text-gray-600 mb-4">
                Just peace of mind knowing your child’s protection is always on
                track.
              </p>
              <p className="text-gray-600">
                Try the Mumworld Immunization Scheduler today – free, simple,
                and parent-friendly.
              </p>
            </div>
          </div>

          <PregnancyCalculator />
          <ImmunizationScheduleAndChart />
        </section>
      </div>
    </>
  );
};

export default page;
