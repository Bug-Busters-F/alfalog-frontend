import { useState } from "react";
import AreaChart from "../components/AreaChart";

// Anotacoes:
// -mudar os dropdowns para o formato .map
// -Mudar o grafico tanto o do brazilmap quanto o de comapração

const ComparationStates = () => {
  const indicadores = ["Valor FOB", "Peso (Kg)", "Balança Comercial", "Vias"]
  const [indicador, setIndicador] = useState<string>("Valor FOB")

  const data =[
    { year: 123, value: 50 },
    { year: 124, value: 30 },
    { year: 125, value: 50 },
    { year: 126, value: 100 },
    { year: 127, value: 60 },
    { year: 128, value: 45 },
    { year: 129, value: 80 },
  ]; 

  return (
    <div className="flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-800 p-5">
        Comparar Estados
      </h1>
      <div className="flex justify-between">
        <div className="flex flex-wrap items-center">
          <div className="relative inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Selecione um estado
            </label>
            <select
              id="estado"
              name="estado"
              className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="BA">Bahia</option>
            </select>
          </div>
          <div className="relative inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Selecione um estado para comparar
            </label>
            <select
              id="estado"
              name="estado"
              className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="BA">Bahia</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="relative inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Ano Inicial
            </label>
            <select
              id="estado"
              name="estado"
              className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2015</option>
            </select>
          </div>
          <div className="relative inline-block text-left p-5">
            <label className="block mb-1 text-base font-medium text-gray-700">
              Ano final
            </label>
            <select
              id="estado"
              name="estado"
              className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </div>

      <div className=" p-5 flex justify-between">
        <p className="text-2xl font-bold text-gray-800">Indicadores</p>
        <div className="inline-flex rounded-xl shadow-sm overflow-hidden border border-gray-200 bg-gray-50">
          {indicadores.map((item) => (
            <button key= {item} onClick={() => setIndicador(item)} className={`px-4 py-2 text-base font-medium focus: outline-none focus:ring-2 focus:ring-blue-300 ${indicador === item ? "bg-sky-900 text-white" : "bg-white text-gray-600 hover:bg-blue-50"}`}>{item}</button>
          ))}
        </div>
      </div>

      <div>
        <AreaChart data={data} />
      </div>
    </div>
  );
};

export default ComparationStates;
