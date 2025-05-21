import { useEffect, useState } from "react"
import PeriodoSelector from "../components/CardAscDecPeriodSelector"
import CardLineChart from "./CardAscDecChart"
import { fetchEstadosAscensaoDeclinio, EstadoRanking } from "../api/service/cardAscDecRoute"
import InfoButton from "./CardAscDecInfo"

const CardAscDec = () => {
    const [anoInicial, setAnoInicial] = useState<string>("2014")
    const [anoFinal, setAnoFinal] = useState<string>("2024")
    const [mostrarGrafico, setMostrarGrafico] = useState<"ascensao" | "declinio" | null>(null)

    const [rankingAscensao, setRankingAscensao] = useState<any[]>([])
    const [rankingDeclinio, setRankingDeclinio] = useState<any[]>([])

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

    const mostrarGraficoAscensao = () => setMostrarGrafico("ascensao")
    const mostrarGraficoDeclinio = () => setMostrarGrafico("declinio")

    const gerarSeriesParaGrafico = (ranking: any[]) => {
        return ranking.map((estado) => ({
            name: getUFName(estado.uf_id),
            data: estado.valores
        }))
    }

    const seriesAscensao = gerarSeriesParaGrafico(rankingAscensao)
    const seriesDeclinio = gerarSeriesParaGrafico(rankingDeclinio)

    const seriesParaMostrar = mostrarGrafico === "ascensao" ? seriesAscensao : seriesDeclinio
    const tituloGrafico = mostrarGrafico === "ascensao" ? "Estatísticas dos Estados em Ascensão" : "Estatísticas dos Estados em Declínio"

    useEffect(() => {
        handlePeriodoChange(anoInicial, anoFinal)
    }, [anoInicial, anoFinal])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0 my-2">
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
            <div className="col-start-2 col-end-2 mt-2 mx-6 flex justify-end">
                <InfoButton />
            </div>
        </div>
    )
}

export default CardAscDec
