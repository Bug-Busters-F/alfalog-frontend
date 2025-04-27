import axios from 'axios';

export type TradeData = {
  ncm_id: number;
  ncm_descricao: string;
  via_id: number;
  pais_id: number;
  valor_agregado: number;
  peso: number;
};

type tradeDataResponse = {
  has_next: boolean;
  has_previous: boolean;
  pagina: number;
  trades: TradeData[];
};

export const tradeData = async (
  isExport: boolean,
  uf_id: number,
  year: number,
  filter: string,
  cursor: number
): Promise<tradeDataResponse> => {
  const type = isExport ? "exportacoes" : "importacoes";
  const filterType = filter === 'valor' ? "valor-agregado" : "cargas-movimentadas";
  const url = `/api/${type}/${filterType}`;

  try {
    const response = await axios.post(url, { uf_id, ano: year, tamanho_pagina: 5, cursor });
    const { has_next, has_previous, pagina } = response.data;

    let trades: TradeData[] = [];

    if (filterType === "valor-agregado") {
      // Para 'valor-agregado', os dados estão em 'valores_agregados'
      trades = response.data.valores_agregados.map((item: any) => ({
        ncm_id: item.ncm_id,
        ncm_descricao: item.ncm_descricao,
        via_id: item.via_id,
        pais_id: item.pais_id,
        valor_agregado: item.valor_agregado,
        peso: item.peso,
      }));
    } else if (filterType === "cargas-movimentadas") {
      // Para 'cargas-movimentadas', os dados estão em 'cargas_movimentadas'
      trades = response.data.cargas_movimentadas.map((item: any) => ({
        ncm_id: item.ncm_id,
        ncm_descricao: item.ncm_descricao,
        via_id: item.via_id,
        pais_id: item.pais_id,
        valor_agregado: item.valor_agregado,
        peso: item.peso,
      }));
    }

    return { has_next, has_previous, pagina, trades };
  } catch (error) {
    console.error(`Erro ao buscar as transações em ${url}:`, error);
    return { has_next: false, has_previous: false, pagina: 0, trades: [] };
  }
};

