import React, { useState, useEffect } from "react";
import Brazil from "@react-map/brazil";
import AreaChart from "../components/AreaChart";
// import { useGlobalState } from "../context/GlobalYearStateContext"; // Provavelmente não é mais necessário
import TransactionTable from "./TransactionTable";
import { BarChart } from "./PathBarChart";
import { useExport } from "../context/ExportContext";
import { processTopUrfs } from "../util/processTopURFs";
import { processTopRoutes } from "../util/processTopRoutes";
import { tradeBalance } from "../api/service/tradeBalance";
import YearRangeSelector from "./YearRangeSelect"; // Verifique o caminho

const allAvailableYears = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
].sort((a, b) => parseInt(b) - parseInt(a));

const BrazilMapComponent: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [chartKey, setChartKey] = useState(0); // Pode precisar reavaliar se este key é útil com range
  const [isMapMinimized, setIsMapMinimized] = useState(false);
  const [mostUsedURFSData, setMostUsedURFSData] = useState<any[]>([]);
  const [mostUsedRoutesData, setMostUsedRoutesData] = useState<any[]>([]);
  const [tradeBalanceData, setTradeBalanceData] = useState<any[]>([]);
  const [showTransactionTable, setShowTransactionTable] = useState(1);

  // Estados levantados do YearRangeSelector
  const [startYear, setStartYear] = useState<string>(
    allAvailableYears[0] || ""
  );
  const [endYear, setEndYear] = useState<string>(allAvailableYears[0] || "");
  const [isRangeMode, setIsRangeMode] = useState<boolean>(false);

  // const { selectedYear } = useGlobalState(); // Remova se não for mais usado para o ano
  const stateIds = JSON.parse(localStorage.getItem("UFs") || "{}");
  const { isExport } = useExport();

  const handleSelect = (state: string | null) => {
    if (state && !isMapMinimized) {
      setSelectedState(state);
      setChartKey((prevKey) => prevKey + 1);
      setIsMapMinimized(true);
    }
  };

  const resetMapAndState = () => {
    setIsMapMinimized(false);
    setSelectedState(null);
    setStartYear(allAvailableYears[0] || "");
    setEndYear(allAvailableYears[0] || "");
    setIsRangeMode(false);
  };

  useEffect(() => {
    if (selectedState && startYear && endYear) {
      const stateId = stateIds[selectedState] || -1;

      let year_start_num: number;
      let year_end_num: number;

      const startYearInt = parseInt(startYear);
      const endYearInt = parseInt(endYear);

      if (isNaN(startYearInt) || isNaN(endYearInt)) {
        console.error("Anos inválidos:", startYear, endYear);
        setMostUsedURFSData([]);
        setMostUsedRoutesData([]);
        setTradeBalanceData([]);
        return;
      }

      if (isRangeMode) {
        year_start_num = startYearInt;
        year_end_num = endYearInt;
        if (year_start_num > year_end_num) {
          [year_start_num, year_end_num] = [year_end_num, year_start_num];
        }
      } else {
        year_start_num = startYearInt;
        year_end_num = startYearInt; 
      }

      if (stateId !== -1) {
        processTopUrfs(stateId, year_start_num, year_end_num, isExport) // Mudar ROTA para mandar mais de um estado startYear && endYear ****
          .then((data) => {
            setMostUsedURFSData(data);
          })
          .catch((error) => {
            console.error("Erro ao buscar os dados de URFs:", error);
            setMostUsedURFSData([]);
          });

        processTopRoutes(stateId, year_start_num, year_end_num, isExport) // Mudar ROTA para mandar mais de um estado startYear && endYear *****
          .then((data) => {
            setMostUsedRoutesData(data);
          })
          .catch((error) => {
            console.error("Erro ao buscar os dados de Rotas:", error);
            setMostUsedRoutesData([]);
          });

        tradeBalance(stateId)
          .then((data) => {
            setTradeBalanceData(data);
          })
          .catch((error) => {
            console.error(
              "Erro ao buscar os dados de Balança Comercial:",
              error
            );
            setTradeBalanceData([]);
          });
      } else {
        setMostUsedURFSData([]);
        setMostUsedRoutesData([]);
        setTradeBalanceData([]);
      }
    } else {
      setMostUsedURFSData([]);
      setMostUsedRoutesData([]);
      setTradeBalanceData([]);
    }
  }, [selectedState, isExport, startYear, endYear]);

  return (
    <div
      className={`flex flex-col w-full p-2 mb-4 md:p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6`}
    >
      <h1 className="text-4xl pb-4 font-extrabold leading-none tracking-tight text-gray-800 ">
        {selectedState ? `Dados de ${selectedState}` : "Escolher Estados"}
      </h1>

      <YearRangeSelector
        isStateSelected={selectedState !== null}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
        isRangeMode={isRangeMode}
        setIsRangeMode={setIsRangeMode}
        allAvailableYears={allAvailableYears}
      />
      <div
        className={`flex flex-col ${
          isMapMinimized ? "lg:flex-row" : ""
        } gap-4 w-full mt-6`}
      >
        <div
          className={`relative transition-all duration-200 ${
            isMapMinimized
              ? "w-full sm:w-64 md:w-72 lg:w-80 h-auto cursor-default flex-shrink-0"
              : "w-full max-w-2xl mx-auto"
          }`}
          style={{ pointerEvents: isMapMinimized ? "none" : "auto" }}
        >
          <div className="flex flex-col gap-6">
            <Brazil
              type="select-single"
              size={
                isMapMinimized ? 300 : Math.min(window.innerWidth * 0.8, 700)
              }
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
            {isMapMinimized && selectedState && (
              <button
                onClick={resetMapAndState}
                className="bg-sky-900 hover:from-blue-700 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg shadow-lg"
                style={{ pointerEvents: "auto" }}
              >
                Clique Para Escolher outro estado
              </button>
            )}
            {!isMapMinimized && (
              <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                Clique em um estado no mapa para ver os detalhes.
              </p>
            )}
          </div>
        </div>
        {/* ... Tabelas e Gráficos ... */}
        {isMapMinimized && selectedState && (
          <div className="flex flex-col w-full gap-4">
            <div className="w-full overflow-x-auto">
              <div key={`tables-${chartKey}`} className="w-full">
                <div className="inline-flex rounded-lg overflow-hidden border border-gray-300 mb-4">
                  <button
                    onClick={() => setShowTransactionTable(1)}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                      showTransactionTable === 1
                        ? "bg-sky-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Tabela de Transações
                  </button>
                  <button
                    onClick={() => setShowTransactionTable(2)}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                      showTransactionTable === 2
                        ? "bg-sky-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Gráfico de Vias
                  </button>
                  <button
                    onClick={() => setShowTransactionTable(3)}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                      showTransactionTable === 3
                        ? "bg-sky-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Gráfico de URFs
                  </button>
                  <button
                    onClick={() => setShowTransactionTable(4)}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                      showTransactionTable === 4
                        ? "bg-sky-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Balança Comercial
                  </button>
                </div>

                <div className="w-full overflow-x-auto">
                  {showTransactionTable === 1 ? (
                    <TransactionTable
                      isExport={isExport}
                      uf_id={stateIds[selectedState] || -1}
                      ano={Number(startYear)} // Mudar para mandar mais de um estado startYear && endYear ****
                    />
                  ) : showTransactionTable === 2 ? (
                    <BarChart data={mostUsedRoutesData} />
                  ) : showTransactionTable === 3 ? (
                    <BarChart data={mostUsedURFSData} />
                  ) : (
                    <AreaChart data={tradeBalanceData} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`${isMapMinimized ? "mt-4" : "mt-6"} w-full`}></div>
    </div>
  );
};

export default BrazilMapComponent;
