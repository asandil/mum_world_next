import React from "react";
import { FaBaby } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";

const PregnancyCalculatorDetailed = () => {
  return (
    <div>
      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          What Is a Due Date?
        </h3>
        <p className="text-gray-600 mb-1">
          A due date is the expected day your little one might make their big
          arrival. Think of it as a countdown marker rather than an exact
          appointment — because babies love surprises! Only a small percentage
          of women actually deliver on the exact due date, while most deliver
          within two weeks before or after.
        </p>
        <p className="text-gray-600">
          Our calculations are for informational purposes only and should not be
          taken as medical advice. Mumworld.in is not liable for any issues,
          consequences, or damages arising from the use of this tool.
        </p>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          There are two main ways doctors and parents estimate this date:
        </h3>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          1. LMP Method (Last Menstrual Period)
        </h3>
        <p className="text-gray-600 mb-1">This is the most common way.</p>
        <p className="text-gray-600 mb-1">
          Your pregnancy clock starts ticking from the first day of your last
          period (LMP).
        </p>
        <p className="text-gray-600 mb-1">
          Add 280 days (40 weeks) to that date, and you get your expected due
          date.
        </p>
        <p className="text-gray-600 mb-4">
          Example: If your last period started on 1st January, your due date
          would be around 8th October.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          2. Conception Date Method
        </h3>
        <p className="text-gray-600 mb-1">
          This works if you know the exact day you conceived.
        </p>
        <p className="text-gray-600 mb-1">
          In this case, your due date is 266 days (38 weeks) after that day.
        </p>
        <p className="text-gray-600 ">
          But since sperm can live for up to 5 days and eggs for about 24 hours,
          it’s not always easy to pinpoint the exact conception date unless
          you’ve tracked ovulation or conceived through IVF.
        </p>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          What Is a Pregnancy Calculator?
        </h3>
        <p className="text-gray-600 mb-1">
          A pregnancy calculator is like a mini-helper that gives you an
          estimated due date and pregnancy week. It helps you plan ahead, count
          down the weeks, and prepare for milestones.
        </p>
        <p className="text-gray-600 mb-1">Here’s how it usually works:</p>
        <p className="text-gray-600 mb-1">
          Enter the first day of your last menstrual period (LMP).
        </p>
        <p className="text-gray-600 mb-1">
          Enter your average cycle length (usually 28 days).
        </p>
        <p className="text-gray-600 mb-1">
          The calculator adds 280 days (40 weeks) to your LMP.
        </p>
        <p className="text-gray-600 mb-4">
          This method follows Dr. Naegele’s Rule — the standard formula most
          doctors use.
        </p>
        <p className="text-gray-600 font-semibold">
          Fun fact: If you give birth exactly on your due date, your baby is
          technically 38 weeks old, even though pregnancy is counted as 40
          weeks.
        </p>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          Expert Insight
        </h3>
        <p className="text-gray-600 mb-2">
          If you know your fertilization date (say through ovulation tracking or
          IVF), you can estimate the due date more precisely. Just add 38 weeks
          (266 days) to that date.
        </p>
        <p className="text-gray-600 font-bold mb-2">But remember:</p>
        <p className="text-gray-600 mb-1">
          Conception doesn’t always happen the same day as intercourse.
        </p>
        <p className="text-gray-600 mb-1">
          That’s why due dates are always considered estimates, not guarantees.
        </p>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          What Is Conception?
        </h3>
        <p className="text-gray-600 mb-1">
          Conception is when sperm meets egg after ovulation.
        </p>
        <p className="text-gray-600 mb-1">
          In a 28-day cycle, ovulation usually happens between day 11 and day
          21.
        </p>
        <p className="text-gray-600">
          Since many women don’t know their exact ovulation day, doctors prefer
          using the LMP method to stay consistent.
        </p>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          What Is EDD (Estimated Due Date)?
        </h3>
        <p className="text-gray-600 mb-1">
          EDD is your doctor’s best guess for when labor might naturally begin.
          It’s usually calculated as:
        </p>
        <p className="text-gray-600">
          EDD = LMP + 280 days (9 months + 7 days)
        </p>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          How Many Weeks Pregnant Am I?
        </h3>
        <p className="text-gray-600 mb-1">
          Pregnancy weeks are counted from the first day of your last period,
          not the day you conceived.
        </p>
        <p className="text-gray-600 mb-1">
          Example: If your cycle is 28 days and you miss your period, you’re
          already considered 4 weeks pregnant.
        </p>
        <p className="text-gray-600">
          If you count from ovulation, you’d be about 2 weeks pregnant at that
          same point.
        </p>
      </div>

      {/* video section */}

      <div class="bg-white rounded-xl shadow-xl p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Pregnancy Due Date Calculator
        </h2>
        <div class="video-container rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/-Z5OtJ-GC6o?si=kmzJKU-fnXyuM-VU"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            className="w-full h-[522px]"
          ></iframe>
          
        </div>
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-calendar-alt text-primary-600"></i>
            Pregnancy Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 ">
                <i className=" text-primary-600">
                  <FaBaby />
                </i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">First Trimester</h4>
                <p className="text-gray-600">Weeks 1-13: Early development</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 ">
                <i className="fas fa-heart text-primary-600">
                  <FaHandHoldingHeart />
                </i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Second Trimester</h4>
                <p className="text-gray-600">Weeks 14-27: Rapid growth</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 ">
                <i className="fas fa-clock text-primary-600">
                  <FaClockRotateLeft />
                </i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Third Trimester</h4>
                <p className="text-gray-600">Weeks 28-40+: Final preparation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-info-circle text-primary-600"></i>
            Key Things to Remember:
          </h3>
          <p className="text-gray-600 mb-4">
            Your due date is an estimate — it’s normal to deliver a little
            earlier or later.
          </p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <i className="fas fa-check-circle text-primary-500 mt-1 mr-2"></i>
              <span>
                LMP method is the most common and practical way to calculate it.
              </span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-primary-500 mt-1 mr-2"></i>
              <span>
                Conception method works if you know the exact day of
                fertilization (or IVF date).
              </span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-primary-500 mt-1 mr-2"></i>
              <span>
                Pregnancy is counted as 40 weeks, though your baby is
                biologically about 38 weeks old at birth.
              </span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-primary-500 mt-1 mr-2"></i>
              <span>
                Regular check-ups and ultrasounds help refine the due date as
                pregnancy progresses.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-info-circle text-primary-600"></i>
            Disclaimer
          </h3>
          <p className="text-gray-600 mb-4">
            While our tool gives you a tentative due date and related details,
            it is not a substitute for medical consultation. Please visit a
            qualified physician to confirm your Estimated Due Date (EDD) based
            on your complete medical history.
          </p>
          <p className="text-gray-600 mb-4">
            Our calculations are for informational purposes only and should not
            be taken as medical advice. Mumworld.in is not liable for any
            issues, consequences, or damages arising from the use of this tool.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PregnancyCalculatorDetailed;
