import { mostUsedUFRS } from "../api/service/mostUsedURFS";
import { getUrfById } from "../api/service/URFS";


type Result = {
  name: string;
  value: number;
};

export const processTopUrfs = async (uf_id: number, year: number, isExport: boolean): Promise<Result[]> => {
  try {
    // Fetch trade data
    const tradeData = await mostUsedUFRS(isExport, uf_id, year);

    // Fetch URF names using IDs
    const topTradeData = await Promise.all(
      tradeData
        .sort((a, b) => b.qtd - a.qtd) // Sort by quantity in descending order
        .slice(0, 6) // Top 6
        .map(async (item) => {
          const urf = await getUrfById(item.urf_id);
          return {
            name: urf ? urf.nome : `URF ${item.urf_id}`, // If URF data exists, use name
            value: item.qtd,
          };
        })
    );

    return topTradeData;
  } catch (error) {
    console.error('Error processing top URFs:', error);
    return []; // Return empty array if there's an error
  }
};
