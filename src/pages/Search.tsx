import SearchTable from "../components/SearchTable"
import SidebarLayout from "../components/Sidebar"
import { ExportContextProvider } from "../context/ExportContext"
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext"

const Search = () => {
    return (
        <div>
            <ExportContextProvider>
                <GlobalYearStateProvider>
                    <SidebarLayout>
                        <div className="relative w-full h-64">
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full">
                                <img src="/search.png" className="w-full h-full object-cover" />
                                <h1 className="absolute text-white text-4xl md:text-5xl font-bold text-center px-4 bg-black/50 h-full w-full flex items-center justify-center">
                                    Pesquisar
                                </h1>
                            </div>
                        </div>
                        <div className="p-6 md:p-10 max-w-4xl mx-auto text-gray-800">
                            <h3 className="text-2xl font-semibold mb-4 text-center">
                                Consulte e filtre transações manualmente
                            </h3>
                        </div>
                        <SearchTable></SearchTable>
                        <div className="p-6 md:p-10 text-gray-800">
                            <h3 className="text-2xl font-semibold mb-4">Fonte de dados</h3>
                            <p className="mb-3">
                                Acesse os arquivos brutos diretamente no site oficial:
                                <a
                                    href="https://www.gov.br/mdic/pt-br/assuntos/comercio-exterior/estatisticas/base-de-dados-bruta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 hover:underline ml-1"
                                >
                                    gov.br/mdic - Base de Dados Bruta
                                </a>
                            </p>
                            <p className="mb-3">
                                Ou então, faça o download das legendas aqui:
                            </p>
                            <p className="py-4">
                                <a
                                    href="https://balanca.economia.gov.br/balanca/bd/tabelas/NCM.csv"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded inline-block transition duration-300 mr-3"
                                >
                                    NCM
                                </a>
                                <a
                                    href="https://balanca.economia.gov.br/balanca/bd/tabelas/NCM_UNIDADE.csv"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded inline-block transition duration-300 mr-3"
                                >
                                    Unidade
                                </a>
                                <a
                                    href="https://balanca.economia.gov.br/balanca/bd/tabelas/PAIS.csv"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded inline-block transition duration-300 mr-3"
                                >
                                    País
                                </a>
                                <a
                                    href="https://balanca.economia.gov.br/balanca/bd/tabelas/VIA.csv"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded inline-block transition duration-300 mr-3"
                                >
                                    Via
                                </a>
                                <a
                                    href="https://balanca.economia.gov.br/balanca/bd/tabelas/URF.csv"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded inline-block transition duration-300"
                                >
                                    URF
                                </a>
                            </p>
                        </div>
                    </SidebarLayout>
                </GlobalYearStateProvider>
            </ExportContextProvider>
        </div >
    )
}

export default Search;