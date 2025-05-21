import { useState, useEffect } from "react"

interface PeriodoSelectorProps {
  anos: string[]
  onPeriodoChange: (anoInicial: string, anoFinal: string) => void
}

const PeriodoSelector = ({ anos, onPeriodoChange }: PeriodoSelectorProps) => {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string>("Últimos 10 anos")
  const [anoInicial, setAnoInicial] = useState<string>("2014")
  const [anoFinal, setAnoFinal] = useState<string>("2024")
  const [mostrarCustomizado, setMostrarCustomizado] = useState<boolean>(false)

  useEffect(() => {
    if (opcaoSelecionada === "Personalizado") {
      onPeriodoChange(anoInicial, anoFinal)
    } else {
      const [inicio, fim] = getPeriodoPorNome(opcaoSelecionada)
      onPeriodoChange(inicio, fim)
    }
  }, [opcaoSelecionada, anoInicial, anoFinal])

  const opcoesPeriodo = [
    "Últimos 10 anos",
    "Últimos 5 anos",
    "Pós-pandemia (2020–2024)",
    "Personalizado",
  ]

  const getPeriodoPorNome = (nome: string): [string, string] => {
    switch (nome) {
      case "Últimos 10 anos":
        return ["2014", "2024"]
      case "Últimos 5 anos":
        return ["2019", "2024"]
      case "Pós-pandemia (2020–2024)":
        return ["2020", "2024"]
      default:
        return [anoInicial, anoFinal]
    }
  }

  const handleChangeOpcao = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const opcao = e.target.value
    setOpcaoSelecionada(opcao)
    setMostrarCustomizado(opcao === "Personalizado")
  }
  return (
    <div className="p-5">
      <label className="block mb-1 text-base font-medium text-gray-700">
        Período
      </label>
      <select
        value={opcaoSelecionada}
        onChange={handleChangeOpcao}
        className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
      >
        {opcoesPeriodo.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>

      {mostrarCustomizado && (
        <div className="flex gap-4 mt-4">
          <div>
            <label className="block mb-1 text-base font-medium text-gray-700">
              Ano Inicial
            </label>
            <select
              value={anoInicial}
              onChange={(e) => setAnoInicial(e.target.value)}
              className="block w-28 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              {anos.map((ano) => (
                <option key={ano} value={ano}>{ano}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-base font-medium text-gray-700">
              Ano Final
            </label>
            <select
              value={anoFinal}
              onChange={(e) => setAnoFinal(e.target.value)}
              className="block w-28 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              {anos.map((ano) => (
                <option key={ano} value={ano}>{ano}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default PeriodoSelector
