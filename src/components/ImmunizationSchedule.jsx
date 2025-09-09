"use client";
import { useState } from 'react';

export default function ImmunizationScheduler() {
  const [dob, setDob] = useState('2025-09-09');
  const [country, setCountry] = useState('INDIA');
  const [childName, setChildName] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  // Country-specific immunization schedules
  const immunizationSchedules = {
    INDIA: [
      { age: 'At Birth', vaccine: 'Hepatitis B - Dose 1 of 3', protection: 'Hepatitis B virus', weeks: 0, months: 0 },
      { age: 'At Birth', vaccine: 'BCG - Dose 1', protection: 'Tuberculosis', weeks: 0, months: 0 },
      { age: 'At Birth', vaccine: 'OPV - Dose 1 of 4', protection: 'Polio', weeks: 0, months: 0 },
      { age: '6 weeks', vaccine: 'Hepatitis B - Dose 2 of 3', protection: 'Hepatitis B virus', weeks: 6, months: 0 },
      { age: '6 weeks', vaccine: 'DTaP - Dose 1 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 6, months: 0 },
      { age: '6 weeks', vaccine: 'IPV - Dose 1 of 4', protection: 'Polio', weeks: 6, months: 0 },
      { age: '10 weeks', vaccine: 'DTaP - Dose 2 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 10, months: 0 },
      { age: '14 weeks', vaccine: 'DTaP - Dose 3 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 14, months: 0 },
      { age: '6 months', vaccine: 'Hepatitis B - Dose 3 of 3', protection: 'Hepatitis B virus', weeks: 0, months: 6 },
      { age: '9 months', vaccine: 'MMR - Dose 1 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 9 },
      { age: '12 months', vaccine: 'Hepatitis A - Dose 1 of 2', protection: 'Hepatitis A', weeks: 0, months: 12 },
      { age: '15 months', vaccine: 'MMR - Dose 2 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 15 },
      { age: '18 months', vaccine: 'DTaP - Dose 4 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 18 },
      { age: '4-6 years', vaccine: 'DTaP - Dose 5 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 48, rangeMonths: 72 },
      { age: '10-12 years', vaccine: 'Tdap - Dose 1', protection: 'Tetanus, Diphtheria, Pertussis', weeks: 0, months: 120, rangeMonths: 144 },
      { age: '10-12 years', vaccine: 'HPV - Dose 1', protection: 'Human Papillomavirus', weeks: 0, months: 120, rangeMonths: 144 },
    ],
    USA: [
      { age: 'At Birth', vaccine: 'Hepatitis B - Dose 1 of 3', protection: 'Hepatitis B virus', weeks: 0, months: 0 },
      { age: '1-2 months', vaccine: 'Hepatitis B - Dose 2 of 3', protection: 'Hepatitis B virus', weeks: 0, months: 1 },
      { age: '2 months', vaccine: 'DTaP - Dose 1 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 2 },
      { age: '2 months', vaccine: 'IPV - Dose 1 of 4', protection: 'Polio', weeks: 0, months: 2 },
      { age: '2 months', vaccine: 'PCV13 - Dose 1 of 4', protection: 'Pneumococcal disease', weeks: 0, months: 2 },
      { age: '2 months', vaccine: 'RV - Dose 1 of 3', protection: 'Rotavirus', weeks: 0, months: 2 },
      { age: '4 months', vaccine: 'DTaP - Dose 2 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 4 },
      { age: '4 months', vaccine: 'IPV - Dose 2 of 4', protection: 'Polio', weeks: 0, months: 4 },
      { age: '4 months', vaccine: 'PCV13 - Dose 2 of 4', protection: 'Pneumococcal disease', weeks: 0, months: 4 },
      { age: '4 months', vaccine: 'RV - Dose 2 of 3', protection: 'Rotavirus', weeks: 0, months: 4 },
      { age: '6 months', vaccine: 'DTaP - Dose 3 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 6 },
      { age: '6 months', vaccine: 'PCV13 - Dose 3 of 4', protection: 'Pneumococcal disease', weeks: 0, months: 6 },
      { age: '6 months', vaccine: 'RV - Dose 3 of 3', protection: 'Rotavirus', weeks: 0, months: 6 },
      { age: '6-18 months', vaccine: 'IPV - Dose 3 of 4', protection: 'Polio', weeks: 0, months: 6, rangeMonths: 18 },
      { age: '6-18 months', vaccine: 'Hepatitis B - Dose 3 of 3', protection: 'Hepatitis B virus', weeks: 0, months: 6, rangeMonths: 18 },
      { age: '12-15 months', vaccine: 'MMR - Dose 1 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 12, rangeMonths: 15 },
      { age: '12-15 months', vaccine: 'Varicella - Dose 1 of 2', protection: 'Chickenpox', weeks: 0, months: 12, rangeMonths: 15 },
      { age: '12-15 months', vaccine: 'PCV13 - Dose 4 of 4', protection: 'Pneumococcal disease', weeks: 0, months: 12, rangeMonths: 15 },
      { age: '12-18 months', vaccine: 'Hib - Dose 4 of 4', protection: 'Haemophilus influenzae type b', weeks: 0, months: 12, rangeMonths: 18 },
      { age: '4-6 years', vaccine: 'DTaP - Dose 5 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 48, rangeMonths: 72 },
      { age: '4-6 years', vaccine: 'IPV - Dose 4 of 4', protection: 'Polio', weeks: 0, months: 48, rangeMonths: 72 },
      { age: '4-6 years', vaccine: 'MMR - Dose 2 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 48, rangeMonths: 72 },
      { age: '4-6 years', vaccine: 'Varicella - Dose 2 of 2', protection: 'Chickenpox', weeks: 0, months: 48, rangeMonths: 72 },
      { age: '11-12 years', vaccine: 'Tdap - Dose 1', protection: 'Tetanus, Diphtheria, Pertussis', weeks: 0, months: 132, rangeMonths: 144 },
      { age: '11-12 years', vaccine: 'HPV - Dose 1', protection: 'Human Papillomavirus', weeks: 0, months: 132, rangeMonths: 144 },
    ],
    UK: [
      { age: '8 weeks', vaccine: '6-in-1 - Dose 1 of 3', protection: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hepatitis B', weeks: 8, months: 0 },
      { age: '8 weeks', vaccine: 'Rotavirus - Dose 1 of 2', protection: 'Rotavirus', weeks: 8, months: 0 },
      { age: '8 weeks', vaccine: 'MenB - Dose 1 of 3', protection: 'Meningococcal B', weeks: 8, months: 0 },
      { age: '12 weeks', vaccine: '6-in-1 - Dose 2 of 3', protection: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hepatitis B', weeks: 12, months: 0 },
      { age: '12 weeks', vaccine: 'Rotavirus - Dose 2 of 2', protection: 'Rotavirus', weeks: 12, months: 0 },
      { age: '16 weeks', vaccine: '6-in-1 - Dose 3 of 3', protection: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hepatitis B', weeks: 16, months: 0 },
      { age: '16 weeks', vaccine: 'MenB - Dose 2 of 3', protection: 'Meningococcal B', weeks: 16, months: 0 },
      { age: '12 months', vaccine: 'Hib/MenC - Dose 1', protection: 'Haemophilus influenzae type b, Meningococcal C', weeks: 0, months: 12 },
      { age: '12 months', vaccine: 'MMR - Dose 1 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 12 },
      { age: '12 months', vaccine: 'MenB - Dose 3 of 3', protection: 'Meningococcal B', weeks: 0, months: 12 },
      { age: '3 years 4 months', vaccine: '4-in-1 - Preschool Booster', protection: 'Diphtheria, Tetanus, Pertussis, Polio', weeks: 0, months: 40 },
      { age: '3 years 4 months', vaccine: 'MMR - Dose 2 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 40 },
      { age: '12-13 years', vaccine: 'HPV - Dose 1', protection: 'Human Papillomavirus', weeks: 0, months: 144, rangeMonths: 156 },
      { age: '14 years', vaccine: '3-in-1 - Teenage Booster', protection: 'Tetanus, Diphtheria, Polio', weeks: 0, months: 168 },
      { age: '14 years', vaccine: 'MenACWY - Dose 1', protection: 'Meningococcal A, C, W, Y', weeks: 0, months: 168 },
    ],
    CANADA: [
      { age: 'At Birth', vaccine: 'Hepatitis B - Dose 1 of 3', protection: 'Hepatitis B virus', weeks: 0, months: 0 },
      { age: '2 months', vaccine: 'DTaP - Dose 1 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 2 },
      { age: '2 months', vaccine: 'IPV - Dose 1 of 4', protection: 'Polio', weeks: 0, months: 2 },
      { age: '2 months', vaccine: 'Hib - Dose 1 of 4', protection: 'Haemophilus influenzae type b', weeks: 0, months: 2 },
      { age: '2 months', vaccine: 'PCV13 - Dose 1 of 4', protection: 'Pneumococcal disease', weeks: 0, months: 2 },
      { age: '2 months', vaccine: 'Rotavirus - Dose 1 of 3', protection: 'Rotavirus', weeks: 0, months: 2 },
      { age: '4 months', vaccine: 'DTaP - Dose 2 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 4 },
      { age: '4 months', vaccine: 'IPV - Dose 2 of 4', protection: 'Polio', weeks: 0, months: 4 },
      { age: '4 months', vaccine: 'Hib - Dose 2 of 4', protection: 'Haemophilus influenzae type b', weeks: 0, months: 4 },
      { age: '4 months', vaccine: 'PCV13 - Dose 2 of 4', protection: 'Pneumococcal disease', weeks: 0, months: 4 },
      { age: '4 months', vaccine: 'Rotavirus - Dose 2 of 3', protection: 'Rotavirus', weeks: 0, months: 4 },
      { age: '6 months', vaccine: 'DTaP - Dose 3 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 6 },
      { age: '6 months', vaccine: 'Hib - Dose 3 of 4', protection: 'Haemophilus influenzae type b', weeks: 0, months: 6 },
      { age: '6 months', vaccine: 'PCV13 - Dose 3 of 4', protection: 'Pneumococcal disease', weeks: 0, months: 6 },
      { age: '6 months', vaccine: 'Rotavirus - Dose 3 of 3', protection: 'Rotavirus', weeks: 0, months: 6 },
      { age: '12 months', vaccine: 'MMR - Dose 1 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 12 },
      { age: '12 months', vaccine: 'Varicella - Dose 1 of 2', protection: 'Chickenpox', weeks: 0, months: 12 },
      { age: '12 months', vaccine: 'Hib - Dose 4 of 4', protection: 'Haemophilus influenzae type b', weeks: 0, months: 12 },
      { age: '12 months', vaccine: 'PCV13 - Dose 4 of 4', protection: 'Pneumococcal disease', weeks: 0, months: 12 },
      { age: '18 months', vaccine: 'DTaP - Dose 4 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 18 },
      { age: '18 months', vaccine: 'IPV - Dose 3 of 4', protection: 'Polio', weeks: 0, months: 18 },
      { age: '4-6 years', vaccine: 'DTaP - Dose 5 of 5', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 48, rangeMonths: 72 },
      { age: '4-6 years', vaccine: 'IPV - Dose 4 of 4', protection: 'Polio', weeks: 0, months: 48, rangeMonths: 72 },
      { age: '4-6 years', vaccine: 'MMR - Dose 2 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 48, rangeMonths: 72 },
      { age: '4-6 years', vaccine: 'Varicella - Dose 2 of 2', protection: 'Chickenpox', weeks: 0, months: 48, rangeMonths: 72 },
      { age: '9-10 years', vaccine: 'HPV - Dose 1', protection: 'Human Papillomavirus', weeks: 0, months: 108, rangeMonths: 120 },
      { age: '14-16 years', vaccine: 'Tdap - Dose 1', protection: 'Tetanus, Diphtheria, Pertussis', weeks: 0, months: 168, rangeMonths: 192 },
    ],
    AUSTRALIA: [
      { age: 'At Birth', vaccine: 'Hepatitis B - Dose 1 of 3', protection: 'Hepatitis B virus', weeks: 0, months: 0 },
      { age: '2 months', vaccine: '6-in-1 - Dose 1 of 3', protection: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hepatitis B', weeks: 0, months: 2 },
      { age: '2 months', vaccine: 'PCV13 - Dose 1 of 3', protection: 'Pneumococcal disease', weeks: 0, months: 2 },
      { age: '2 months', vaccine: 'Rotavirus - Dose 1 of 2', protection: 'Rotavirus', weeks: 0, months: 2 },
      { age: '4 months', vaccine: '6-in-1 - Dose 2 of 3', protection: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hepatitis B', weeks: 0, months: 4 },
      { age: '4 months', vaccine: 'PCV13 - Dose 2 of 3', protection: 'Pneumococcal disease', weeks: 0, months: 4 },
      { age: '4 months', vaccine: 'Rotavirus - Dose 2 of 2', protection: 'Rotavirus', weeks: 0, months: 4 },
      { age: '6 months', vaccine: '6-in-1 - Dose 3 of 3', protection: 'Diphtheria, Tetanus, Pertussis, Polio, Hib, Hepatitis B', weeks: 0, months: 6 },
      { age: '6 months', vaccine: 'PCV13 - Dose 3 of 3', protection: 'Pneumococcal disease', weeks: 0, months: 6 },
      { age: '12 months', vaccine: 'MMR - Dose 1 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 12 },
      { age: '12 months', vaccine: 'MenACWY - Dose 1', protection: 'Meningococcal A, C, W, Y', weeks: 0, months: 12 },
      { age: '18 months', vaccine: 'MMR - Dose 2 of 2', protection: 'Measles, Mumps, Rubella', weeks: 0, months: 18 },
      { age: '18 months', vaccine: 'DTaP - Booster', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 18 },
      { age: '4 years', vaccine: '4-in-1 - Booster', protection: 'Diphtheria, Tetanus, Pertussis, Polio', weeks: 0, months: 48 },
      { age: '12-13 years', vaccine: 'HPV - Dose 1', protection: 'Human Papillomavirus', weeks: 0, months: 144, rangeMonths: 156 },
      { age: '14-16 years', vaccine: 'dTpa - Booster', protection: 'Diphtheria, Tetanus, Pertussis', weeks: 0, months: 168, rangeMonths: 192 },
      { age: '14-16 years', vaccine: 'MenACWY - Booster', protection: 'Meningococcal A, C, W, Y', weeks: 0, months: 168, rangeMonths: 192 },
    ]
  };

  // Calculate vaccination dates based on DOB
  const calculateDates = (baseDate, weeks = 0, months = 0, rangeMonths = null) => {
    const date = new Date(baseDate);
    if (weeks) date.setDate(date.getDate() + weeks * 7);
    if (months) date.setMonth(date.getMonth() + months);
    
    if (rangeMonths) {
      const endDate = new Date(baseDate);
      endDate.setMonth(endDate.getMonth() + rangeMonths);
      return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-5 font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Immunization Scheduler and Chart</h1>
      
      {!showResults ? (
        <form onSubmit={handleSubmit} className="bg-blue-50 p-8 rounded-lg shadow-md">
          <div className="mb-5">
            <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">Your Child's Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Your Country:</label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="INDIA">INDIA</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="CANADA">CANADA</option>
              <option value="AUSTRALIA">AUSTRALIA</option>
            </select>
          </div>
          
          <div className="mb-5">
            <label htmlFor="childName" className="block text-gray-700 font-bold mb-2">Your Child's Name (Optional)</label>
            <input
              type="text"
              id="childName"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter child's name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200"
          >
            Get Schedule
          </button>
        </form>
      ) : (
        <div className="bg-blue-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Result</h2>
          <p className="mb-6">Following Immunization Schedule is based on recommendation of {country}'s Advisory Committee on Vaccines & Immunization Practices</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold">Child's Age</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold">Vaccine and Dose</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold">Protects Against</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-bold">Recommended Vaccination Date</th>
                </tr>
              </thead>
              <tbody>
                {immunizationSchedules[country].map((vaccine, index) => (
                  <tr key={index} className="even:bg-blue-50 hover:bg-blue-100">
                    <td className="border border-gray-300 px-4 py-2">{vaccine.age}</td>
                    <td className="border border-gray-300 px-4 py-2">{vaccine.vaccine}</td>
                    <td className="border border-gray-300 px-4 py-2">{vaccine.protection}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {calculateDates(dob, vaccine.weeks, vaccine.months, vaccine.rangeMonths)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button 
            onClick={() => setShowResults(false)} 
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200"
          >
            Back to Form
          </button>
        </div>
      )}
    </div>
  );
}