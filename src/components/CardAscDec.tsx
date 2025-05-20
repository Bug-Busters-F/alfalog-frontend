import { useEffect, useState } from "react"
import PeriodoSelector from "../components/CardAscDecPeriodSelector"
import CardLineChart from "./CardAscDecChart"
import { fetchEstadosAscensaoDeclinio, EstadoRanking } from "../api/service/cardAscDecRoute"

const CardAscDec = () => {
    const [anoInicial, setAnoInicial] = useState<string>("2014")
    const [anoFinal, setAnoFinal] = useState<string>("2024")
    const [mostrarGrafico, setMostrarGrafico] = useState<"ascensao" | "declinio" | null>(null)

    const [rankingAscensao, setRankingAscensao] = useState<EstadoRanking[]>([])
    const [rankingDeclinio, setRankingDeclinio] = useState<EstadoRanking[]>([])

    const anos = [
        "2014", "2015", "2016", "2017", "2018",
        "2019", "2020", "2021", "2022", "2023", "2024"
    ]

    const getUFName = (uf_id: number): string => {
        const ufs = JSON.parse(localStorage.getItem("UFs") || "{}")
        for (const nome in ufs) {
            if (ufs[nome] === uf_id) {
                return nome
            }
        }
        return `UF ${uf_id}`
    }



    const handlePeriodoChange = async (inicio: string, fim: string) => {
        setAnoInicial(inicio)
        setAnoFinal(fim)

        try {
            const { ascensao, declinio } = await fetchEstadosAscensaoDeclinio(parseInt(inicio), parseInt(fim))
            setRankingAscensao(ascensao)
            setRankingDeclinio(declinio)
        } catch (err) {
            console.error("Erro ao buscar ranking:", err)
        }
    }

    const seriesAscensao = [
        {
            name: "São Paulo",
            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8],
        },
        {
            name: "Acre",
            data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51],
        },
        {
            name: "Bahia",
            data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56],
        },
    ]

    const seriesDeclinio = [
        {
            name: "São Paulo",
            data: [50, 48, 42, 36, 27, 30, 25, 22, 18, 15],
        },
        {
            name: "Acre",
            data: [33, 39, 45, 41, 30, 23, 20, 15, 12, 10],
        },
        {
            name: "Bahia",
            data: [65, 61, 70, 72, 67, 63, 59, 54, 48, 45],
        },
    ]

    const mostrarGraficoAscensao = () => setMostrarGrafico("ascensao")
    const mostrarGraficoDeclinio = () => setMostrarGrafico("declinio")

    const seriesParaMostrar = mostrarGrafico === "ascensao" ? seriesAscensao : seriesDeclinio
    const tituloGrafico = mostrarGrafico === "ascensao" ? "Estatísticas dos Estados em Ascensão" : "Estatísticas dos Estados em Declínio"

    useEffect(() => {
        handlePeriodoChange(anoInicial, anoFinal)
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0 my-5">
            <div className="col-start-1 col-end-1">
                <PeriodoSelector anos={anos} onPeriodoChange={handlePeriodoChange} />
            </div>

            {/* Cartão de Ascensão */}
            <div className="col-start-1 col-end-1 block max-w-sm shadow-md bg-gray-200 border-b border-sky-700 rounded-lg">
                <div className="bg-sky-900 text-white py-2 rounded-t-lg">
                    <h5 className="text-2xl font-semibold text-center">Estados em Ascensão 📈</h5>
                </div>
                <div className="px-6 py-4 font-medium text-lg text-gray-900">
                    {rankingAscensao.map((estado, index) => (
                        <p key={estado.uf_id}>
                            <b className="text-green-600">Rank {index + 1}:</b> {getUFName(estado.uf_id)}
                            <span className="text-sm ml-2 px-2 py-0.5 rounded-full bg-green-700 text-green-200">
                                {estado.percentual_variacao}%
                            </span>
                        </p>
                    ))}
                </div>
                <div className="border-t-1 px-6 py-3 border-gray-300">
                    <button
                        onClick={mostrarGraficoAscensao}
                        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                        Ver Gráfico de Ascensão
                    </button>
                </div>
            </div>

            {/* Cartão de Declínio */}
            <div className="col-start-1 col-end-1 md:col-start-2 md:col-end-2 block max-w-sm shadow-md bg-gray-200 border-b border-sky-700 rounded-lg">
                <div className="bg-sky-900 text-white py-2 rounded-t-lg">
                    <h5 className="text-2xl font-semibold text-center">Estados em Declínio 📉</h5>
                </div>
                <div className="px-6 py-4 font-medium text-lg text-gray-900">
                    {rankingDeclinio.map((estado, index) => (
                        <p key={estado.uf_id}>
                            <b className="text-red-600">Rank {index + 1}:</b> {getUFName(estado.uf_id)}
                            <span className="text-sm ml-2 px-2 py-0.5 rounded-full bg-red-700 text-red-200">
                                {estado.percentual_variacao}%
                            </span>
                        </p>
                    ))}
                </div>
                <div className="border-t-1 px-6 py-3 border-gray-300">
                    <button
                        onClick={mostrarGraficoDeclinio}
                        className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                        Ver Gráfico de Declínio
                    </button>
                </div>
            </div>

            {/* Renderização condicional do gráfico */}
            {mostrarGrafico && (
                <div className="col-start-1 col-end-2 md:col-start-1 md:col-end-3 md:mt-4 md:mr-5">
                    <CardLineChart
                        startYear={parseInt(anoInicial)}
                        endYear={parseInt(anoFinal)}
                        series={seriesParaMostrar}
                        title={tituloGrafico}
                    />
                </div>
            )}
        </div>
    )
}

export default CardAscDec
