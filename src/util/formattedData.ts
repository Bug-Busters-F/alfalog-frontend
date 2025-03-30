import { getAddedValues } from "../api/service/addedValue";
import { getMovedCargo } from "../api/service/movedCargo";
import { getNcmById } from "../api/service/ncm";

export const getFormattedDataForAddedValuesTable = async (uf_id: number, ano: number) => {
    try {
      const addedValues = await getAddedValues(uf_id, ano);
  
      const countries = JSON.parse(localStorage.getItem('countries') || '[]');
      const routes = JSON.parse(localStorage.getItem('routes') || '[]');
      
      const formattedData = await Promise.all(
        addedValues.map(async (transaction: any) => {
          const { ncm_id, nome, valor, pais_id, via_id } = transaction;
  
          const ncm = await getNcmById(ncm_id);
  
          const country = countries.find((country: any) => country.id === pais_id);
          if (!country) {
            throw new Error(`País não encontrado para o pais_id ${pais_id}`);
          }
          const pais = country.nome;
  
          const route = routes.find((route: any) => route.id === via_id);
          if (!route) {
            throw new Error(`Via não encontrada para o via_id ${via_id}`);
          }
          const via = route.nome;
  
          return {
            ncm: ncm.data.codigo,
            nome: ncm.data.descricao,
            pais: pais,
            via: via,
            valor: transaction.valor_agregado
          };
        })
      );
  
      localStorage.setItem('formattedData', JSON.stringify(formattedData));
      
      return formattedData;
    } catch (error) {
      console.error("Erro ao formatar os dados:", error);
      return [];
    }
};

export const getFormattedDataForMovedCargo = async (uf_id: number, ano: number) => {
  try {
    const movedCargo = await getMovedCargo(uf_id, ano);

    const formattedData = await Promise.all(
      movedCargo.map(async (cargo: any) => {
        const { ncm_id, peso } = cargo;

        const ncm = await getNcmById(ncm_id);

        return {
          ncm: ncm.data.codigo,
          nome: ncm.data.descricao,
          peso: peso
        };
      })
    );

    localStorage.setItem('formattedMovedCargo', JSON.stringify(formattedData));

    return formattedData;
  } catch (error) {
    console.error("Erro ao formatar os dados de movimentação de carga:", error);
    return [];
  }
};
