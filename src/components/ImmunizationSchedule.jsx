"use client";
import { useRef, useState } from "react";
import immunizationSchedules from "@/lib/ImmunizationData";
import { useReactToPrint } from "react-to-print";

export default function ImmunizationScheduler() {
  const [dob, setDob] = useState("2025-09-09");
  const [country, setCountry] = useState("INDIA");
  const [childName, setChildName] = useState("");
  const [scheduleData, setScheduleData] = useState(null);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Immunization Schedule Report",
    pageStyle: `
      @media print {
        body { 
          -webkit-print-color-adjust: exact; 
          color-adjust: exact;
        }
        .print-table-header {
          background-color: #FDE9E6 !important;
        }
        .print-table-row-even {
          background-color: #FDE9E6 !important;
        }
      }
    `,
  });

  // Calculate vaccination dates based on DOB
  const calculateDates = (
    baseDate,
    weeks = 0,
    months = 0,
    rangeMonths = null
  ) => {
    const date = new Date(baseDate);
    if (weeks) date.setDate(date.getDate() + weeks * 7);
    if (months) date.setMonth(date.getMonth() + months);

    if (rangeMonths) {
      const endDate = new Date(baseDate);
      endDate.setMonth(endDate.getMonth() + rangeMonths);
      return `${date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })} - ${endDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setScheduleData({
      dob,
      country,
      childName,
      schedule: immunizationSchedules[country] || [],
    });
  };

  return (
    <div className="mx-auto p-5 font-sans shadow-xl mb-8 rounded-lg ">
      <h2 className="text-lg font-bold mb-4">
        Immunization Scheduler and Chart
      </h2>

      {/* Form is always visible */}
      <form onSubmit={handleSubmit} className="rounded-lg mb-6">
        <div className="md:flex-row flex justify-between gap-[0px] md:gap-[20px] flex-col ">
          <div className="mb-5 w-full">
            <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">
              Your Child's Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F89D8A]"
              required
            />
          </div>

          <div className="mb-5 w-full ">
            <label
              htmlFor="country"
              className="block text-gray-700 font-bold mb-2"
            >
              Your Country:
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F89D8A]"
              required
            >
              <option value="AUSTRALIA">AUSTRALIA</option>
              <option value="CANADA">CANADA</option>
              <option value="INDIA">INDIA</option>
              <option value="UK">UK</option>
              <option value="USA">KUWAIT</option>
              <option value="USA">MALAYSIA</option>
              <option value="USA">NIGERIA</option>
              <option value="USA">QATAR</option>
              <option value="USA">SOUTH AFRICA</option>
              <option value="USA">USA</option>
              <option value="UK">OTHER</option>
            </select>
          </div>

          <div className="mb-5 w-full ">
            <label
              htmlFor="childName"
              className="block text-gray-700 font-bold mb-2"
            >
              Your Child's Name (Optional)
            </label>
            <input
              type="text"
              id="childName"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter child's name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F89D8A]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#F89D8B] hover:bg-[#e6846a] cursor-pointer text-white font-bold py-3 px-4 rounded-md transition-colors duration-200"
        >
          Get Schedule
        </button>
      </form>

      {/* Results section appears below the form when data exists */}
      {scheduleData && (
        <div className="rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Result</h2>

          {/* Printable content */}
          <div ref={printRef} className="p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">
              Immunization Schedule
            </h1>

            <div className="mb-4">
              <p>
                <strong>Child's Date of Birth:</strong>{" "}
                {new Date(scheduleData.dob).toLocaleDateString()}
              </p>
              <p>
                <strong>Country:</strong> {scheduleData.country}
              </p>
              {scheduleData.childName && (
                <p>
                  <strong>Child's Name:</strong> {scheduleData.childName}
                </p>
              )}
              <p className="mb-6">
                Following Immunization Schedule is based on recommendation of{" "}
                {scheduleData.country}'s Advisory Committee on Vaccines &
                Immunization Practices
              </p>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="print-table-header bg-[#FDE9E6]">
                    <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                      Child's Age
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                      Vaccine and Dose
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                      Protects Against
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-bold">
                      Recommended Vaccination Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.schedule.map((vaccine, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 !== 0
                          ? "print-table-row-even bg-[#FDE9E6]"
                          : "hover:bg-[#ffe2de]"
                      }
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {vaccine.age}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {vaccine.vaccine}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {vaccine.protection}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {calculateDates(
                          scheduleData.dob,
                          vaccine.weeks,
                          vaccine.months,
                          vaccine.rangeMonths
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <div className="text-sm text-gray-500 mt-8">
              <p>Generated on: {new Date().toLocaleDateString()}</p>
            </div> */}
          </div>

          <div>
            <div className="flex flex-wrap gap-4 justify-center mt-0">
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
                onClick={() => setScheduleData(null)}
                className="px-4 py-2 cursor-pointer uppercase bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
              >
                Recalculate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
