import axios from 'axios'

export type TradeData = {
  qtd: number
  urf_id: number
}


export const mostUsedUFRS = async (isExport: boolean, uf_id: number, year: number, year_end?: number): Promise<TradeData[]> => {
  const type = isExport ? "exportacoes" : "importacoes"
  const url = `/api/${type}/urfs-utilizadas`
  const data: { [key: string]: number } = {
    uf_id,
    ano: year,
  }
  if (year_end) {
    data['ano_final'] = year_end
  }

  try {
    const response = await axios.post(url, data)
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar as URFs mais utilizadas em ${url}:`, error)
    return []
  }
}
