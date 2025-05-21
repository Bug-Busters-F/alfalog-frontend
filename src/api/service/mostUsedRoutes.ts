import axios from 'axios'

export type PathData = {
  qtd: number
  via_id: number
}


export const mostUsedRoutes = async (isExport: boolean, uf_id: number, year_start: number, year_end?: number): Promise<PathData[]> => {

  const type = isExport ? "exportacoes" : "importacoes"
  const url = `/api/${type}/vias-utilizadas`
  const data: { [key: string]: number } = {
    uf_id,
    ano_inicial: year_start,
  }
  if (year_start) {
    data['ano_inicial'] = year_start
  }

  try {
    const response = await axios.post(url, data)
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar as rotas mais utilizadas em ${url}:`, error)
    return []
  }
}
