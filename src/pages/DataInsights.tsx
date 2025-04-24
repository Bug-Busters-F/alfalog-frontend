import FilteredDataBarChart from "../components/RemovedEntriesChart"
import SidebarLayout from "../components/Sidebar"
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext"

const sampleData = [
  { label: 'Unid. medida inválida', removedCount: 47 },
  { label: 'País não reconhecido', removedCount: 7788 },
  { label: 'UF ausente ou inválida', removedCount: 604335 },
  { label: 'Via transp. inválida', removedCount: 187036 },
  { label: 'Vias terr. inconsistentes', removedCount: 278700 },
  { label: 'Qtd. estatística zerada', removedCount: 681564 },
  { label: 'Valor FOB zerado', removedCount: 11082 },
  { label: 'NCMs pouco frequentes', removedCount: 45053 },
  { label: 'Países pouco frequentes', removedCount: 904 },
  { label: 'Outliers', removedCount: 2531070 }
]

const DataInsights = () => {
    return(
    <div>
      <GlobalYearStateProvider>
        <SidebarLayout>
          <div className="p-6 md:p-10 max-w-4xl mx-auto text-gray-800">
            <h1 className="text-2xl font-semibold mb-4 text-center">Relatório de Linhas Removidas</h1>
            <p className="mb-4 text-lg text-justify">
              Esta seção apresenta insights sobre a qualidade e consistência dos dados utilizados na plataforma Alfalog, com foco na identificação de informações descartadas durante o processo de normalização.
            </p>
            <FilteredDataBarChart data={sampleData} />
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
    </div>
  )
  }
  
  export default DataInsights

