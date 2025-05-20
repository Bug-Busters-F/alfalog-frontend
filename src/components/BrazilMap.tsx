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
  const [startYear, setStartYear] = useState<string>(allAvailableYears[0] || "");
  const [endYear, setEndYear] = useState<string>(allAvailableYears[0] || "");
  const [isRangeMode, setIsRangeMode] = useState<boolean>(false);

  // const { selectedYear } = useGlobalState(); // Remova se não for mais usado para o ano
  const stateIds = JSON.parse(localStorage.getItem("UFs") || "{}");
  const { isExport } = useExport();

  const handleSelect = (state: string | null) => {
    if (state && !isMapMinimized) {
      setSelectedState(state);

      // NÃO RESETE OS ANOS AQUI.
      // O YearRangeSelector já gerencia o startYear, endYear e isRangeMode.
      // Se você resetar aqui, ele sobrescreve a seleção do usuário.
      // setStartYear(allAvailableYears[0] || "");
      // setEndYear(allAvailableYears[0] || "");
      // setIsRangeMode(false);

      setShowTransactionTable(1);
      setChartKey((prevKey) => prevKey + 1); // Pode precisar reavaliar se este key é útil com range
      setIsMapMinimized(true);
    }
  };

  const resetMapAndState = () => {
    setIsMapMinimized(false);
    setSelectedState(null);
    // Opcional: Você PODE querer resetar os anos AQUI se o mapa voltar ao estado inicial
    // setStartYear(allAvailableYears[0] || "");
    // setEndYear(allAvailableYears[0] || "");
    // setIsRangeMode(false);
  };

  // useEffect para buscar dados
  useEffect(() => {
    // Log para depurar quando o efeito é disparado
    console.log("useEffect triggered", { selectedState, startYear, endYear, isRangeMode, isExport });

    // Só busca dados se um estado for selecionado E os anos estiverem definidos
    if (selectedState && startYear && endYear) {
      const stateId = stateIds[selectedState] || -1;

      // Lógica para determinar year_start e year_end numéricos
      let year_start_num: number;
      let year_end_num: number;

      // Garante que os anos sejam números válidos antes de parseInt
       const startYearInt = parseInt(startYear);
       const endYearInt = parseInt(endYear);

       // Validação adicional: Garante que startYearInt e endYearInt são números
       if (isNaN(startYearInt) || isNaN(endYearInt)) {
           console.error("Anos inválidos:", startYear, endYear);
           // Opcional: Limpar dados ou mostrar erro
           setMostUsedURFSData([]);
           setMostUsedRoutesData([]);
           setTradeBalanceData([]);
           return; // Sai do useEffect
       }


      if (isRangeMode) {
        year_start_num = startYearInt;
        year_end_num = endYearInt;
         // Garante a ordem correta, caso a lógica no YearRangeSelector falhe por algum motivo
         if (year_start_num > year_end_num) {
             [year_start_num, year_end_num] = [year_end_num, year_start_num];
         }
      } else {
        // No modo single, startYear e endYear devem ser o mesmo ano
        year_start_num = startYearInt;
        year_end_num = startYearInt; // Use startYearInt ou endYearInt
      }


      console.log(
        `Workspaceing data for State ID: ${stateId}, Years: ${year_start_num} - ${year_end_num}, Mode: ${
          isExport ? "Export" : "Import"
        }`
      );

      // Verifique se stateId é válido antes de chamar as APIs
       if (stateId !== -1) {
            // Chame suas funções API passando year_start_num e year_end_num
            processTopUrfs(stateId, year_start_num, year_end_num, isExport)
                .then((data) => {
                  setMostUsedURFSData(data);
                })
                .catch((error) => {
                  console.error("Erro ao buscar os dados de URFs:", error);
                  setMostUsedURFSData([]);
                });

            processTopRoutes(stateId, year_start_num, year_end_num, isExport)
                .then((data) => {
                  setMostUsedRoutesData(data);
                })
                .catch((error) => {
                  console.error("Erro ao buscar os dados de Rotas:", error);
                  setMostUsedRoutesData([]);
                });

             // Adapte tradeBalance se precisar receber o range também
             tradeBalance(stateId) // <-- Passe os anos aqui
                .then((data) => {
                  setTradeBalanceData(data); // Data para balanço comercial em range deve ser time series
                })
                .catch((error) => {
                  console.error("Erro ao buscar os dados de Balança Comercial:", error);
                  setTradeBalanceData([]);
                });
       } else {
            console.warn(`State ID not found for ${selectedState}`);
            setMostUsedURFSData([]);
            setMostUsedRoutesData([]);
            setTradeBalanceData([]);
       }


    } else {
      // Limpar dados se nenhum estado for selecionado ou anos não estiverem definidos
       console.log("Conditions not met for fetching data", { selectedState, startYear, endYear });
      setMostUsedURFSData([]);
      setMostUsedRoutesData([]);
      setTradeBalanceData([]);
    }

    console.log("Modo atual:", isExport ? "Exportação" : "Importação");

  // ADICIONE startYear, endYear, isRangeMode e isExport às dependências
  }, [selectedState]); // Inclua stateIds se ele puder mudar

  return (
    <div
      className={`flex flex-col w-full p-2 mb-4 md:p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6`}
    >
      <h1 className="text-4xl pb-4 font-extrabold leading-none tracking-tight text-gray-800 ">
        {selectedState ? `Dados de ${selectedState}` : "Escolher Estados"}
      </h1>

      {/* Passe os estados e setters do YearRangeSelector */}
      <YearRangeSelector
        isStateSelected={selectedState !== null} // Controla a visibilidade do selector
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
        isRangeMode={isRangeMode}
        setIsRangeMode={setIsRangeMode}
        allAvailableYears={allAvailableYears}
      />

      {/* Restante do JSX */}
      <div
        className={`flex flex-col ${
          isMapMinimized ? "lg:flex-row" : ""
        } gap-4 w-full mt-6`}
      >
        {/* ... Mapa ... */}
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
            {isMapMinimized &&
              selectedState && (
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
                {/* Botões de Navegação */}
                {/* ... */}

                <div className="w-full overflow-x-auto">
                  {" "}
                  {/* Pass the year range down to your display components if they need it */}
                  {showTransactionTable === 1 ? (
                    <TransactionTable
                      isExport={isExport}
                      uf_id={stateIds[selectedState] || -1}
                      ano={Number(startYear)}
                    />
                  ) : showTransactionTable === 2 ? (
                    <BarChart data={mostUsedRoutesData} /> // Data já deve ser agregada pelo range
                  ) : showTransactionTable === 3 ? (
                    <BarChart data={mostUsedURFSData} /> // Data já deve ser agregada pelo range
                  ) : (
                    <AreaChart data={tradeBalanceData} /> // Data já deve ser a time series para o range
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
