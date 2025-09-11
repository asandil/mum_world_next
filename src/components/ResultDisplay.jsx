"use client";

export default function ResultDisplay({ result, tableData, currentWeek, onPrint }) {
  return (
    <>
      {/* Results */}
      <div className="mt-6 p-4 border border-[#F89D88] rounded bg-[#FDE9E6]">
        <h3 className="font-semibold mb-2">Result</h3>
        <p>
          <strong>Pre-pregnancy BMI:</strong> {result.bmi} kg/m²
        </p>
        <p>
          <strong>Pre-pregnancy Weight Category:</strong> {result.category}
        </p>
        <p>
          <strong>Target Pregnancy Weight Gain:</strong> {result.minGain} –{" "}
          {result.maxGain} kg
        </p>
        <p>
          <strong>Recommended weight range at delivery (40th week):</strong>{" "}
          {result.minDeliveryWeight} – {result.maxDeliveryWeight} kg
        </p>
        <p>
          <strong>Your Gain So Far:</strong> {result.gainSoFar} kg
        </p>
      </div>

      {/* Table */}
      {tableData.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <h3 className="font-semibold mb-3">
            Table of Recommended Weight Range
          </h3>
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-[#F89D88] text-white">
                <th className="border px-3 py-2">Week of Pregnancy</th>
                <th className="border px-3 py-2">
                  Recommended Weight Range (kg)
                </th>
                <th className="border px-3 py-2">
                  Recommended Weight Gain (kg)
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr
                  key={row.week}
                  className={
                    currentWeek === row.week
                      ? "bg-[#FDE9E6] font-semibold"
                      : ""
                  }
                >
                  <td className="border px-3 py-2">Week {row.week}</td>
                  <td className="border px-3 py-2">{row.weightRange}</td>
                  <td className="border px-3 py-2">{row.gainRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Buttons Section */}
      {tableData.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <button
            onClick={onPrint}
            className="px-4 py-2 cursor-pointer uppercase bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Print
          </button>

          <button
            onClick={onPrint} // will also save as PDF
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
    </>
  );
}
