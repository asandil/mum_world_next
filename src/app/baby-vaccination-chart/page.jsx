import Vaccination from "../../components/Vaccination";
import React from "react";

const page = () => {
  return (
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
        <Vaccination/>
        <p className="mt-[18px] text-[12px]">
          <strong className="text-[12px]">Note:</strong>The above schedule is as
          advised by UIP and IAP. Please contact your Doctor for exact dates of
          vaccination which may vary in some cases based on the condition of the
          child and/or the date when the last vaccination was done.
        </p>
      </section>
    </div>
  );
};

export default page;
