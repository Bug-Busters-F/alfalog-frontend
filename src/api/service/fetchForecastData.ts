import axios from "axios";

export const fetchForecastTradeBalanceData = async () => {
  try {
    const response = await axios.get("api/forecast/balanca-comercial");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da previsão da balança comercial:", error);
    return [];
  }
};

export const fetchForecastExportData = async () => {
  try {
    const response = await axios.get("api/forecast/exportacoes");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da previsão de exportações:", error);
    return [];
  }
};

export const fetchForecastImportData = async () => {
  try {
    const response = await axios.get("api/forecast/importacoes");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da previsão de importações:", error);
    return [];
  }
};

