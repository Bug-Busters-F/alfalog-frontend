import axios from "axios";

export const getUrfById = async (urf_id: number) => {
    const url = `/api/urfs/${urf_id}`;
  
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error(`Erro ao buscar urf com id ${urf_id}:`, error);
      return null;
    }
  };