import { searchGraph, searchGraphResponse } from "../api/service/searchGraph";
import { getUrfById } from "../api/service/URFS";


type formattedData = {
  name: string;
  value: number;
};



export type searchGraphResponseFormatted = Omit<
  searchGraphResponse,
  "por_estado" | "por_pais" | "por_via" | "por_urf"
> & {
  por_estado: formattedData[];
  por_pais: formattedData[];
  por_via: formattedData[];
  por_urf: formattedData[];
};

export const getFormattedSearchGraph = async (
  isExport: boolean,
  ncm: string,
  year_start: number,
  year_end: number
): Promise<searchGraphResponseFormatted | null> => {
  const graphData = await searchGraph(isExport, ncm, year_start, year_end);
  if (!graphData) return null;

  // UF -> nome
  const ufsRaw = JSON.parse(localStorage.getItem("UFs") || "{}") as Record<string, number>;
  const ufIdParaNome = Object.fromEntries(
    Object.entries(ufsRaw).map(([nome, id]) => [id, nome])
  );

  const por_estado_formatado = graphData.por_estado.map((item) => {
    const uf_id = item["uf_id"] as number;
    return {
      name: ufIdParaNome[uf_id] || `UF ${uf_id}`,
      value: Number(item.total),
    };
  });

  // País -> nome
  const countriesRaw = JSON.parse(localStorage.getItem("countries") || "[]") as {
    id: number;
    codigo: string;
    nome: string;
  }[];

  const paisIdParaNome: Record<number, string> = {};
  countriesRaw.forEach((pais) => {
    paisIdParaNome[pais.id] = pais.nome;
  });

  const por_pais_formatado = graphData.por_pais.map((item) => {
    const pais_id = item["pais_id"] as number;
    return {
      name: paisIdParaNome[pais_id] || `País ${pais_id}`,
      value: Number(item.total),
    };
  });

  // Via -> nome
  const routesRaw = JSON.parse(localStorage.getItem("routes") || "[]") as {
    id: number;
    codigo: string;
    nome: string;
  }[];

  const viaIdParaNome: Record<number, string> = {};
  routesRaw.forEach((via) => {
    viaIdParaNome[via.id] = via.nome;
  });

  const por_via_formatado = graphData.por_via.map((item) => {
    const via_id = item["via_id"] as number;
    return {
      name: viaIdParaNome[via_id] || `Via ${via_id}`,
      value: Number(item.total),
    };
  });

  // URF -> nome (requisição assíncrona para cada urf_id)
  const por_urf_formatado = await Promise.all(
    graphData.por_urf.map(async (item) => {
      const urf_id = item["urf_id"] as number;
      try {
        const response = await getUrfById(urf_id);
        return {
          name: response?.nome || `URF ${urf_id}`,
          value: Number(item.total),
        };
      } catch (err) {
        console.error(`Erro ao buscar URF ${urf_id}`, err);
        return {
          name: `URF ${urf_id}`,
          value: Number(item.total),
        };
      }
    })
  );

  return {
    ...graphData,
    por_estado: por_estado_formatado,
    por_pais: por_pais_formatado,
    por_via: por_via_formatado,
    por_urf: por_urf_formatado,
  };
};
