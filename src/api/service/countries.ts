import axios from "axios";


export const getCountries = async () => {
  try {
    const response = await axios.get(`/api/paises`);

    const countries = response.data.map((item: any) => item.data);

    return countries;
  } catch (error) {
    console.error("Erro ao buscar países:", error);
    return [];
  }
};
