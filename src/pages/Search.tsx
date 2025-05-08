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
                    </SidebarLayout>
                </GlobalYearStateProvider>
            </ExportContextProvider>
        </div>
    )
}

export default Search;