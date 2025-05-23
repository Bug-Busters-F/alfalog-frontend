import axios from 'axios';

export type Result = {
  year: number;
  value: number;
};


export const tradeBalance = async (uf_id: number): Promise<Result[]> => {
  try {

    const response = await axios.post("api/balanca-comercial", { uf_id });


    const balancaData = response.data.balanca;

    return balancaData.map((item: { ano: any; valor: any; })  => ({
      year: item.ano,
      value: item.valor
    }));

  } catch (error) {
    console.error(`Erro ao buscar a balança comercial:`, error);
    return [];
  }
};

interface BalancaItem {
  year: number;
  value: number;
}

interface UfBalanca {
  uf_id: number;
  balanca: BalancaItem[];
}

export const tradeBalanceComparacao = async (
  uf_ids: number[]
): Promise<UfBalanca[]> => {
  try {
    const response = await axios.post("/api/balanca-comercial-comparacao", {
      uf_ids,
    });

    return response.data.balancas.map((item: any) => ({
      uf_id: item.uf_id,
      balanca: item.balanca.map((b: any) => ({
        year: b.ano,
        value: b.valor,
      })),
    }));
  } catch (error) {
    console.error("Erro ao buscar a balança comercial comparativa:", error);
    throw error;
  }
};
