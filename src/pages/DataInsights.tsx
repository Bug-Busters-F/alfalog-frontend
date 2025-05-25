import FilteredDataBarChart from "../components/RemovedEntriesChart"
import SidebarLayout from "../components/Sidebar"
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext"
import { ExportContextProvider } from "../context/ExportContext";

const sampleData = [
  { label: 'Unid. medida inválida', removedCount: 47 },
  { label: 'Países pouco frequentes', removedCount: 904 },
  { label: 'País não reconhecido', removedCount: 7788 },
  { label: 'Valor FOB zerado', removedCount: 11082 },
  { label: 'NCMs pouco frequentes', removedCount: 45053 },
  { label: 'Via transp. inválida', removedCount: 187036 },
  { label: 'Vias terr. inconsistentes', removedCount: 278700 },
  { label: 'UF ausente ou inválida', removedCount: 604335 },
  { label: 'Qtd. estatística zerada', removedCount: 681564 },
  { label: 'Outliers', removedCount: 2531070 }
]

const DataInsights = () => {
    return(
    <div>
    <ExportContextProvider>
      <GlobalYearStateProvider>
        <SidebarLayout>
          <div className="p-6 md:p-10 max-w-4xl mx-auto text-gray-800">
            <h1 className="text-2xl font-semibold mb-4 text-center">Relatório de Linhas Removidas</h1>
            <p className="mb-4 text-lg text-justify">
              Esta seção apresenta insights sobre a qualidade e consistência dos dados utilizados na plataforma Alfalog, com foco na identificação de informações descartadas durante o processo de normalização.
            </p>
            <FilteredDataBarChart data={sampleData} />
            <h1 className="text-2xl font-semibold my-4 text-center">Descrições de Filtros</h1>
            <div className="overflow-x-auto shadow-md bg-gray-200 border-b border-sky-700 rounded-lg">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="bg-sky-900 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-4">Filtro</th>
                    <th scope="col" className="px-6 py-4">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4 font-medium">Unid. medida inválida</td>
                    <td className="px-6 py-4">Transações com unidade de medida igual a 18 (MIL QUILOWATT HORA), considerada inválida devido à sua natureza específica e não usual.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4 font-medium">País não reconhecido</td>
                    <td className="px-6 py-4">Linhas com códigos de país genéricos, desconhecidos ou agregados (ex: 0, 990 a 999), que não representam países específicos.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4 font-medium">UF ausente ou inválida</td>
                    <td className="px-6 py-4">Registros com siglas de unidade federativa ausentes ou inválidas como "ND", "ZN", "EX", entre outras.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4 font-medium">Via transp. inválida</td>
                    <td className="px-6 py-4">Códigos de via de transporte inválidos, não informados ou sem classificação oficial, como 0, 8, 10 a 13, e 99.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4 font-medium">Vias terr. inconsistentes</td>
                    <td className="px-6 py-4">Transações terrestres com países que não fazem fronteira terrestre com o Brasil, indicando erro de registro na logística da operação.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4 font-medium">Qtd. estatística zerada</td>
                    <td className="px-6 py-4">Transações com quantidade estatística igual a zero, indicando ausência de volume movimentado.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4 font-medium">Valor FOB zerado</td>
                    <td className="px-6 py-4">Transações com valor FOB (Free on Board) igual a zero, representando ausência de valor declarado na operação.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4 font-medium">NCMs pouco frequentes</td>
                    <td className="px-6 py-4">Registros com códigos NCM (Nomenclatura Comum do Mercosul) com menos de 5 ocorrências no ano, indicando itens raros ou atípicos, removidos para evitar ruído estatístico.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="px-6 py-4 font-medium">Países pouco frequentes</td>
                    <td className="px-6 py-4">Transações com países com menos de 10 registros no ano, considerados irrelevantes para análise estatística agregada.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Outliers</td>
                    <td className="px-6 py-4">Registros com peso líquido muito fora do intervalo interquartil (IQR), removidos para evitar distorções causadas por valores extremos.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="my-4 text-lg text-justify">
              O tratamento dos dados foi realizado em notebooks no Google Colab, onde foram aplicadas etapas de limpeza, filtragem e normalização.
            </p>
            <div className="flex text-lg justify-center">
              <a href="https://colab.research.google.com/drive/1WRSAEERIYsReXWyuLLLTs28WkV41tFyW?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                Ver notebook no Google Colab
              </a>
            </div>
            </div>
        </SidebarLayout>
      </GlobalYearStateProvider>
    </ExportContextProvider>
    </div>
  )
  }
  
  export default DataInsights