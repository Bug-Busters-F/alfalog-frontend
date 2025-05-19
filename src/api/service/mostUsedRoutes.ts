import axios from 'axios';

export type PathData = {
  qtd: number;
  via_id: number;
};


export const mostUsedRoutes = async (isExport: boolean, uf_id: number, year_start: number, year_end: number): Promise<PathData[]> => {
  const type = isExport ? "exportacoes" : "importacoes";
  const url = `/api/${type}/vias-utilizadas`;

  try {
    const response = await axios.post(url, { 
      uf_id, 
      periodo_ano_inicial: year_start,
      periodo_ano_final: year_end  
    });
    return response.data; 
  } catch (error) {
    console.error(`Erro ao buscar as rotas mais utilizadas em ${url}:`, error);
    return [];
  }
};
