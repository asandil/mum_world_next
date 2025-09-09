import React from "react";
import { FaBaby } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";

const WeightGainCalculatorDetailed = () => {
  return (
    <div>
      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          Why Tracking Pregnancy Weight Gain Matters
        </h3>
        <p className="text-gray-600 mb-1">
          Too little weight gain: May affect baby’s growth, increase chances of
          preterm delivery.
        </p>
        <p className="text-gray-600">
          Too much weight gain: Increases risks of labor difficulties, high
          blood pressure, gestational diabetes, and surgical delivery.
        </p>
        <p className="text-gray-600">
          By entering your pre-pregnancy weight and height, you can calculate
          your BMI and check the safe range of weight gain for your body type.
        </p>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          How Much Weight Should You Gain in Pregnancy?
        </h3>
        <p className="text-gray-600 mb-1">
          The recommended weight gain depends on:
        </p>
        <p className="text-gray-600 mb-1">
          Your pre-pregnancy Body Mass Index (BMI).
        </p>
        <p className="text-gray-600 mb-1">
          Whether you’re carrying one baby or multiples (twins/triplets).
        </p>
        <p className="text-gray-600 mb-3">Your overall health and lifestyle.</p>
        {/* <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]"> */}
        <p className="text-gray-600 text-lg font-semibold mb-1">
          Recommended Weight Gain for Singleton Pregnancy
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="table-auto border border-gray-300 w-full text-left text-gray-600">
            <thead>
              <tr className="bg-[#FDE9E6]">
                <th className="border border-gray-300 px-4 py-2">
                  Pre-pregnancy BMI
                </th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">
                  Recommended Weight Gain
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">&lt;18.5</td>
                <td className="border border-gray-300 px-4 py-2">
                  Underweight
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  28–40 lb (13–18 kg)
                </td>
              </tr>
              <tr className="bg-[#FDE9E6]">
                <td className="border border-gray-300 px-4 py-2">18.5–24.9</td>
                <td className="border border-gray-300 px-4 py-2">
                  Normal weight
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  24–35 lb (11–16 kg)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">25–29.9</td>
                <td className="border border-gray-300 px-4 py-2">Overweight</td>
                <td className="border border-gray-300 px-4 py-2">
                  15–25 lb (7–11 kg)
                </td>
              </tr>
              <tr className="bg-[#FDE9E6]">
                <td className="border border-gray-300 px-4 py-2">≥30</td>
                <td className="border border-gray-300 px-4 py-2">Obese</td>
                <td className="border border-gray-300 px-4 py-2">
                  11–20 lb (5–9 kg)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-600 text-lg font-semibold mb-2">
          Recommended Weight Gain for Twin Pregnancy
        </p>

        <p className="text-gray-600 mb-2">
          If you are carrying twins, the weight gain recommendation is higher:
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="table-auto border border-gray-300 w-full text-left text-gray-600">
            <thead>
              <tr className="bg-[#FDE9E6]">
                <th className="border border-gray-300 px-4 py-2">
                  Pre-pregnancy BMI
                </th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">
                  Recommended Weight Gain
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">18.5-24.9</td>
                <td className="border border-gray-300 px-4 py-2">Normal</td>
                <td className="border border-gray-300 px-4 py-2">
                  28-40lb (13-18kg)
                </td>
              </tr>
              <tr className="bg-[#FDE9E6]">
                <td className="border border-gray-300 px-4 py-2">
                  18.5 – 24.9
                </td>
                <td className="border border-gray-300 px-4 py-2">Normal</td>
                <td className="border border-gray-300 px-4 py-2">
                  37-54lb (17-25kg)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">25-29.9</td>
                <td className="border border-gray-300 px-4 py-2">Overweight</td>
                <td className="border border-gray-300 px-4 py-2">
                  31-50lb (14-23kg)
                </td>
              </tr>
              <tr className="bg-[#FDE9E6]">
                <td className="border border-gray-300 px-4 py-2">≥30</td>
                <td className="border border-gray-300 px-4 py-2">Obese</td>
                <td className="border border-gray-300 px-4 py-2">
                  25-42lb (11-19kg)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-600 font-semibold">
          For triplets or more, there are no fixed guidelines, so it’s best to
          follow your doctor’s personalized advice.
        </p>
        {/* </div> */}
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          When Does Pregnancy Weight Gain Start?
        </h3>
        <p className="text-gray-600 mb-0">First Trimester (Weeks 1–12)</p>
        <p className="text-gray-600 mb-4">
          Minimal weight gain (around 1–2 kg). Some women may even lose weight
          due to morning sickness.
        </p>

        <p className="text-gray-600 mb-0">Second Trimester (Weeks 13–26)</p>
        <p className="text-gray-600 mb-4">
          Enter your average cycle length (usually 28 days).
        </p>
        <p className="text-gray-600 mb-0">Third Trimester (Weeks 27–Birth)</p>
        <p className="text-gray-600">
          Continued steady gain, averaging 5 kg. By the end of pregnancy, most
          women gain 10–15 kg in total (depending on BMI and health).
        </p>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          Key Takeaways
        </h3>
        <p className="text-gray-600 mb-1">
          Healthy pregnancy weight gain depends on pre-pregnancy BMI and whether
          you’re carrying one or more babies.
        </p>
        <p className="text-gray-600 mb-1">
          Gaining too little or too much can affect both mother and baby’s
          health.
        </p>
        <p className="text-gray-600 mb-1">
          Tracking your weekly gain helps ensure you stay in the recommended
          safe range.
        </p>
        <p className="text-gray-600">
          Always consult your OB/GYN for personalized advice.
        </p>
      </div>

      {/* video section */}

      <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Pregnancy Weight Gain Calculator
        </h2>
        <div className="video-container rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/CePJMNvZTNM?si=BzwM1tG1wwjcLBVP"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-[522px]"
          ></iframe>
        </div>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          Disclaimer
        </h3>

        <p className="text-gray-600 mb-1">
          The Pregnancy Weight Gain Calculator at Mumworld.in provides only an
          estimate. Every pregnancy is unique. Please consult your healthcare
          provider before making any changes to your diet, lifestyle, or weight
          management. Mumworld.in is not responsible for any issues,
          consequences, or damages arising from the use of this tool.
        </p>
      </div>
    </div>
  );
};

export default WeightGainCalculatorDetailed;
