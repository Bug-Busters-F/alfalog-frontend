import axios from 'axios';

export type TradeData = {
  qtd: number;
  urf_id: number;
};


export const mostUsedUFRS = async (isExport: boolean, uf_id: number, year: number): Promise<TradeData[]> => {
  const type = isExport ? "exportacoes" : "importacoes";
  const url = `/api/${type}/urfs-utilizadas`;

  try {
    const response = await axios.post(url, { uf_id, ano: year });
    return response.data; // Assuming the response data is the list of trade data
  } catch (error) {
    console.error(`Error fetching trade data from ${url}:`, error);
    return []; // Return empty array if there's an error
  }
};
