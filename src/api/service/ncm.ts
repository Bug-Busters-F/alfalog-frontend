import axios from "axios";


export const getNcmById = async (ncm_id :number) => {
  try {
    const response = await axios.get(`/api/ncms/${ncm_id}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar ncm:", error);
    return [];
  }
};
