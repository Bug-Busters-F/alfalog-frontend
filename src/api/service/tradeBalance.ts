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

export const tradeBalanceForecast = async (uf_id: number): Promise<Result[]> => {
  try {

    const response = await axios.post("api/balanca-comercial/previsao", { uf_id });


    const balancaData = response.data.balanca;

    return balancaData.map((item: { ano: any; valor: any; })  => ({
      year: item.ano,
      value: item.valor
    }));

  } catch (error) {
    console.error(`Erro ao buscar a previsão balança comercial:`, error);
    return [];
  }
};
