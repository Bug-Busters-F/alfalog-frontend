import axios from "axios";

interface ComparationStatesParams {
  estados: number[];
  ano_inicial: number;
  ano_final: number;
}

export const getComparationStates = async (params: ComparationStatesParams, isExport: boolean) => {
  try {
    if(isExport == true){
      const response = await axios.post("/api/exportacoes/comparacao-estados", params);
      return response.data;
    }
    const response = await axios.post("/api/importacoes/comparacao-estados", params);
      return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados de comparação de estados:", error);
    return [];
  }
};