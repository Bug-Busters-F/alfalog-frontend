import SidebarLayout from "../components/Sidebar";
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext";
import { ExportContextProvider } from "../context/ExportContext";
import ForecastSelector from "../components/ForecastSelector";


const Forecast = () => {
  return (
    <div>
      <ExportContextProvider>
        <GlobalYearStateProvider>
          <SidebarLayout>
            <ForecastSelector />
            <div className="mx-22 my-15 p-5">
              <h2 className="my-5 py-5 text-3xl font-extrabold leading-none tracking-tight text-gray-800 pb-0">
                Previsões ou Tendências da Balança Comercial nos próximos anos
              </h2>
              <div className="mx-0 my-10 me-20">
                <p className="my-5 text-lg text-justify leading-9">
                  A simulação de tendências da Balança Comercial foi realizada com os modelos de <a href="https://en.wikipedia.org/wiki/Exponential_smoothing" target="_blank" rel="noopener noreferrer" className="text-sky-800">Suavização Exponencial Holt-Winters</a> e o método probabilístico de <a href="https://pt.wikipedia.org/wiki/M%C3%A9todo_de_Monte_Carlo" target="_blank" rel="noopener noreferrer" className="text-sky-800">Monte Carlo</a> com intervalo de confiança de 80%.
                </p>
                <p className="my-5 text-lg text-justify leading-9">
                  Foi utilizado o modelo de Holt-Winter com intuito de aplicar uma Suavização Exponencial nos dados históricos. As vantagens observadas foram sua capacidade de
                </p>
                <ul className="m-5 list-disc text-lg leading-9">
                  <li>Suaviza dados com tendência e sazonalidade, melhorando a visualização de padrões ao longo do tempo </li>
                  <li>Reduz o impacto de variações bruscas, tornando os dados mais estáveis e fáceis de interpretar.</li>
                  <li>É simples de aplicar e ajusta-se dinamicamente à evolução da série temporal.</li>
                </ul>
                <p className="my-5 text-lg text-justify leading-9">
                  Para a análise das tendências do comércio exterior nos próximos anos, foi utilizado modelo de Monte Carlo através da biblioteca <a href="https://facebook.github.io/prophet/" target="_blank" rel="noopener noreferrer" className="text-sky-800">Prophet</a> configurado para um intervalo de confiança de 80%.
                  A Prophet realiza simulações aplicando esse modelo sobre os dados históricos. Assim, foi possível simular o comportamento do comércio exterior nos próximos anos. Esse modelo foi escolhido pelas seguintes vantagens:
                </p>
                <ul className="m-5 list-disc text-lg leading-9">
                  <li>Ele se baseia em amostragens aleatórias massivas para obter resultados numéricos</li>
                  <li>Permite avaliar a distribuição provável dos resultados futuros, e não apenas um único valor previsto</li>
                  <li>Auxilia na avaliação de riscos e na tomada de decisão com base em simulações probabilísticas</li>
                </ul>
              </div>
              <div className="my-10">
                  <p className="my-5 py-5 text-lg text-center">
                    Essa simulação, e todo o código desenvolvido para executá-la, pode ser acessada no seguinte notebook Jupyter.
                  </p>
                  <div className="flex text-lg justify-center">
                    <a href="https://github.com/Bug-Busters-F/alfalog/blob/main/tratamento-dados/Previs%C3%A3o%20da%20Balan%C3%A7a%20Comercial%20do%20Brasil.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                      Ver notebook no Google Colab
                    </a>
                  </div>
                </div>

            </div>
          </SidebarLayout>
        </GlobalYearStateProvider>
      </ExportContextProvider>
    </div>
  )
};

export default Forecast;
