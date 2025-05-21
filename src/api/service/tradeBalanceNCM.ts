import axios from 'axios';

export type Result = {
  year: number;
  value: number;
};


export const tradeBalanceNCM = async (ncm: number): Promise<Result[]> => {
  try {

    const response = await axios.post("api/balanca-comercial/ncm", { ncm });


    const balancaData = response.data.dados;

    return balancaData

  } catch (error) {
    console.error(`Erro ao buscar a balança comercial do NCM:`, error);
    return [];
  }
};
