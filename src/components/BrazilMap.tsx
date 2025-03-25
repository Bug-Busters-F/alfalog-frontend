import React, { useState } from "react";
import Brazil from "@react-map/brazil";
import AreaChart from "../components/AreaChart";
import ExportValueAddedTable from "./ExportValueAddedTable";
import TableOfMainExportCargoes from "./TableOfMainExportCargoes";

const BrazilMapComponent: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [chartKey, setChartKey] = useState(0);
  const [isMapMinimized, setIsMapMinimized] = useState(false);

  const handleSelect = (state: string | null) => {
    if (state && !isMapMinimized) { 
      setSelectedState(state);
      setChartKey((prevKey) => prevKey + 1);
      setIsMapMinimized(true);
    }
  };

  const toggleMapSize = () => {
    setIsMapMinimized(!isMapMinimized)
    if (!isMapMinimized) {
      setSelectedState(null)
    }
  }
  const data = [
    { year: 123, value: 21 },
    { year: 124, value: 30 },
    { year: 125, value: 50 },
    { year: 126, value: 10 },
  ]

  const testData2 = [
    { ncm: "2701.12.00", nome: "Carvão Mineral", peso: 50000 },
    { ncm: "1005.90.10", nome: "Milho em Grãos", peso: 60000 },
    { ncm: "2709.00.10", nome: "Óleo Bruto de Petróleo", peso: 80000 },
    { ncm: "2601.12.00", nome: "Minério de Ferro", peso: 120000 },
    { ncm: "8701.90.00", nome: "Tratores Agrícolas", peso: 15000 },
    { ncm: "4407.10.00", nome: "Madeira Serrada", peso: 30000 },
    { ncm: "1201.90.10", nome: "Soja em Grãos", peso: 70000 },
    { ncm: "7308.90.10", nome: "Estruturas de Aço", peso: 40000 },
    { ncm: "1511.90.00", nome: "Óleo de Palma", peso: 45000 },
    { ncm: "3901.10.10", nome: "Polietileno", peso: 25000 },
  ]

  const testData = [
    { ncm: "1001.90.10", nome: "Trigo em grãos", pais: "Argentina", via: "Marítima", valor: 50000 },
    { ncm: "2709.00.10", nome: "Óleo de petróleo", pais: "Estados Unidos", via: "Rodoviária", valor: 150000 },
    { ncm: "8703.23.10", nome: "Carro Elétrico", pais: "Alemanha", via: "Aérea", valor: 350000 },
    { ncm: "8542.39.10", nome: "Microprocessador", pais: "China", via: "Marítima", valor: 120000 },
    { ncm: "6403.91.10", nome: "Calçado esportivo", pais: "Vietnã", via: "Aérea", valor: 25000 },
    { ncm: "3923.30.90", nome: "Embalagem plástica", pais: "México", via: "Rodoviária", valor: 10000 },
    { ncm: "2106.90.10", nome: "Suplemento alimentar", pais: "Estados Unidos", via: "Aérea", valor: 75000 },
    { ncm: "8708.29.90", nome: "Peça automotiva", pais: "Japão", via: "Marítima", valor: 95000 },
    { ncm: "9403.20.10", nome: "Móveis de madeira", pais: "Canadá", via: "Rodoviária", valor: 60000 },
    { ncm: "3004.90.10", nome: "Medicamento", pais: "França", via: "Aérea", valor: 200000 }
  ]

  return (
    <div className="flex flex-col w-full h-full p-2 md:p-4 lg:p-6">
      <div className={`flex flex-col ${isMapMinimized ? "lg:flex-row" : ""} gap-4 w-full`}
      >
        <div className={`relative transition-all duration-200 ${isMapMinimized ? "w-full sm:w-64 md:w-72 lg:w-80 h-auto cursor-default" : "w-full max-w-2xl mx-auto"}`}style={{ pointerEvents: isMapMinimized ? 'none' : 'auto' }}>
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
            <button onClick={toggleMapSize} className="mt-2 px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 mx-auto block" style={{ pointerEvents: 'auto' }}>
              Clique Para Escolher outro estado
            </button>
          )}
        </div>

        {isMapMinimized && selectedState && (
          <div className="flex-1 min-w-0 ">
            <h3 className="text-lg font-semibold mb-2">
              Dados do estado: {selectedState}
            </h3>
            <div className="h-114 w-full">
              <AreaChart data={data} />
            </div>
          </div>
        )}
      </div>

      {/* grafico e tabela abaixo do mapa */}
      <div className={`${isMapMinimized ? "mt-4" : "mt-6"} w-full`}>
        {/* mostrar o grafico quando n esta minimizado o mapa */}
        {selectedState && !isMapMinimized && (
          <div key={chartKey} className="w-full mb-6 p-4  ">
            <h3 className="text-xl font-bold mb-4">
              Dados do estado: {selectedState}
            </h3>
            <div className="h-114 w-full">
              <AreaChart data={data} />
            </div>
          </div>
        )}

        {/* Tabelas */}
        {selectedState && (
          <div key={`tables-${chartKey}`} className="w-full">
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="w-full lg:w-1/2">
                <div className="rounded-lg h-full shadow">
                  <ExportValueAddedTable data={testData} />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="rounded-lg h-full">
                  <TableOfMainExportCargoes data={testData2} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrazilMapComponent