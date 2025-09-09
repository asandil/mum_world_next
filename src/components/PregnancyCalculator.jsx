"use client";

import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function PregnancyCalculator() {
  const [method, setMethod] = useState("lastPeriod");
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [conceptionDate, setConceptionDate] = useState("");
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState("");
  const [ultrasoundDays, setUltrasoundDays] = useState("");
  const [cycleLength, setCycleLength] = useState(28); // Default 28-day cycle
  const [showResults, setShowResults] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [pregnancyData, setPregnancyData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Pregnancy Weight Gain Report",
  });

  useEffect(() => {
    // Set today's date as default for date inputs
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setLastPeriodDate(formattedDate);
    setConceptionDate(formattedDate);
  }, []);

  // Function to add days to a date
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Function to format date as "Month Day, Year"
  const formatDate = (date) => {
    if (!date || isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to calculate weeks and days between two dates
  const calculateWeeksAndDays = (startDate, endDate) => {
    if (
      !startDate ||
      !endDate ||
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      return { weeks: 0, days: 0 };
    }
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    return { weeks, days };
  };

  // Function to calculate all pregnancy data based on due date
  const calculatePregnancyData = (dueDate, method, cycleLength = 28) => {
    let conceptionDateCalc, lastPeriodDateCalc;

    if (method === "lastPeriod") {
      const lastPeriod = new Date(lastPeriodDate);
      if (isNaN(lastPeriod.getTime())) return null;

      lastPeriodDateCalc = lastPeriod;
      conceptionDateCalc = addDays(lastPeriodDateCalc, cycleLength - 14); // Ovulation typically occurs 14 days before next period
    } else if (method === "conception") {
      const conception = new Date(conceptionDate);
      if (isNaN(conception.getTime())) return null;

      conceptionDateCalc = conception;
      lastPeriodDateCalc = addDays(conceptionDateCalc, -(cycleLength - 14)); // Calculate LMP based on conception
    } else {
      // For ultrasound method, we need to estimate based on standard 28-day cycle
      if (!dueDate || isNaN(dueDate.getTime())) return null;

      lastPeriodDateCalc = addDays(dueDate, -280);
      conceptionDateCalc = addDays(lastPeriodDateCalc, 14); // Standard ovulation day
    }

    const pregnancyTestDate = addDays(conceptionDateCalc, 14); // 2 weeks after conception
    const firstTrimesterStart = addDays(lastPeriodDateCalc, 0);
    const firstTrimesterEnd = addDays(lastPeriodDateCalc, 83); // 12 weeks
    const secondTrimesterStart = addDays(lastPeriodDateCalc, 84); // 13 weeks
    const secondTrimesterEnd = addDays(lastPeriodDateCalc, 188); // 27 weeks
    const thirdTrimesterStart = addDays(lastPeriodDateCalc, 189); // 28 weeks
    const thirdTrimesterEnd = addDays(lastPeriodDateCalc, 279); // 40 weeks
    const safeRangeStart = addDays(dueDate, -14); // 2 weeks before due date
    const safeRangeEnd = addDays(dueDate, 14); // 2 weeks after due date

    // Calculate multiples due dates
    const twinsDueDate = addDays(dueDate, -21); // 37 weeks
    const tripletsDueDate = addDays(dueDate, -49); // 33 weeks
    const quadsDueDate = addDays(dueDate, -56); // 32 weeks

    // Calculate milestones
    const milestones = [
      {
        description: "Your baby is conceived",
        weeks: 2,
        date: addDays(lastPeriodDateCalc, 14),
      },
      {
        description: "Positive pregnancy test",
        weeks: 4,
        date: addDays(lastPeriodDateCalc, 28),
      },
      {
        description: "Organs begin to form, heart starts beating",
        weeks: 5,
        date: addDays(lastPeriodDateCalc, 35),
      },
      {
        description: "Major organs have formed, heart can be heard",
        weeks: 10,
        date: addDays(lastPeriodDateCalc, 70),
      },
      {
        description: "Second trimester, risk of miscarriage decreases",
        weeks: 12,
        date: addDays(lastPeriodDateCalc, 84),
      },
      {
        description: "Now is a good time to announce your pregnancy",
        weeks: 14,
        date: addDays(lastPeriodDateCalc, 98),
      },
      {
        description: "Your baby can now see light",
        weeks: 15,
        date: addDays(lastPeriodDateCalc, 105),
      },
      {
        description: "Your baby's gender is visible on ultrasound",
        weeks: 16,
        date: addDays(lastPeriodDateCalc, 112),
      },
      {
        description: "You can feel your baby move around",
        weeks: 18,
        date: addDays(lastPeriodDateCalc, 126),
      },
      {
        description: "Your baby can now hear sounds",
        weeks: 19,
        date: addDays(lastPeriodDateCalc, 133),
      },
      {
        description: "Premature babies have a chance to survive",
        weeks: 23,
        date: addDays(lastPeriodDateCalc, 161),
      },
      {
        description: "Third trimester, your baby can breathe",
        weeks: 27,
        date: addDays(lastPeriodDateCalc, 189),
      },
      {
        description: "Fingernails and toenails have formed",
        weeks: 32,
        date: addDays(lastPeriodDateCalc, 224),
      },
      {
        description: "Your baby is now considered full term",
        weeks: 37,
        date: addDays(lastPeriodDateCalc, 259),
      },
      {
        description: "Your baby is due any time now!",
        weeks: 40,
        date: dueDate,
      },
    ];

    // Calculate weeks left until due date
    const today = new Date();
    const weeksLeft = calculateWeeksAndDays(today, dueDate);

    return {
      dueDate,
      conceptionDate: conceptionDateCalc,
      lastPeriodDate: lastPeriodDateCalc,
      pregnancyTestDate,
      firstTrimester: { start: firstTrimesterStart, end: firstTrimesterEnd },
      secondTrimester: { start: secondTrimesterStart, end: secondTrimesterEnd },
      thirdTrimester: { start: thirdTrimesterStart, end: thirdTrimesterEnd },
      safeRange: { start: safeRangeStart, end: safeRangeEnd },
      milestones,
      weeksLeft,
      multiples: {
        twins: { dueDate: twinsDueDate, weeks: 37 },
        triplets: { dueDate: tripletsDueDate, weeks: 33 },
        quads: { dueDate: quadsDueDate, weeks: 32 },
      },
      cycleLength,
    };
  };

  const calculateDueDate = (method) => {
    let calculatedDueDate;

    if (method === "lastPeriod" && lastPeriodDate) {
      // Calculate due date based on last period and cycle length
      // Standard calculation: LMP + 280 days (40 weeks)
      // Adjusted for cycle length: LMP + 280 + (cycleLength - 28)
      calculatedDueDate = addDays(
        new Date(lastPeriodDate),
        280 + (cycleLength - 28)
      );
    } else if (method === "conception" && conceptionDate) {
      // Conception date + 266 days (38 weeks)
      calculatedDueDate = addDays(new Date(conceptionDate), 266);
    } else if (method === "ultrasound" && ultrasoundWeeks) {
      const weeks = parseInt(ultrasoundWeeks) || 0;
      const days = parseInt(ultrasoundDays) || 0;
      const totalDays = weeks * 7 + days;
      const today = new Date();
      calculatedDueDate = addDays(today, 280 - totalDays); // Calculate due date based on ultrasound data
    } else {
      alert("Please enter the required information");
      return;
    }

    if (isNaN(calculatedDueDate.getTime())) {
      alert("Invalid date calculation. Please check your inputs.");
      return;
    }

    setDueDate(calculatedDueDate);
    const data = calculatePregnancyData(calculatedDueDate, method, cycleLength);

    if (!data) {
      alert("Could not calculate pregnancy data. Please check your inputs.");
      return;
    }

    setPregnancyData(data);
    setShowResults(true);

    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById("results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="">
      {/* Calculator Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 shadow-[#FDE9E6]">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Calculation Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setMethod("lastPeriod")}
                className={`method-btn p-4 rounded-xl border-2 transition-all ${
                  method === "lastPeriod"
                    ? "border-[#F89D8B] bg-[#FDE9E6] text-[#F89D8B] cursor-not-allowed"
                    : "border-gray-200 text-gray-600 hover:border-primary-300 cursor-pointer"
                }`}
              >
                <i className="fas fa-calendar-day text-xl mb-2"></i>
                Last Period
              </button>
              <button
                onClick={() => setMethod("conception")}
                className={`method-btn p-4 rounded-xl border-2 transition-all ${
                  method === "conception"
                    ? "border-[#F89D8B] bg-[#FDE9E6] text-[#F89D8B] cursor-not-allowed"
                    : "border-gray-200 text-gray-600 hover:border-primary-300 cursor-pointer"
                }`}
              >
                <i className="fas fa-heart text-xl mb-2"></i>
                Conception Date
              </button>
              <button
                onClick={() => setMethod("ultrasound")}
                className={`method-btn p-4 rounded-xl border-2 transition-all ${
                  method === "ultrasound"
                    ? "border-[#F89D8B] bg-[#FDE9E6] text-[#F89D8B] cursor-not-allowed"
                    : "border-gray-200 text-gray-600 hover:border-primary-300 cursor-pointer"
                }`}
              >
                <i className="fas fa-procedures text-xl mb-2"></i>
                Ultrasound
              </button>
            </div>
          </div>

          {/* Input Section */}
          <div className="">
            {method === "lastPeriod" && (
              <div id="lastPeriodInput">
                <div className="flex justify-between gap-[20px] ">
                  <div className=" w-full">
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      First day of your last menstrual period
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <input
                        type="date"
                        value={lastPeriodDate}
                        onChange={(e) => setLastPeriodDate(e.target.value)}
                        className="flex-1 w-full h-[48px] p-2 border border-gray-300 rounded-lg  focus:border-transparent text-lg"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      Average length of your cycle
                    </label>
                    <div className="flex items-center gap-4">
                      <select
                        value={cycleLength}
                        onChange={(e) =>
                          setCycleLength(parseInt(e.target.value))
                        }
                        className="border w-full border-gray-300 rounded-md h-[48px] p-2 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {Array.from({ length: 15 }, (_, i) => i + 21).map(
                          (day) => (
                            <option key={day} value={day}>
                              {day} days
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Most women have a cycle between 28-32 days. Adjust if your
                  cycle is different.
                </p>
                <button
                  onClick={() => calculateDueDate("lastPeriod")}
                  className="calculate-btn bg-primary-600 bg-[#F89D8B] text-white py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg w-full "
                >
                  Calculate Due Date <i className="fas fa-calculator ml-2"></i>
                </button>
              </div>
            )}

            {method === "conception" && (
              <div id="conceptionInput">
                <div className="flex justify-between gap-[20px] ">
                  <div className=" w-full">
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      Estimated conception date
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <input
                        type="date"
                        value={conceptionDate}
                        onChange={(e) => setConceptionDate(e.target.value)}
                        className="flex-1 w-full h-[48px] p-2 border border-gray-300 rounded-lg  focus:border-transparent text-lg"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      Average length of your cycle
                    </label>
                    <div className="flex items-center gap-4">
                      <select
                        value={cycleLength}
                        onChange={(e) =>
                          setCycleLength(parseInt(e.target.value))
                        }
                        className="border w-full border-gray-300 rounded-md h-[48px] p-2 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {Array.from({ length: 15 }, (_, i) => i + 21).map(
                          (day) => (
                            <option key={day} value={day}>
                              {day} days
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  This helps calculate your last menstrual period date more
                  accurately.
                </p>

                <button
                  onClick={() => calculateDueDate("conception")}
                  className="calculate-btn bg-primary-600 bg-[#F89D8B] text-white py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg w-full"
                >
                  Calculate Due Date <i className="fas fa-calculator ml-2"></i>
                </button>
              </div>
            )}

            {method === "ultrasound" && (
              <div id="ultrasoundInput">
                <div className=" w-full">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Ultrasound gestational age
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-600 mb-2">Weeks</label>
                      <input
                        type="number"
                        value={ultrasoundWeeks}
                        onChange={(e) => setUltrasoundWeeks(e.target.value)}
                        min="0"
                        max="40"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-2">Days</label>
                      <input
                        type="number"
                        value={ultrasoundDays}
                        onChange={(e) => setUltrasoundDays(e.target.value)}
                        min="0"
                        max="6"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Average length of your cycle (optional)
                  </label>
                  <div className="flex items-center gap-4">
                    <select
                      value={cycleLength}
                      onChange={(e) => setCycleLength(parseInt(e.target.value))}
                      className="border w-full border-gray-300 rounded-md h-[48px] p-2 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {Array.from({ length: 15 }, (_, i) => i + 21).map(
                        (day) => (
                          <option key={day} value={day}>
                            {day} days
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => calculateDueDate("ultrasound")}
                  className="calculate-btn w-full bg-primary-600 bg-[#F89D8B] text-white py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
                >
                  Calculate Due Date <i className="fas fa-calculator ml-2"></i>
                </button>
              </div>
            )}
          </div>

          {/* Results Section */}
          {showResults && pregnancyData && (
            <div id="results" ref={printRef} className="fade-in mt-8">
              <div className="bg-green-50 p-8 rounded-xl border border-green-200 mb-6 text-center">
                <h2 className="text-3xl font-bold text-green-700 mb-2">
                  Congratulations!
                </h2>
                <p className="text-lg text-green-600 mb-6">
                  Your Baby's Estimated Due Date is On Or Around
                </p>
                <p className="text-4xl font-bold text-green-800 mb-4">
                  {formatDate(pregnancyData.dueDate)}
                </p>
                <p className="text-xl text-green-700">
                  Only {pregnancyData.weeksLeft.weeks} Weeks{" "}
                  {pregnancyData.weeksLeft.days} Days left until your baby is
                  born!
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Pregnancy Timeline
                </h3>
                <table className="w-full milestone-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">
                        Average cycle length:
                      </td>
                      <td className="py-2 text-gray-900">
                        {pregnancyData.cycleLength} days
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">
                        Conception likely took place on:
                      </td>
                      <td className="py-2 text-gray-900">
                        {formatDate(pregnancyData.conceptionDate)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">
                        Take A Pregnancy Test On
                      </td>
                      <td className="py-2 text-gray-900">
                        {formatDate(pregnancyData.pregnancyTestDate)} To Confirm
                        Your Pregnancy
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">
                        The First Trimester (weeks 1-12):
                      </td>
                      <td className="py-2 text-gray-900">
                        {formatDate(pregnancyData.firstTrimester.start)} -{" "}
                        {formatDate(pregnancyData.firstTrimester.end)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">
                        The Second Trimester (weeks 13-27):
                      </td>
                      <td className="py-2 text-gray-900">
                        {formatDate(pregnancyData.secondTrimester.start)} -{" "}
                        {formatDate(pregnancyData.secondTrimester.end)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">
                        The Third Trimester (weeks 28-40):
                      </td>
                      <td className="py-2 text-gray-900">
                        {formatDate(pregnancyData.thirdTrimester.start)} -{" "}
                        {formatDate(pregnancyData.thirdTrimester.end)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">
                        Your Safe Range To Give Birth Is Between:
                      </td>
                      <td className="py-2 text-gray-900">
                        {formatDate(pregnancyData.safeRange.start)} to{" "}
                        {formatDate(pregnancyData.safeRange.end)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Significant Milestones In Embryo/Fetal Development
                </h3>
                <table className="milestone-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Week</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pregnancyData.milestones.map((milestone, index) => (
                      <tr key={index}>
                        <td>{milestone.description}</td>
                        <td>{formatDate(milestone.date)}</td>
                        <td>Week {milestone.weeks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Multiples - Due Dates by Average Gestation
                </h3>
                <table className="milestone-table">
                  <thead>
                    <tr>
                      <th>Twins</th>
                      <th>Triplets</th>
                      <th>Quads</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="font-medium">
                          {formatDate(pregnancyData.multiples.twins.dueDate)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {pregnancyData.multiples.twins.weeks} weeks
                        </div>
                      </td>
                      <td>
                        <div className="font-medium">
                          {formatDate(pregnancyData.multiples.triplets.dueDate)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {pregnancyData.multiples.triplets.weeks} weeks
                        </div>
                      </td>
                      <td>
                        <div className="font-medium">
                          {formatDate(pregnancyData.multiples.quads.dueDate)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {pregnancyData.multiples.quads.weeks} weeks
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-500 mt-4">
                  Note: Multiple pregnancies often have shorter gestation
                  periods than singleton pregnancies.
                </p>
              </div>
            </div>
          )}

          {showResults && (

         

          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button
              onClick={handlePrint}
              className="px-4 py-2 cursor-pointer uppercase bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Print
            </button>

            <button
              onClick={handlePrint} // will also save as PDF
              className="px-4 py-2 cursor-pointer uppercase bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Save as PDF
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 cursor-pointer uppercase bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
            >
              Recalculate
            </button>
          </div>
           )}
        </div>
      </div>

      <style jsx>{`
        .milestone-table {
          width: 100%;
          border-collapse: collapse;
        }
        .milestone-table th,
        .milestone-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
        }
        .milestone-table th {
          background-color: #fde9e6;
          font-weight: 600;
        }
        .highlight {
          background-color: #fde9e6;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
