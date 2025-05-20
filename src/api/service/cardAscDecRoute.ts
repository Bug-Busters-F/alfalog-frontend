import axios from 'axios';

// Interface ajustada de acordo com o que a API realmente retorna
export interface EstadoRanking {
  uf_id: number;
  percentual_variacao: number;
}

export interface EstadosAscDecResponse {
  ascensao: EstadoRanking[];
  declinio: EstadoRanking[];
}

export const fetchEstadosAscensaoDeclinio = async (
  anoInicial: number,
  anoFinal: number
): Promise<EstadosAscDecResponse> => {
  try {
    const response = await axios.post("/api/top-estados-ascencao-declinio", {
      ano_inicial: anoInicial,
      ano_final: anoFinal
    });

    const data: EstadoRanking[] = response.data.balanca;

    // A API retorna os 5 primeiros (ascensão) + 5 últimos (declínio)
    const ascensao = data.slice(0, 5);
    const declinio = data.slice(5, 10);

    return { ascensao, declinio };
  } catch (error) {
    console.error("Erro ao buscar estados em ascensão/declínio:", error);
    return { ascensao: [], declinio: [] };
  }
};
