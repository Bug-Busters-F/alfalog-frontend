import React from 'react';
import { useGlobalState } from '../context/GlobalYearStateContext';

const YearForm: React.FC = () => {
  const { selectedYear, setSelectedYear } = useGlobalState();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  return (
    <form className="max-w-sm mx-auto">
      <select 
        id="countries" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        value={selectedYear} 
        onChange={handleChange}
      >
        <option value="2024">2024</option>
        
      </select>
    </form>
  );
};

export default YearForm;
