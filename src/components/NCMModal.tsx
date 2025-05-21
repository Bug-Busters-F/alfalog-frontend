import React, { useEffect, useState } from "react";
import NCMBarChart from "./NCMGraph/TopUFs";
import { getFormattedSearchGraph, searchGraphResponseFormatted } from "../util/processSearchGraphData";
import { useExport } from "../context/ExportContext";
import { tradeBalanceNCM, Result } from "../api/service/tradeBalanceNCM";
import AreaChart from "./AreaChart";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ncm: string;
}

const NCMModal: React.FC<ModalProps> = ({ isOpen, onClose, ncm }) => {
  const [showTransactionTable, setShowTransactionTable] = useState(1);

  // Filtros de Ano
  const anos = Array.from({ length: 11 }, (_, i) => (2024 - i).toString());
  const [anoInicial, setAnoInicial] = useState("2024");
  const [anoFinal, setAnoFinal] = useState("2024");
  const [data, setData] = useState<searchGraphResponseFormatted | null>(null);
  const [dataTradeBalance, setDataTradeBalance] = useState<Result[]>();
  const { isExport } = useExport();

  const anosFinaisDisponiveis = anos.filter((ano) => parseInt(ano) >= parseInt(anoInicial));

  useEffect(() => {
    getFormattedSearchGraph(isExport, ncm, parseInt(anoInicial), parseInt(anoFinal)).then((formattedDate) => {
      setData(formattedDate)
    }).catch((error) => {
      console.error("Erro ao buscar os dados dos gráficos:", error);
    });

    tradeBalanceNCM(parseInt(ncm)).then((data) => {
      setDataTradeBalance(data)
    }).catch((error) => {
      console.error("Erro ao buscar os dados dos gráficos:", error);
    })
  }, [isExport, anoInicial, anoFinal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-sky-900 rounded-lg shadow-lg w-full max-w-5xl max-h-screen overflow-hidden mx-4 sm:mx-auto text-white transform animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl hover:text-gray-300"
        >
          ✕
        </button>

        <div className="p-6 overflow-hidden">
          <h2 className="text-xl font-bold mb-4">
            Gráfico para o NCM: {ncm}
          </h2>

          <div className="bg-white text-black p-5 rounded-md overflow-hidden">
            {/* Botões de seleção */}
            <div className="overflow-x-auto mb-4">
              <div className="inline-flex rounded-lg border border-gray-300">
                {[
                  "Principais UFs (Importação/Exportação)",
                  "Vias de Transporte Mais Utilizadas",
                  "URFs Mais Utilizadas",
                  "Principais Países (Importação/Exportação)",
                  "Balança Comercial",
                ].map((label, index) => (
                  <button
                    key={index}
                    onClick={() => setShowTransactionTable(index + 1)}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${showTransactionTable === index + 1
                      ? "bg-sky-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtros de Ano */}
            {[1, 2, 3, 4].includes(showTransactionTable) && (
              <div className="flex gap-6 flex-wrap mb-4">
                {/* Ano Inicial */}
                <div className="flex flex-col">
                  <label className="text-sky-900 font-semibold mb-1">
                    Ano Inicial
                  </label>
                  <select
                    className="border border-sky-900 rounded-md px-3 py-1 text-sky-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-sm w-40"
                    value={anoInicial}
                    onChange={(e) => {
                      const novoAnoInicial = e.target.value;
                      setAnoInicial(novoAnoInicial);
                      if (parseInt(anoFinal) < parseInt(novoAnoInicial)) {
                        setAnoFinal(novoAnoInicial);
                      }
                    }}
                  >
                    {anos.map((ano) => (
                      <option key={ano} value={ano}>
                        {ano}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ano Final */}
                <div className="flex flex-col">
                  <label className="text-sky-900 font-semibold mb-1">
                    Ano Final
                  </label>
                  <select
                    className="border border-sky-900 rounded-md px-3 py-1 text-sky-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-sm w-40"
                    value={anoFinal}
                    onChange={(e) => setAnoFinal(e.target.value)}
                  >
                    {anosFinaisDisponiveis.map((ano) => (
                      <option key={ano} value={ano}>
                        {ano}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Conteúdo com gráfico */}
            <div className="w-full max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-transparent">
              {showTransactionTable === 1 ? (
                (data?.por_estado?.length ?? 0) > 0 ? (
                  <NCMBarChart data={data?.por_estado ?? []} />
                ) : (
                  <div className="text-gray-700 text-center p-4">
                    Nenhum dado de {isExport ? "exportação" : "importação"} disponível para esse NCM.
                  </div>
                )
              ) : showTransactionTable === 2 ? (
                (data?.por_via?.length ?? 0) > 0 ? (
                  <NCMBarChart data={data?.por_via ?? []} />
                ) : (
                  <div className="text-gray-700 text-center p-4">
                    Nenhum dado de {isExport ? "exportação" : "importação"} disponível para esse NCM.
                  </div>
                )
              ) : showTransactionTable === 3 ? (
                (data?.por_urf?.length ?? 0) > 0 ? (
                  <NCMBarChart data={data?.por_urf ?? []} />
                ) : (
                  <div className="text-gray-700 text-center p-4">
                    Nenhum dado de {isExport ? "exportação" : "importação"} disponível para esse NCM.
                  </div>
                )
              ) : showTransactionTable === 4 ? (
                (data?.por_pais?.length ?? 0) > 0 ? (
                  <NCMBarChart data={data?.por_pais ?? []} />
                ) : (
                  <div className="text-gray-700 text-center p-4">
                    Nenhum dado de {isExport ? "exportação" : "importação"} disponível para esse NCM.
                  </div>
                )
              ) : showTransactionTable === 5 ? (
                <AreaChart data={dataTradeBalance ?? []} />
              ) : (
                <div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NCMModal;
