import React from "react";
import { FaBaby, FaClockRotateLeft, FaHandHoldingHeart } from "react-icons/fa6";

const ImmunizationScheduleAndChart = () => {
  return (
    <div>
      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          Are Vaccines Safe For Your Baby?
        </h3>
        <p className="text-gray-600 mb-1">
          As parents, it’s natural to wonder whether vaccines are safe and
          necessary. The truth is: some vaccines are optional, but many are
          mandatory to protect your child from life-threatening diseases.
        </p>
        <p className="text-gray-600 mb-1">
          The good news: Vaccines are generally very safe. The benefits far
          outweigh the risks, and most babies experience little to no problems.
        </p>
        <p className="text-gray-600">
          The reality: Like any medicine, vaccines can cause mild side effects
          in some children—but these are temporary and usually disappear within
          a few days.
        </p>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          Common Side Effects of Vaccines
        </h3>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
            <i className="fas fa-info-circle text-primary-600"></i>
            DTaP / DTwP, IPV, PCV, Hib
          </h3>
          <p className="text-gray-600">
            Your child may develop mild fever, redness or swelling at the
            injection spot, diarrhea, or vomiting. These symptoms usually show
            up within 24 hours.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
            <i className="fas fa-info-circle text-primary-600"></i>
            MMR (Measles, Mumps, Rubella)
          </h3>
          <p className="text-gray-600">
            Mild fever, loss of appetite, or measles-like rashes may appear 6–10
            days after vaccination. Don’t worry—this is the body’s way of
            building immunity.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
            <i className="fas fa-info-circle text-primary-600"></i>
            General Fever Reactions
          </h3>
          <p className="text-gray-600">
            All vaccines can cause fever. In some rare cases, high temperature
            may trigger seizures or convulsions, especially after the DPT
            vaccine. If this happens, consult your doctor—who may switch to the
            DTaP vaccine for the next dose.
          </p>
        </div>
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
            <i className="fas fa-info-circle text-primary-600"></i>
            Severe Allergic Reaction (Very Rare)
          </h3>
          <p className="text-gray-600">
            Some children may develop anaphylaxis, which includes symptoms like
            rash, swollen lips/face, breathing difficulty, or vomiting within
            minutes. Vaccination centers are usually equipped with epinephrine
            injections to treat this immediately.
          </p>
        </div>
      </div>

      <div className="bg-white mb-8 p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          What Parents Should Know
        </h3>
        <p className="text-gray-600">
          Mild side effects are normal and show that the vaccine is working.
          They usually go away in a couple of days. However, if your child seems
          to be suffering too much, or if you notice anything unusual, consult
          your pediatrician without delay.
        </p>
      </div>

      {/* video section */}

      <div class="bg-white rounded-xl shadow-xl p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Baby Vaccination Immunization Schedule and Chart
        </h2>
        <div class="video-container rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/aRVn-OUqKCQ?si=-AIm7dSux-7ap7bj"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            className="w-full h-[522px]"
          ></iframe>
        </div>
      </div>

      {/* Information Section */}

      <div className="bg-white p-6 rounded-2xl shadow-lg shadow-[#FDE9E6]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-info-circle text-primary-600"></i>
          Disclaimer
        </h3>
        <p className="text-gray-600">
          Disclaimer: The information provided is based on the World Health
          Organization (WHO) which gives information on worldwide immunization
          schedules. It provides the usually recommended dates for vaccinations
          based on the country you are living and the baby’s birth date. No
          information about your child will be stored. If your child is having
          any disease or is under any treatment, you should consult your doctor
          for advice as the immunization schedule would be modified.
        </p>
      </div>
    </div>
  );
};

export default ImmunizationScheduleAndChart;
