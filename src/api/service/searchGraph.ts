import axios from 'axios';

export type AggregatedDataItem = {
  total: string;
  [key: string]: string | number;
};

export type searchGraphResponse = {
  por_estado: AggregatedDataItem[];
  por_pais: AggregatedDataItem[];
  por_urf: AggregatedDataItem[];
  por_via: AggregatedDataItem[];
};

export const searchGraph = async (
  isExport: boolean,
  ncm: string,
  year_start: number,
  year_end: number
): Promise<searchGraphResponse | null> => {
  const type = isExport ? 'exportacoes' : 'importacoes';
  const url = `/api/${type}/graficos-pesquisa`;

  try {
    const response = await axios.post(url, {
      ncm,
      ano_inicial: year_start,
      ano_final: year_end,
    });
    return response.data as searchGraphResponse;
  } catch (error) {
    console.error(`Erro ao buscar os gráficos de pesquisa em ${url}:`, error);
    return null;
  }
};
