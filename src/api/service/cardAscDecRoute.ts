import axios from 'axios'

export interface EstadoRanking {
  uf_id: number
  nome: string
  variacao_percentual: number
  saldo_inicial: number
  saldo_final: number
}

export interface EstadosAscDecResponse {
  ascensao: EstadoRanking[]
  declinio: EstadoRanking[]
}

export const fetchEstadosAscensaoDeclinio = async (
  anoInicial: number,
  anoFinal: number
): Promise<EstadosAscDecResponse> => {
  try {
    const response = await axios.post("/api/estados-ascensao-declinio", {
      ano_inicial: anoInicial,
      ano_final: anoFinal
    })

    return response.data
  } catch (error) {
    console.error("Erro ao buscar estados em ascensão/declínio:", error)
    return { ascensao: [], declinio: [] }
  }
}