import axios from "axios";


export const getRoutes= async () => {
  try {
    const response = await axios.get(`/api/vias`);

    const routes = response.data.map((item: any) => item.data);

    return routes;
  } catch (error) {
    console.error("Erro ao buscar vias:", error);
    return [];
  }
};
