import { useState } from "react";
import ComparationChart from "../components/ComparationChart"

// Anotacoes:
// -mudar os dropdowns para o formato .map
// -Mudar o grafico tanto o do brazilmap quanto o de comapração

const ComparationStates = () => {
  const indicadores = ["Valor FOB", "Peso (Kg)", "Balança Comercial", "Vias"]

  const estados_brasil = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará",
    "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
    "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
    "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
    "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
    "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ]

  const anos = [
    "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024",
  ]
  // teste de como deve ser enviado os dados ao grafico:
  const data = [
    { state: "São Paulo", year: 2014, value: 100000 },
    { state: "São Paulo", year: 2015, value: 110000 },
    { state: "São Paulo", year: 2016, value: 120000 },
    { state: "São Paulo", year: 2017, value: 130000 },
    { state: "São Paulo", year: 2018, value: 125000 },
    { state: "São Paulo", year: 2019, value: 140000 },
    { state: "São Paulo", year: 2020, value: 135000 },
    { state: "São Paulo", year: 2021, value: 150000 },
    { state: "São Paulo", year: 2022, value: 155000 },
    { state: "São Paulo", year: 2023, value: 160000 },
    { state: "São Paulo", year: 2024, value: 165000 },
  
    { state: "Rio de Janeiro", year: 2014, value: 80000 },
    { state: "Rio de Janeiro", year: 2015, value: 85000 },
    { state: "Rio de Janeiro", year: 2016, value: 90000 },
    { state: "Rio de Janeiro", year: 2017, value: 88000 },
    { state: "Rio de Janeiro", year: 2018, value: 92000 },
    { state: "Rio de Janeiro", year: 2019, value: 94000 },
    { state: "Rio de Janeiro", year: 2020, value: 97000 },
    { state: "Rio de Janeiro", year: 2021, value: 99000 },
    { state: "Rio de Janeiro", year: 2022, value: 100000 },
    { state: "Rio de Janeiro", year: 2023, value: 102000 },
    { state: "Rio de Janeiro", year: 2024, value: 105000 },
  ];

  const [indicador, setIndicador] = useState<string>("Valor FOB")
  const [estado1, setEstado1] = useState("São Paulo");
  const [estado2, setEstado2] = useState("Rio de Janeiro");
  const [anoInicial, setAnoInicial] = useState<string>("2014");
  const [anoFinal, setAnoFinal] = useState<string>("2024");
  const dataFiltrada = data.filter((item) => {
    return (
      (item.state === estado1 || item.state === estado2) &&
      item.year >= parseInt(anoInicial) &&
      item.year <= parseInt(anoFinal)
    );
  });

  return (
    <div className="flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-800 p-5">
        Comparar Estados
      </h1>
      <div className="flex justify-between flex-wrap h-full">
        <div className="flex flex-wrap items-center">
          <div className="relative inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Selecione um estado
            </label>
            <select
              id="estado1"
              name="estado1"
              value={estado1}
              onChange={(e) => setEstado1(e.target.value)}
              className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              {estados_brasil.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
          <div className="relative inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Selecione um estado para comparar
            </label>
            <select
              id="estado2"
              name="estado2"
              value={estado2}
              onChange={(e) => setEstado2(e.target.value)}
              className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
              
            >
              {estados_brasil.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="relative inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Ano Inicial
            </label>
            <select
              value={anoInicial}
              onChange={(e) => setAnoInicial(e.target.value)}
              className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              {anos.map((ano) => (
                <option key={ano} value={ano}>{ano}</option>
              ))}
            </select>
          </div>
          <div className="relative inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Ano final
            </label>
            <select
              value={anoFinal}
              onChange={(e) => setAnoFinal(e.target.value)}
              className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              {anos.map((ano) => (
                <option value={ano}>{ano}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className=" p-5 flex justify-between flex-wrap">
        <p className="text-2xl font-bold text-gray-800">Indicadores</p>
        <div className="inline-flex rounded-xl shadow-sm overflow-hidden border border-gray-200 bg-gray-50">
          {indicadores.map((item) => (
            <button key= {item} onClick={() => setIndicador(item)} className={`px-4 py-2 text-base font-medium  focus:ring-blue-300 cursor-pointer ${indicador === item ? "bg-sky-900 text-white" : "bg-gray-200 text-gray-600 hover:bg-blue-50"}`}>{item}</button>
          ))}
        </div>
      </div>

      <div>
      <ComparationChart
        data={dataFiltrada}
        serie={indicador}
      />
      </div>
    </div>
  );
};

export default ComparationStates;
