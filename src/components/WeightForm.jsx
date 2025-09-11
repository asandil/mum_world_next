"use client";

export default function WeightForm({ unitSystem, formData, onInputChange }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-[20px]">
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">
            Pre-pregnancy Weight:
          </label>
          <input
            type="number"
            value={formData.preWeight}
            onChange={(e) => onInputChange("preWeight", e.target.value)}
            placeholder={unitSystem === "us" ? "lbs" : "kg"}
            className="w-full rounded p-3 h-[48px] focus:outline-none focus:ring-1 hover:border-gray-400 focus:ring-[#F89D8A] focus:border-transparent border border-gray-300"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium mb-1">
            Current Pregnancy Week:
          </label>
          <select
            value={formData.week}
            onChange={(e) => onInputChange("week", e.target.value)}
            className="w-full border rounded p-3 h-[48px] focus:outline-none focus:ring-1 hover:border-gray-400 focus:ring-[#F89D8A] focus:border-transparent border-gray-300"
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

      <div className="flex w-full gap-[20px]">
        <div className="flex justify-between w-full gap-[20px]">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              Your Height:
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => onInputChange("height", e.target.value)}
              placeholder={unitSystem === "us" ? "inches" : "cm"}
              className="w-full focus:outline-none focus:ring-1 hover:border-gray-400 focus:ring-[#F89D8A] focus:border-transparent border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              Current weight:
            </label>
            <input
              type="number"
              value={formData.currentWeight}
              onChange={(e) => onInputChange("currentWeight", e.target.value)}
              placeholder={unitSystem === "us" ? "lbs" : "kg"}
              className="w-full focus:outline-none focus:ring-1 hover:border-gray-400 focus:ring-[#F89D8A] focus:border-transparent border border-gray-300 rounded px-3 py-2"
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
                  checked={!formData.isTwins}
                  onChange={() => onInputChange("isTwins", false)}
                  className="mr-2"
                />
                No
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.isTwins}
                  onChange={() => onInputChange("isTwins", true)}
                  className="mr-2"
                />
                Yes
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}