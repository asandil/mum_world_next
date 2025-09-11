"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import WeightChart from "./WeightChart";
import WeightForm from "./WeightForm";
import ResultDisplay from "./ResultDisplay";

export default function PregnancyWeightGainCalculator() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [formData, setFormData] = useState({
    preWeight: "",
    currentWeight: "",
    height: "",
    week: "",
    isTwins: false,
  });
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Pregnancy Weight Gain Report",
  });

  // Update form data
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Calculate BMI category and weight gain recommendations
  const calculateResults = useCallback(() => {
    const { preWeight, currentWeight, height, week, isTwins } = formData;
    if (!preWeight || !currentWeight || !height || !week) return null;

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

    return {
      bmi: bmi.toFixed(1),
      category,
      minGain,
      maxGain,
      minDeliveryWeight,
      maxDeliveryWeight,
      gainSoFar,
    };
  }, [formData]);

  // Generate chart data
  const generateChartData = useCallback(() => {
    const { preWeight, week } = formData;
    const results = calculateResults();
    
    if (!results || !preWeight) return [];
    
    const weeks = Array.from({ length: 40 }, (_, i) => i + 1);
    return weeks.map((w) => {
      const minW = preWeight * 1 + ((results.minDeliveryWeight - preWeight) / 40) * w;
      const maxW = preWeight * 1 + ((results.maxDeliveryWeight - preWeight) / 40) * w;
      return { week: w, min: minW, max: maxW };
    });
  }, [formData, calculateResults]);

  // Generate table data
  const generateTableData = useCallback((chartData) => {
    const { preWeight } = formData;
    if (!preWeight || chartData.length === 0) return [];
    
    return chartData.map((d, i) => {
      const prevMin = i === 0 ? preWeight : chartData[i - 1].min;
      const prevMax = i === 0 ? preWeight : chartData[i - 1].max;
      return {
        week: d.week,
        weightRange: `${d.min.toFixed(1)} - ${d.max.toFixed(1)}`,
        gainRange: `${(d.min - prevMin).toFixed(1)} - ${(d.max - prevMax).toFixed(1)}`,
      };
    });
  }, [formData]);

  // Handle calculation
  const handleCalculate = useCallback(() => {
    const results = calculateResults();
    if (!results) return;
    
    const newChartData = generateChartData();
    const newTableData = generateTableData(newChartData);
    
    setResult(results);
    setChartData(newChartData);
    setTableData(newTableData);
  }, [calculateResults, generateChartData, generateTableData]);

  // Check if form is valid for calculation
  const isFormValid = useMemo(() => {
    return formData.preWeight && formData.currentWeight && 
           formData.height && formData.week;
  }, [formData]);

  return (
    <div className="mx-auto p-6 rounded-xl shadow-xl mb-8 shadow-[#FDE9E6] bg-white">
      <h2 className="text-lg font-bold mb-4">Pregnancy Weight Gain Calculator</h2>

      {/* Unit System Tabs */}
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

      {/* Form Component */}
      <WeightForm 
        unitSystem={unitSystem}
        formData={formData}
        onInputChange={handleInputChange}
      />

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={!isFormValid}
        className={`w-full mt-6 py-3 font-semibold rounded cursor-pointer ${
          isFormValid 
            ? "bg-[#F89D88] text-white hover:bg-[#e6846a]" 
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        CALCULATE
      </button>

      {/* Chart Display */}
      {chartData.length > 0 && (
        <WeightChart 
          chartData={chartData}
          currentWeek={parseInt(formData.week)}
          currentWeight={parseFloat(formData.currentWeight)}
        />
      )}

      {/* Results Display */}
      {result && (
        <div ref={printRef}>
          <ResultDisplay 
            result={result}
            tableData={tableData}
            currentWeek={parseInt(formData.week)}
            onPrint={handlePrint}
          />
        </div>
      )}
    </div>
  );
}