import React, { useState, useEffect } from "react";
import CustomYearForm from "./GenericYearForm";

interface YearRangeSelectorProps {
  isStateSelected: boolean;

  startYear: string;
  setStartYear: (year: string) => void;
  endYear: string;
  setEndYear: (year: string) => void;
  isRangeMode: boolean;
  setIsRangeMode: (mode: boolean) => void;
  allAvailableYears: string[];
}

const YearRangeSelector: React.FC<YearRangeSelectorProps> = ({
  isStateSelected,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
  isRangeMode,
  setIsRangeMode,
  allAvailableYears,
}) => {
  useEffect(() => {
    if (!isRangeMode) {
      if (endYear !== startYear) {
        setEndYear(startYear);
      }
    }
  }, [startYear, isRangeMode, setEndYear]);

  useEffect(() => {
    if (isRangeMode) {
      if (startYear && endYear) {
        const start = parseInt(startYear);
        const end = parseInt(endYear);
        if (start > end) {
          setEndYear(startYear);
        } else if (end < start) {
          setStartYear(endYear);
        }
      }
    }
  }, [startYear, endYear, isRangeMode, setStartYear, setEndYear]);

  const handleStartYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStartYear = e.target.value;
    setStartYear(newStartYear);
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEndYear = e.target.value;
    setEndYear(newEndYear);
  };

  const toggleRangeMode = () => {
    const newMode = !isRangeMode;
    setIsRangeMode(newMode);
  };

  const getDisabledYearsForStart = (): string[] => {
    if (!isRangeMode || !endYear) return [];
    return allAvailableYears.filter(
      (year) => parseInt(year) > parseInt(endYear)
    );
  };

  const getDisabledYearsForEnd = (): string[] => {
    if (!startYear) return [];
    return allAvailableYears.filter(
      (year) => parseInt(year) < parseInt(startYear)
    );
  };

  const displaySelectedPeriod = () => {
    if (!startYear) return "Nenhum período selecionado";

    if (!isRangeMode || startYear === endYear || !endYear) {
      return startYear;
    }

    const displayStart = parseInt(startYear);
    const displayEnd = parseInt(endYear);

    if (displayStart > displayEnd) {
      return `${endYear} até ${startYear}`;
    }

    return `${startYear} até ${endYear}`;
  };

  return (
    <div className="p-4 space-y-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      {/* The condition `!isStateSelected` determines when the selector is shown */}
      {/* If you want the user to select a year range *before* selecting a state, keep this condition */}
      {/* If you want the user to select a range *after* selecting a state (e.g., for time series data), remove or change this condition */}
      {!isStateSelected && (
        <>
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              id="rangeModeToggle"
              checked={isRangeMode}
              onChange={toggleRangeMode}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            />
            <label
              htmlFor="rangeModeToggle"
              className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
            >
              Selecionar intervalo de anos
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-end">
            {/* Formulário para Ano Inicial/Único */}
            <CustomYearForm
              id="startYear"
              label={isRangeMode ? "Ano Inicial" : "Ano"}
              selectedValue={startYear}
              onChange={handleStartYearChange}
              years={allAvailableYears}
              getDisabledYears={
                isRangeMode ? getDisabledYearsForStart : () => []
              }
            />
            {/* Formulário para Ano Final (mostrado apenas no modo intervalo) */}
            {isRangeMode && (
              <>
                <span className="text-gray-700 dark:text-gray-300 pb-2.5 hidden sm:block">
                  até
                </span>
                <CustomYearForm
                  id="endYear"
                  label="Ano Final"
                  selectedValue={endYear}
                  onChange={handleEndYearChange}
                  years={allAvailableYears}
                  getDisabledYears={getDisabledYearsForEnd}
                />
              </>
            )}
          </div>
        </>
      )}

      {/* Exibição do período selecionado - Can be shown regardless of isStateSelected */}
      <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-md font-semibold text-gray-900 dark:text-white">
          Período:{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {displaySelectedPeriod()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default YearRangeSelector;
