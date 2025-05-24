import React, { useEffect, useState } from "react";
import { fetchForecastExportData, fetchForecastImportData, fetchForecastTradeBalanceData } from "../api/service/fetchForecastData";
import ForecastChart from "./ForecastChart";


type ForecastType = 1 | 2 | 3; // 1: Balança, 2: Exportações, 3: Importações

const ForecastSelector: React.FC = () => {
    const [selectedForecast, setSelectedForecast] = useState<ForecastType>(1);
    const [forecastData, setForecastData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let data = [];
            if (selectedForecast === 1) {
                data = await fetchForecastTradeBalanceData();
            } else if (selectedForecast === 2) {
                data = await fetchForecastExportData();
            } else if (selectedForecast === 3) {
                data = await fetchForecastImportData();
            }
            setForecastData(data);
        };

        fetchData();
    }, [selectedForecast]);

    return (
        <div className="flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">

            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-800 p-5">
                Previsões
            </h1>

            {/* Botões de troca */}
            <div className="flex  mb-4 ml-2 mr-2">
                <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
                    <button
                        onClick={() => setSelectedForecast(1)}
                        className={`w-48 px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${selectedForecast === 1
                            ? "bg-sky-900 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Balança Comercial
                    </button>
                    <button
                        onClick={() => setSelectedForecast(2)}
                        className={`w-48 px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${selectedForecast === 2
                            ? "bg-sky-900 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Exportações
                    </button>
                    <button
                        onClick={() => setSelectedForecast(3)}
                        className={`w-48 px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${selectedForecast === 3
                            ? "bg-sky-900 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Importações
                    </button>
                </div>
            </div>



            {/* Gráfico */}
            <div className="w-full overflow-x-auto">
                <ForecastChart data={forecastData} forecastType={selectedForecast} />
            </div>
        </div>
    );
};

export default ForecastSelector;
