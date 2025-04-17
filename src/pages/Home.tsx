import SidebarLayout from "../components/Sidebar";
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext";
import br from "/public/br.png"

const Home = () => {
  return (
    <div className="flex flex-col h-full">
      <GlobalYearStateProvider>
        <SidebarLayout>
          <div className="relative w-full h-64">
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full">
              <img src={br} className="w-full h-full object-cover"/>
              <h1 className="absolute text-white text-4xl md:text-5xl font-bold text-center px-4 bg-black/50 h-full w-full flex items-center justify-center">
                ALFALOG
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-10 max-w-4xl mx-auto text-gray-800">
            <h1 className="text-2xl font-semibold mb-4 text-center">Panorama do Comércio Exterior do Brasil</h1>
            <p className="mb-4 text-lg text-justify">
              Sistema para extração de estatísticas do comércio exterior brasileiro.
              Consulte os gráficos para conhecer as exportações e importações do Brasil de forma detalhada.
              Personalize suas pesquisas e extraia os dados em CSV.
            </p>
            <p className="mb-4 text-lg text-justify">
              Alfalog tem como objetivo apresentar, de forma clara e acessível, os dados do comércio exterior dos estados brasileiros, 
              promovendo a acessibilidade e o entendimento das relações comerciais do país.
              As informações são obtidas diretamente dos dados abertos disponibilizados pelo
              <a href="https://www.gov.br/mdic/pt-br/assuntos/comercio-exterior" className="text-blue-800"> Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC).</a>
            </p>
            <p className="mb-4 text-lg text-justify">
              Através de visualizações e relatórios interativos, o usuário pode acompanhar o desempenho de cada estado em termos de exportações, 
              importações, produtos mais comercializados, principais parceiros comerciais, comparação de estados e muito mais.
            </p>

            <div className="flex text-lg justify-center">
              <a href="/mapa" className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                Acessar Estatísticas
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4 text-sky-800">📦</div>
                <h3 className="text-xl font-semibold mb-2">Exportações</h3>
                <p className="text-gray-600">Acompanhe os principais produtos exportados por cada estado brasileiro.</p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4 text-sky-800">🚢</div>
                <h3 className="text-xl font-semibold mb-2">Importações</h3>
                <p className="text-gray-600">Visualize os produtos mais importados e os países de origem dessas mercadorias.</p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4 text-sky-800">📈</div>
                <h3 className="text-xl font-semibold mb-2">Análises Comparativas</h3>
                <p className="text-gray-600">Compare o desempenho de diferentes estados ao longo dos anos.</p>
              </div>
            </div>
          </div>
        </SidebarLayout>
      </GlobalYearStateProvider>
    </div>
  )
};

export default Home;