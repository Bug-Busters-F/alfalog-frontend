import axios from "axios";

export const getAddedValues = async (uf_id: number, ano: number) => {
    try {
      const response = await axios.post(`/api/valor-agregado`, {
        uf_id,
        ano,
      });
    
      const addedValues = response.data
  
      return addedValues;
    } catch (error) {
      console.error("Erro ao buscar lista de valor agregado:", error);
      return [];
    }
  };
  