import React, { useEffect, useState } from "react";
import Brazil from "@react-map/brazil";
import AreaChart from "../components/AreaChart";
import ExportValueAddedTable from "./ExportValueAddedTable";
import TableOfMainExportCargoes from "./TableOfMainExportCargoes";
import { useGlobalState } from "../context/GlobalYearStateContext";
import { getFormattedDataForAddedValuesTable } from "../util/formattedData";
import { getFormattedDataForMovedCargo } from "../util/formattedData";

const BrazilMapComponent: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [chartKey, setChartKey] = useState(0);
  const [isMapMinimized, setIsMapMinimized] = useState(false);
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [movedCargoData, setMovedCargoData] = useState<any[]>([]);

  const { selectedYear } = useGlobalState();

  const stateIds: { [key: string]: number } = {
    "Acre": 1,
    "Amazonas": 2,
    "Roraima": 3,
    "Pará": 4,
    "Amapá": 5,
    "Tocantins": 6,
    "Maranhão": 7,
    "Piauí": 8,
    "Ceará": 9,
    "Rio Grande do Norte": 10,
    "Paraíba": 11,
    "Pernambuco": 12,
    "Alagoas": 13,
    "Sergipe": 14,
    "Bahia": 15,
    "Minas Gerais": 16,
    "Espírito Santo": 17,
    "Rio de Janeiro": 18,
    "São Paulo": 19,
    "Paraná": 20,
    "Santa Catarina": 21,
    "Rio Grande do Sul": 22,
    "Mato Grosso": 23,
    "Goiás": 24,
    "Distrito Federal": 25,
    "Mato Grosso do Sul": 26,
    "Exterior": 27,
    "Consumo de Bordo": 28,
    "Mercadoria Nacionalizada": 29,
    "Reexportação": 30,
    "Estados Diversos - Café": 31,
    "Não Declarada": 32,
    "Zona Não Declarada": 33,
    "Rondônia": 34,
  };

  const handleSelect = (state: string | null) => {
    if (state && !isMapMinimized) {
      setSelectedState(state);
      setChartKey((prevKey) => prevKey + 1);
      setIsMapMinimized(true);
    }
  };

  const toggleMapSize = () => {
    setIsMapMinimized(!isMapMinimized);
    setSelectedState(null);
  };

  const data = [
    { year: 123, value: 21 },
    { year: 124, value: 30 },
    { year: 125, value: 50 },
    { year: 126, value: 10 },
  ];

  useEffect(() => {
    if (selectedState) {
      const stateId = stateIds[selectedState] || -1;
      const year = Number(selectedYear); 
  
      console.log(`ID do estado ${selectedState}: ${stateId} Ano: ${year}`);
    
      
      getFormattedDataForAddedValuesTable(stateId, year)
        .then((data) => {
          console.log(data)
          setFormattedData(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });

      
      getFormattedDataForMovedCargo(stateId, year)
        .then((cargoData) => {
          console.log(cargoData)
          setMovedCargoData(cargoData);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados de carga movimentada:", error);
        });
    }
  }, [selectedState, selectedYear]);

  return (
    <div className={`flex flex-col w-full p-2 mb-4 md:p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6`}>
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-800 ">Escolher Estados</h1>
      <div className={`flex flex-col items-center ${isMapMinimized ? "lg:flex-row" : ""} gap-4 w-full`}>
        <div
          className={`relative transition-all duration-200 ${isMapMinimized ? "w-full sm:w-64 md:w-72 lg:w-80 h-auto cursor-default" : "w-full max-w-2xl mx-auto"}`}
          style={{ pointerEvents: isMapMinimized ? "none" : "auto" }}
        >
          <div className="flex flex-col gap-6">
            <Brazil
              type="select-single"
              size={isMapMinimized ? 300 : Math.min(window.innerWidth * 0.8, 600)}
              mapColor="#B4DCFB"
              strokeColor="#000"
              strokeWidth={0.7}
              hoverColor="oklch(0.685 0.169 237.323)"
              selectColor="oklch(0.391 0.09 240.876)"
              hints={true}
              hintTextColor="white"
              hintBackgroundColor="oklch(0.391 0.09 240.876)"
              onSelect={handleSelect}
            />
            {isMapMinimized && (
              <button
                onClick={toggleMapSize}
                className="bg-sky-900 hover:from-blue-700 hover:bg-sky-700 text-white font-semibold py-2  rounded-lg shadow-lg"
                style={{ pointerEvents: "auto" }}
              >
                Clique Para Escolher outro estado
              </button>
            )}
          </div>
        </div>

        {isMapMinimized && selectedState && (
          <div className="flex-1 min-w-0 ">
            <h3 className="text-lg font-semibold mb-2">Dados do estado: {selectedState}</h3>
            <div className="h-114 w-full">
              <AreaChart data={data} />
            </div>
          </div>
        )}
      </div>

      <div className={`${isMapMinimized ? "mt-4" : "mt-6"} w-full`}>
        {selectedState && !isMapMinimized && (
          <div key={chartKey} className="w-full mb-6 p-4  ">
            <h3 className="text-xl font-bold mb-4">Dados do estado: {selectedState}</h3>
            <div className="h-114 w-full">
              <AreaChart data={data} />
            </div>
          </div>
        )}

        {selectedState && formattedData.length > 0 && (
          <div key={`tables-${chartKey}`} className="w-full">
            <div className="flex flex-col lg:flex-row gap-4 w-full pt-4">
              <div className="w-full lg:w-1/2">
                <div className="rounded-lg h-full shadow">
                  <ExportValueAddedTable data={formattedData} />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="rounded-lg h-full">
                  <TableOfMainExportCargoes data={movedCargoData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrazilMapComponent;
