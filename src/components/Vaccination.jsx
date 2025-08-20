"use client"; // Required for client-side interactivity in Next.js 13+

import { useState } from "react";
import vaccinedata from "../assets/VaccineChartData";

const Vaccination = () => {
  const [dob, setDob] = useState("");
  const [submit, setSubmit] = useState(false);

  const calculateDueDate = (timing) => {
    if (!dob) {
      return "NA";
    }

    const birthDate = new Date(dob);
    let dueDate = new Date(birthDate);

    // Add the corresponding time duration based on the timing
    switch (timing) {
      case "Birth":
        break;
      case "6 Weeks":
        dueDate.setDate(dueDate.getDate() + 42);
        break;
      case "10 Weeks":
        dueDate.setDate(dueDate.getDate() + 70);
        break;
      case "14 Weeks":
        dueDate.setDate(dueDate.getDate() + 98); // Fixed: 14 weeks is 98 days, not 140
        break;
      case "9 Month":
        dueDate.setMonth(dueDate.getMonth() + 9);
        break;
      case "12 Month":
        dueDate.setMonth(dueDate.getMonth() + 12);
        break;
      case "15 Month":
        dueDate.setMonth(dueDate.getMonth() + 15);
        break;
      case "17 Month":
        dueDate.setMonth(dueDate.getMonth() + 17);
        break;
      case "18 Month":
        dueDate.setMonth(dueDate.getMonth() + 18);
        break;
      case "2 Year":
        dueDate.setFullYear(dueDate.getFullYear() + 2);
        break;
      case "5 Year":
        dueDate.setFullYear(dueDate.getFullYear() + 5);
        break;
      case "10 Year":
        dueDate.setFullYear(dueDate.getFullYear() + 10);
        break;
      default:
        break;
    }

    // Format the due date as a string
    return dueDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!dob) return;
    setSubmit(!submit);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="text-[16px] text-black font-[700]" htmlFor="DOB">
          Date of Birth :{" "}
        </label>
        <input
          className="border-[1px] border-[rgb(226,226,226)] ml-[2px] p-[3px] cursor-pointer"
          type="date"
          name="DOB"
          id="DOB"
          onChange={(e) => setDob(e.target.value)}
        />
        <button
          className="ml-[5px] border py-[3px] px-[16px] bg-gray-500 text-white cursor-pointer hover:bg-gray-700 rounded"
          id="submit"
          type="submit"
          disabled={submit}
        >
          Submit
        </button>
      </form>
      <table
        id="vaccinationTable"
        className="w-[100%] border-collapse mt-[21px]"
      >
        {/* Headings */}
        <tr>
          <th className="border-[1px] border-[#dddddd] text-left p-[8px] bg-[#f2f2f2]">
            Timing
          </th>
          <th className="border-[1px] border-[#dddddd] text-left p-[8px] bg-[#f2f2f2]">
            Vaccination
          </th>
          <th className="border-[1px] border-[#dddddd] text-left p-[8px] bg-[#f2f2f2]">
            Due Date
          </th>
        </tr>
        {/* data */}
        {vaccinedata.map((data, id) => (
          <tr key={id}>
            <td className="border-[1px] border-[#dddddd] text-left p-[8px]">
              {data.timing}
            </td>
            <td
              className="border-[1px] border-[#dddddd] text-left p-[8px]"
              dangerouslySetInnerHTML={{ __html: data.Vaccination }}
            ></td>
            <td className="border-[1px] border-[#dddddd] text-left p-[8px]">
              {!submit ? "NA" : calculateDueDate(data.time)}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Vaccination;
