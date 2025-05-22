import React from 'react';

interface CustomYearFormProps {
  id: string;
  label: string;
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  years: string[];
  disabled?: boolean;
  getDisabledYears?: () => string[];
}

const CustomYearForm: React.FC<CustomYearFormProps> = ({
  id,
  label,
  selectedValue,
  onChange,
  years,
  disabled = false,
  getDisabledYears,
}) => {
  const disabledYearsSet = new Set(getDisabledYears ? getDisabledYears() : []);

  return (
    <div className="flex-1"> 
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        value={selectedValue}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">Selecione</option>
        {years.map(year => (
          <option key={year} value={year} disabled={disabledYearsSet.has(year)}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomYearForm;