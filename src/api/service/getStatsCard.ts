import axios from "axios";

const stateNameToSigla: { [key: string]: string } = {
  "Acre": "AC",
  "Alagoas": "AL",
  "Amapá": "AP",
  "Amazonas": "AM",
  "Bahia": "BA",
  "Ceará": "CE",
  "Distrito Federal": "DF",
  "Espírito Santo": "ES",
  "Goiás": "GO",
  "Maranhão": "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  "Pará": "PA",
  "Paraíba": "PB",
  "Paraná": "PR",
  "Pernambuco": "PE",
  "Piauí": "PI",
  "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  "Rondônia": "RO",
  "Roraima": "RR",
  "Santa Catarina": "SC",
  "São Paulo": "SP",
  "Sergipe": "SE",
  "Tocantins": "TO"
};

export async function getStatsCard(
  nomeEstado: string,
  anoInicio: number,
  anoFim: number
) {
  const sigla = stateNameToSigla[nomeEstado];

  if (!sigla) {
    throw new Error(`Sigla não encontrada para o estado: ${nomeEstado}`);
  }

  try {
    const response = await axios.get("http://127.0.0.1:5000/api/estatisticas-comerciais", {
      params: {
        estado: sigla,
        ano_inicio: anoInicio,
        ano_fim: anoFim,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estatísticas comerciais:", error);
    throw error;
  }
}
