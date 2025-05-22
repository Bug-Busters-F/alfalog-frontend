import { useEffect, useState } from "react";
import ComparationChart from "../components/ComparationChart";
import { getComparationStates } from "../api/service/getComparationStates";
import { useExport } from "../context/ExportContext";

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
  "Rondônia": 34,
};

const ComparationStates = () => {
  const {isExport} = useExport()
  const indicadores = ["Valor FOB", "Peso (Kg)"];
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

        if (!estado1Id || !estado2Id) {
          setError("Estados inválidos selecionados");
          return;
        }

        const response = await getComparationStates({
          estados: [estado1Id, estado2Id],
          ano_inicial: parseInt(anoInicial),
          ano_final: parseInt(anoFinal),
        }, isExport);

        // Transforma os dados para o formato esperado pelo gráfico
        const dadosTransformados = response.map((item: any) => ({
          state: item.state,
          year: item.year,
          value: item[indicador] ?? 0, // Usa o nome do campo diretamente como vem do backend
          estadoNome: estado1Id === item.state ? estado1 : estado2
        }));

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