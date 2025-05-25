import { mostUsedRoutes } from "../api/service/mostUsedRoutes"

export type Result = {
  name: string
  value: number
}

export const processTopRoutes = async (uf_id: number, year: number, isExport: boolean): Promise<Result[]> => {
  const rawData = await mostUsedRoutes(isExport, uf_id, year)

  const routes = JSON.parse(localStorage.getItem("routes") || "[]")
  // const countries = JSON.parse(localStorage.getItem("countries") || "[]");


  const formattedData = rawData.map((item) => {
    const via = routes.find((v: { id: number }) => v.id === item.via_id)
    return {
      name: via ? via.nome : `Via ${item.via_id}`,
      value: item.qtd,
    }
  })

  const sortedData = formattedData.sort((a, b) => b.value - a.value)

  return sortedData.slice(0, 6)
}
