import axios from 'axios';

export type TradeData = {
  qtd: number;
  urf_id: number;
};


export const mostUsedUFRS = async (isExport: boolean, uf_id: number, year_start: number, year_end: number): Promise<TradeData[]> => {
  const type = isExport ? "exportacoes" : "importacoes";
  const url = `/api/${type}/urfs-utilizadas`;

  try {
    const response = await axios.post(url, { 
      uf_id, 
      periodo_ano_inicial: year_start,
      periodo_ano_final: year_end 
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar as URFs mais utilizadas em ${url}:`, error);
    return [];
  }
};
