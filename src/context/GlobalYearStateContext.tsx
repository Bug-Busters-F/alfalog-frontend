import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalYearStateContextType {
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalYearStateContext = createContext<GlobalYearStateContextType | undefined>(undefined);

export const GlobalYearStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  return (
    <GlobalYearStateContext.Provider value={{ selectedYear, setSelectedYear }}>
      {children}
    </GlobalYearStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalYearStateContextType => {
  const context = useContext(GlobalYearStateContext);
  if (!context) {
    throw new Error('useGlobalState deve ser usado dentro de um GlobalYearStateProvider');
  }
  return context;
};
