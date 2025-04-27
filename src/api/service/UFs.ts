import axios from "axios";


export const getUFs= async () => {
    try {
      const response = await axios.get(`/api/ufs`);
  
      const ufs = response.data.map((item: any) => item.data);
  
      return ufs;
    } catch (error) {
      console.error("Erro ao buscar ufs:", error);
      return [];
    }
  };