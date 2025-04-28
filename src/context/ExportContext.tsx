import { createContext, ReactNode, useContext, useState } from "react"

interface ExportContextType{
    isExport: boolean
    setIsExport: React.Dispatch<React.SetStateAction<boolean>>
}

const ExportContext = createContext<ExportContextType | undefined>(undefined)

export const ExportContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isExport, setIsExport] = useState<boolean>(true);

  return (
    <ExportContext.Provider value={{ isExport, setIsExport }}>
      {children}
    </ExportContext.Provider>
  );
};

export const useExport = (): ExportContextType => {
  const context = useContext(ExportContext);
  if (!context) {
    throw new Error('useGlobalState deve ser usado dentro de um ExportContextProvider');
  }
  return context;
};
