import { useEffect, useState } from "react";
import ComparationChart from "../components/ComparationChart";
import { getComparationStates } from "../api/service/getComparationStates";
import { useExport } from "../context/ExportContext";
import { tradeBalanceComparacao } from "../api/service/tradeBalance";

const stateIds: { [key: string]: number } = {
  "Rondônia": 1,
  "Acre": 2,
  "Amazonas": 3,
  "Roraima": 4,
  "Pará": 5,
  "Amapá": 6,
  "Tocantins": 7,
  "Maranhão": 8,
  "Piauí": 9,
  "Ceará": 10,
  "Rio Grande do Norte": 11,
  "Paraíba": 12,
  "Pernambuco": 13,
  "Alagoas": 14,
  "Sergipe": 15,
  "Bahia": 16,
  "Minas Gerais": 17,
  "Espírito Santo": 18,
  "Rio de Janeiro": 19,
  "São Paulo": 20,
  "Paraná": 21,
  "Santa Catarina": 22,
  "Rio Grande do Sul": 23,
  "Mato Grosso": 24,
  "Goiás": 25,
  "Distrito Federal": 26,
  "Mato Grosso do Sul": 27
};

interface StateData {
  state: number;
  year: number;
  value: number;
  estadoNome: string;
}

const ComparationStates = () => {
  const { isExport } = useExport();
  const indicadores = ["Valor FOB", "Peso (Kg)", "Balança Comercial"];
  const estados_brasil = Object.keys(stateIds);

  const anos = [
    2014, 2015, 2016, 2017, 2018, 2019,
    2020, 2021, 2022, 2023, 2024
  ];

  const [indicador, setIndicador] = useState("Valor FOB");
  const [estado1, setEstado1] = useState("São Paulo");
  const [estado2, setEstado2] = useState("Rio de Janeiro");
  const [anoInicial, setAnoInicial] = useState("2014");
  const [anoFinal, setAnoFinal] = useState("2024");
  const [dataFiltrada, setDataFiltrada] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setLoading(true);
        setError(null);

        const estado1Id = stateIds[estado1];
        const estado2Id = stateIds[estado2];
        const anoInicialNum = parseInt(anoInicial);
        const anoFinalNum = parseInt(anoFinal);

        if (!estado1Id || !estado2Id) {
          setError("Estados inválidos selecionados");
          return;
        }

        let dadosTransformados: StateData[] = [];

        if (indicador === "Balança Comercial") {
          const response = await tradeBalanceComparacao([estado1Id, estado2Id]);

          dadosTransformados = response.flatMap((estadoData) => {
            const nomeEstado =
              estadoData.uf_id === estado1Id ? estado1 : estado2;
            return estadoData.balanca
              .map((item) => ({
                state: estadoData.uf_id,
                year: item.year,
                value: item.value,
                estadoNome: nomeEstado,
              }));
          });
        } else {
          const response = await getComparationStates(
            {
              estados: [estado1Id, estado2Id],
              ano_inicial: anoInicialNum,
              ano_final: anoFinalNum,
            },
            isExport
          );

          dadosTransformados = response.map((item: any) => ({
            state: item.state,
            year: item.year,
            value: item[indicador] ?? 0,
            estadoNome: item.state === estado1Id ? estado1 : estado2,
          }));
        }
        
        setDataFiltrada(dadosTransformados);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao carregar dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    
    buscarDados();
  }, [estado1, estado2, anoInicial, anoFinal, indicador, isExport]);

  return (
    <div className="flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-800 p-5">
        Comparar Estados
      </h1>

      <div className="flex justify-between items-center flex-wrap h-full">
        <div className="flex items-center">
          <div className="inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Selecione um estado
            </label>
            <select
              value={estado1}
              onChange={(e) => setEstado1(e.target.value)}
              className="block w-[100%] rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              {estados_brasil.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          <div className="relative inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Estado para comparar
            </label>
            <select
              value={estado2}
              onChange={(e) => setEstado2(e.target.value)}
              className="block w-[100%] rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              {estados_brasil.filter(e => e !== estado1).map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <div className=" text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Ano Inicial
            </label>
            <select
              value={anoInicial}
              onChange={(e) => setAnoInicial(e.target.value)}
              className="block w-[100%] px-6 rounded-xl border border-gray-300 bg-white py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              {anos.map((ano) => (
                <option key={ano} value={ano.toString()}>{ano}</option>
              ))}
            </select>
          </div>

          <div className=" text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Ano Final
            </label>
            <select
              value={anoFinal}
              onChange={(e) => setAnoFinal(e.target.value)}
              className="block w-[100%] px-6 rounded-xl border border-gray-300 bg-white py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              {anos
                .filter(ano => ano >= parseInt(anoInicial))
                .map((ano) => (
                  <option key={ano} value={ano.toString()}>{ano}</option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-5 flex justify-between flex-wrap">
        <p className="text-2xl font-bold text-gray-800">Indicadores</p>
        <div className="inline-flex rounded-xl shadow-sm overflow-hidden border border-gray-200 bg-gray-50">
          {indicadores.map((item) => (
            <button
              key={item}
              onClick={() => setIndicador(item)}
              className={`px-4 py-2 text-base font-medium transition ${
                indicador === item
                  ? "bg-sky-900 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-blue-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="p-5 text-center">Carregando dados...</div>}
      {error && <div className="p-5 text-red-500 text-center">{error}</div>}

      {!loading && !error && (
        <div> 
          <ComparationChart
            data={dataFiltrada}
            serie={indicador}
            estado1={estado1}
            estado2={estado2}
          />
        </div>
      )}
    </div>
  );
};

export default ComparationStates;