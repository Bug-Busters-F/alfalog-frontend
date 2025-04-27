import { mostUsedUFRS } from "../api/service/mostUsedURFS";
import { getUrfById } from "../api/service/URFS";


type Result = {
  name: string;
  value: number;
};

export const processTopUrfs = async (uf_id: number, year: number, isExport: boolean): Promise<Result[]> => {
  try {
    const tradeData = await mostUsedUFRS(isExport, uf_id, year);

    const topTradeData = await Promise.all(
      tradeData
        .sort((a, b) => b.qtd - a.qtd)
        .slice(0, 6) 
        .map(async (item) => {
          const urf = await getUrfById(item.urf_id);
          return {
            name: urf ? urf.nome : `URF ${item.urf_id}`,
            value: item.qtd,
          };
        })
    );

    return topTradeData;
  } catch (error) {
    console.error('Error processing top URFs:', error);
    return [];
  }
};
