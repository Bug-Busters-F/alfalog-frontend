import { TradeData, tradeData } from "../api/service/tradesData";
import { getUFs } from "../api/service/UFs";


export const getFormattedDataForAddedValuesTable = async (
  isExport: boolean, 
  uf_id: number, 
  ano: number, 
  filter: string, 
  cursor: number
) => {
  try {
    // Obtém os dados de comércio usando a função tradeData
    const response = await tradeData(isExport, uf_id, ano, filter, cursor);
    
    // Obtém os dados de routes e countries do localStorage
    const countries = JSON.parse(localStorage.getItem('countries') || '[]');
    const routes = JSON.parse(localStorage.getItem('routes') || '[]');
    
    // Formata os dados de comércio
    const formattedData = await Promise.all(
      response.trades.map(async (transaction: TradeData) => {
        const { ncm_id, ncm_descricao, valor_agregado, peso, pais_id, via_id } = transaction;

        // Encontra o país correspondente
        const country = countries.find((country: any) => country.id === pais_id);
        if (!country) {
          throw new Error(`País não encontrado para o pais_id ${pais_id}`);
        }
        const pais = country.nome;

        // Encontra a via correspondente
        const route = routes.find((route: any) => route.id === via_id);
        if (!route) {
          throw new Error(`Via não encontrada para o via_id ${via_id}`);
        }
        const via = route.nome;

        return {
          ncm: ncm_id, // ID do NCM
          nome: ncm_descricao, // Descrição do NCM
          pais: pais, // Nome do país
          via: via, // Nome da via
          valor: valor_agregado, // Valor agregado
          peso: peso, // Peso
        };
      })
    );
    
    // Armazena os dados formatados no localStorage
    localStorage.setItem('formattedData', JSON.stringify(formattedData));
    
    // Retorna os dados formatados junto com as informações de paginação
    return {
      has_next: response.has_next,
      has_previous: response.has_previous,
      pagina: response.pagina,
      formattedData: formattedData
    };
  } catch (error) {
    console.error("Erro ao formatar os dados:", error);
    return {
      has_next: false,
      has_previous: false,
      pagina: 0,
      formattedData: []
    };
  }
};



interface UFs{
  id: number
  codigo: number
  nome: string
  sigla: string
  nome_regiao: string
}

export const getUFsDictionary = async() => {
  const UFs = await getUFs();

  let dictionary: Map<String,number> = new Map()

  UFs.forEach((element:UFs) => {
    dictionary.set(element.nome,element.id)
  });

  return dictionary
}
