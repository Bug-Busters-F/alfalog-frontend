import React, { useState, useEffect } from "react";
import Brazil from "@react-map/brazil";
import AreaChart from "../components/AreaChart";
import { useGlobalState } from "../context/GlobalYearStateContext";
import YearForm from "./YearForm";
import TransactionTable from "./TransactionTable";
import { BarChart } from "./PathBarChart";
import { useExport } from "../context/ExportContext";
import { processTopUrfs } from "../util/processTopURFs";
import { processTopRoutes } from "../util/processTopRoutes";
import { tradeBalance } from "../api/service/tradeBalance";
import CardSum from "./CardSum";
import { getStatsCard } from "../api/service/getStatsCard";
import {formatarValor} from "../util/formatValor"

const BrazilMapComponent: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [chartKey, setChartKey] = useState(0);
  const [isMapMinimized, setIsMapMinimized] = useState(false);
  const [mostUsedURFSData, setMostUsedURFSData] = useState<any[]>([]);
  const [mostUsedRoutesData, setMostUsedRoutesData] = useState<any[]>([]);
  const [tradeBalanceData, setTradeBalanceData] = useState<any[]>([]);
  const [showTransactionTable, setShowTransactionTable] = useState(1); // Estado para alternar entre os componentes
  const [estatisticas, setEstatisticas] = useState<any | null>(null);

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

  useEffect(() => {
    if (selectedState) {
      const stateId = stateIds[selectedState] || -1;
      const year = Number(selectedYear);

      console.log(`ID do estado ${selectedState}: ${stateId} Ano: ${year}`);

      processTopUrfs(stateId, year, isExport)
        .then((data) => {
          setMostUsedURFSData(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });

      processTopRoutes(stateId, year, isExport)
        .then((data) => {
          setMostUsedRoutesData(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });

      tradeBalance(stateId)
        .then((data) => {
          setTradeBalanceData(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });

      getStatsCard(selectedState, Number(selectedYear), Number(selectedYear))
        .then((data) => {
          setEstatisticas(data)
          console.log(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do CardSum:", error);
        });
    }
    console.log("Modo atual:", isExport ? "Exportação" : "Importação");
  }, [selectedState, selectedYear, isExport]);

  return (
    <div className={`flex flex-col w-full p-2 mb-4 md:p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6`}>
      <h1 className="text-4xl pb-4 font-extrabold leading-none tracking-tight text-gray-800 ">Escolher Estados</h1>
      {isMapMinimized && selectedState && (
        <div className="flex flex-wrap gap-4 pb-5 md:justify-between lg:justify-between sm: justify-center">
          <CardSum titulo='Total de Importações' valor={estatisticas?.numero_total_importacoes?.toLocaleString() || "0"} tipo="" />
          <CardSum titulo='Total de Exportações' valor={estatisticas?.numero_total_exportacoes?.toLocaleString() || "0"} tipo="" />
          <CardSum titulo='Valor total Importado' valor={formatarValor(Number(estatisticas?.valor_agregado_total_importacao_reais)) || "R$ 0"} tipo="R$" />
          <CardSum titulo='Valor total Exportado' valor={formatarValor(Number(estatisticas?.valor_agregado_total_exportacao_reais)) || "R$ 0"} tipo="R$" />
        </div>
      )}
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
                className="bg-sky-900 hover:from-blue-700 hover:bg-sky-700 text-white font-semibold p-2 rounded-lg shadow-lg cursor-pointer"
                style={{ pointerEvents: "auto" }}
              >
                Escolher outro estado ou ano
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
              {selectedState && (
                <div key={`tables-${chartKey}`} className="w-full">
                  <div className="inline-flex rounded-lg overflow-hidden border border-gray-300 mb-4">
                    <button
                      onClick={() => setShowTransactionTable(1)}
                      className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${showTransactionTable === 1 ? "bg-sky-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      Tabela de Transações
                    </button>
                    <button
                      onClick={() => setShowTransactionTable(2)}
                      className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${showTransactionTable === 2 ? "bg-sky-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      Gráfico de Vias
                    </button>
                    <button
                      onClick={() => setShowTransactionTable(3)}
                      className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${showTransactionTable === 3 ? "bg-sky-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      Gráfico de URFs
                    </button>
                    <button
                      onClick={() => setShowTransactionTable(4)}
                      className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${showTransactionTable === 4 ? "bg-sky-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      Balança Comercial
                    </button>
                  </div>

                  <div className="w-full overflow-x-auto">
                    {showTransactionTable === 1 ? (
                      <TransactionTable isExport={isExport} uf_id={stateIds[selectedState] || -1} ano={Number(selectedYear)} />
                    ) : showTransactionTable === 2 ? (
                      <BarChart data={mostUsedRoutesData} />
                    ) : showTransactionTable === 3 ? (
                      <BarChart data={mostUsedURFSData} />
                    ) : (
                      <AreaChart data={tradeBalanceData} />
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
