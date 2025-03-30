import axios from "axios";

export const getMovedCargo = async (uf_id: number, ano: number) => {
    try {
      const response = await axios.post(`/api/cargas_movimentadas`, {
        uf_id,
        ano,
      });
    
      const movedCargo = response.data
  
      return movedCargo;
    } catch (error) {
      console.error("Erro ao buscar lista de carga movimentada:", error);
      return [];
    }
  };
  