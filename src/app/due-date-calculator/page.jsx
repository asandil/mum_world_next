import React from "react";

const page = () => {
  return (
    <div>
      <section class="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        <h1
          class="mb-[25px]
        leading-[1.4]
        tracking-[1px]
        text-[22px]
        font-[700]
        uppercase
        text-black"
        >
          Due Date Calculator
          <hr class="mt-[16px] border-[1px] border-black" />
        </h1>
        <div class="flex flex-col md:flex-row gap-3 items-center">
          <label
            class="text-[16px] text-black font-[700] text-center"
            for="lmpDate"
          >
            Select the Date of the Last Menstrual Period:
          </label>
          <div className="flex flex-col sm:flex-row gap-[8px]">
            <input
              class="border-[1px] border-[rgb(226,226,226)] ml-[2px] py-[3px] px-[6px] rounded cursor-pointer"
              type="date"
              id="lmpDate"
            />
            <button
              class="ml-[5px] border py-[3px] px-[16px] bg-gray-500 text-white hover:bg-gray-700 rounded"
              id="calculate"
            >
              Calculate Due Date
            </button>
          </div>
        </div>

        <p class="text-center mt-4 md:text-start" id="result"></p>
      </section>
    </div>
  );
};

export default page;
