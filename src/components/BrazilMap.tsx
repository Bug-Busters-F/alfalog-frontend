import React, { useState, useEffect } from "react";
import Brazil from "@react-map/brazil";
import AreaChart from "../components/AreaChart";
import { useGlobalState } from "../context/GlobalYearStateContext";
import { getFormattedDataForAddedValuesTable } from "../util/formattedData";
import YearForm from "./YearForm";
import TransactionTable from "./TransactionTable";
import { BarChart } from "./PathBarChart";
import { useExport } from "../context/ExportContext";
import { processTopUrfs } from "../util/processTopURFs";
import { processTopRoutes } from "../util/processTopRoutes";
import { tradeBalance } from "../api/service/tradeBalance";

const BrazilMapComponent: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [chartKey, setChartKey] = useState(0);
  const [isMapMinimized, setIsMapMinimized] = useState(false);
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [mostUsedURFSData, setMostUsedURFSData] = useState<any []>([])
  const [mostUsedRoutesData, setMostUsedRoutesData] = useState<any []>([])
  const [tradeBalanceData, setTradeBalanceData] = useState<any []>([])
  const [showTransactionTable, setShowTransactionTable] = useState(1); // Estado para alternar entre os componentes

  const { selectedYear } = useGlobalState();
  const stateIds = JSON.parse(localStorage.getItem("UFs") || '{}');

  const { isExport } = useExport();

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

  const handleFilterChange = (type: 'valor' | 'peso') => {
    console.log('Filtro selecionado:', type);
  };

  useEffect(() => {
    if (selectedState) {
      const stateId = stateIds[selectedState] || -1;
      const year = Number(selectedYear);

      console.log(`ID do estado ${selectedState}: ${stateId} Ano: ${year}`);

      getFormattedDataForAddedValuesTable(stateId, year)
        .then((data) => {
          setFormattedData(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });

      processTopUrfs(stateId,year,isExport)
        .then((data) => {
          setMostUsedURFSData(data)
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });

        processTopRoutes(stateId,year,isExport)
        .then((data) => {
          setMostUsedRoutesData(data)
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });

        tradeBalance(stateId)
        .then((data) => {
          setTradeBalanceData(data)
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });


    }
    console.log("Modo atual:", isExport ? "Exportação" : "Importação");
  }, [selectedState, selectedYear,isExport]);



  const dataTest = [
    { ncm: "01012100", nome: "Cavalo puro-sangue para reprodução", pais: "Argentina", via: "Marítima", valor: 250000, peso: 500 },
    { ncm: "02071400", nome: "Cortes de frango congelados", pais: "China", via: "Aérea", valor: 54000, peso: 1200 },
    { ncm: "10063021", nome: "Arroz com casca polido", pais: "Japão", via: "Marítima", valor: 78000, peso: 2000 },
    // Mais dados...
  ];


  return (
    <div className={`flex flex-col w-full p-2 mb-4 md:p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6`}>
      <h1 className="text-4xl pb-4 font-extrabold leading-none tracking-tight text-gray-800 ">Escolher Estados</h1>
      <div className={`flex flex-col items-center ${isMapMinimized ? "lg:flex-row" : ""} gap-4 w-full`}>
        <div
          className={`relative transition-all duration-200 ${isMapMinimized ? "w-full sm:w-64 md:w-72 lg:w-80 h-auto cursor-default" : "w-full max-w-2xl mx-auto"}`}
          style={{ pointerEvents: isMapMinimized ? "none" : "auto" }}
        >
          <div className="flex flex-col gap-6">
            <YearForm />
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
                Clique Para Escolher outro estado ou ano
              </button>
            )}
          </div>
        </div>

        {isMapMinimized && selectedState && (
          <div className="flex flex-col w-full gap-4">
            <h3 className="text-xl font-bold text-gray-800">
              Dados do estado: {selectedState}
            </h3>

            <div className="w-full overflow-x-auto">
              {selectedState && formattedData.length >= 0 && (
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
                      <TransactionTable data={dataTest} onFilterChange={handleFilterChange}/>
                    ) : showTransactionTable === 2 ? (
                      <BarChart data={mostUsedRoutesData} />
                    ) : showTransactionTable === 3 ?(
                      <BarChart data={mostUsedURFSData} />
                    ):(
                      <AreaChart data={tradeBalanceData}/>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={`${isMapMinimized ? "mt-4" : "mt-6"} w-full`}></div>
    </div>
  );
};

export default BrazilMapComponent;
