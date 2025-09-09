"use client";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Scatter,
} from "recharts";

export default function PregnancyWeightGainCalculator() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [preWeight, setPreWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [height, setHeight] = useState("");
  const [week, setWeek] = useState("");
  const [isTwins, setIsTwins] = useState(false);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [currentPoint, setCurrentPoint] = useState(null);
  const [tableData, setTableData] = useState([]);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Pregnancy Weight Gain Report",
  });

  const handleCalculate = () => {
    if (!preWeight || !currentWeight || !height || !week) return;

    const bmi = preWeight / (height / 100) ** 2;

    let category = "";
    let minGain = 0;
    let maxGain = 0;

    if (bmi < 18.5) {
      category = "Underweight";
      minGain = 12.5;
      maxGain = 18;
    } else if (bmi < 25) {
      category = "Normal";
      minGain = 11;
      maxGain = 16;
    } else if (bmi < 30) {
      category = "Overweight";
      minGain = 7;
      maxGain = 11.5;
    } else {
      category = "Obese";
      minGain = 5;
      maxGain = 9;
    }

    if (isTwins) {
      minGain += 6;
      maxGain += 9;
    }

    const minDeliveryWeight = (parseFloat(preWeight) + minGain).toFixed(1);
    const maxDeliveryWeight = (parseFloat(preWeight) + maxGain).toFixed(1);
    const gainSoFar = (currentWeight - preWeight).toFixed(1);

    // Build chart data
    const weeks = Array.from({ length: 40 }, (_, i) => i + 1);
    const chart = weeks.map((w) => {
      const minW = preWeight * 1 + ((minDeliveryWeight - preWeight) / 40) * w;
      const maxW = preWeight * 1 + ((maxDeliveryWeight - preWeight) / 40) * w;
      return { week: w, min: minW, max: maxW };
    });

    // Table data (weekly gain + range)
    const table = chart.map((d, i) => {
      const prevMin = i === 0 ? preWeight : chart[i - 1].min;
      const prevMax = i === 0 ? preWeight : chart[i - 1].max;
      return {
        week: d.week,
        weightRange: `${d.min.toFixed(1)} - ${d.max.toFixed(1)}`,
        gainRange: `${(d.min - prevMin).toFixed(1)} - ${(
          d.max - prevMax
        ).toFixed(1)}`,
      };
    });

    setResult({
      bmi: bmi.toFixed(1),
      category,
      minGain,
      maxGain,
      minDeliveryWeight,
      maxDeliveryWeight,
      gainSoFar,
    });

    setChartData(chart);
    setCurrentPoint({
      week: parseInt(week),
      weight: parseFloat(currentWeight),
    });
    setTableData(table);
  };

  return (
    <div className=" mx-auto p-6 rounded-xl shadow-xl mb-8 shadow-[#FDE9E6] bg-white">
      <h2 className="text-lg font-bold mb-4">
        Pregnancy Weight Gain Calculator
      </h2>

      {/* Tabs */}
      <div className="flex gap-[20px] mb-6">
        <button
          className={`flex-1 py-3 font-medium rounded-md ${
            unitSystem === "us"
              ? "bg-[#F89D88] text-white cursor-not-allowed"
              : "bg-gray-200 text-gray-700 cursor-pointer"
          }`}
          onClick={() => setUnitSystem("us")}
        >
          US Units
        </button>
        <button
          className={`flex-1 py-3 font-medium rounded-md ${
            unitSystem === "metric"
              ? "bg-[#F89D88] text-white cursor-not-allowed"
              : "bg-gray-200 text-gray-700 cursor-pointer"
          }`}
          onClick={() => setUnitSystem("metric")}
        >
          Metric Units
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="flex gap-[20px] ">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              Pre-pregnancy Weight:
            </label>
            <input
              type="number"
              value={preWeight}
              onChange={(e) => setPreWeight(e.target.value)}
              placeholder={unitSystem === "us" ? "lbs" : "kg"}
              className="w-full border rounded p-3 h-[48px] "
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              Current Pregnancy Week:
            </label>
            <select
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              className="w-full border rounded p-3 h-[48px]"
            >
              <option value="">Select Week</option>
              {Array.from({ length: 40 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>
                  {w} week
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full gap-[20px] ">
          <div className="flex justify-between w-full gap-[20px]">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Your Height:
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unitSystem === "us" ? "inches" : "cm"}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Current weight:
              </label>
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                placeholder={unitSystem === "us" ? "lbs" : "kg"}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Pregnant with Twins:
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!isTwins}
                    onChange={() => setIsTwins(false)}
                    className="mr-2"
                  />
                  No
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={isTwins}
                    onChange={() => setIsTwins(true)}
                    className="mr-2"
                  />
                  Yes
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full mt-6 py-3 bg-[#F89D88] text-white font-semibold rounded hover:bg-[#e6846a] cursor-pointer"
      >
        CALCULATE
      </button>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="week"
                label={{ value: "Weeks", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                label={{
                  value: "Weight (kg)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="max"
                stroke="green"
                fill="lightgreen"
                fillOpacity={0.3}
                baseLine={chartData.map((d) => d.min)}
              />
              <Line type="monotone" dataKey="min" stroke="green" dot={false} />
              <Line type="monotone" dataKey="max" stroke="green" dot={false} />
              {currentPoint && (
                <Scatter
                  data={[currentPoint]}
                  shape="circle"
                  fill="red"
                  name="Current Weight"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {result && (
        <div ref={printRef}>
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
                        parseInt(week) === row.week
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
        </div>
      )}

      {/* Buttons Section */}
      {tableData.length > 0 && (
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
  );
}
