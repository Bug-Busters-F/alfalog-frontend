import SidebarLayout from "../components/Sidebar";
import BrazilMapComponent from "../components/BrazilMap";
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext";
import ComparationStates from "../components/ComparationStates";
import { ExportContextProvider } from "../context/ExportContext";
import ForecastSelector from "../components/ForecastSelector";


const Map = () => {
  return (
    <div>
      <ExportContextProvider>
        <GlobalYearStateProvider>
          <SidebarLayout>
            <BrazilMapComponent />
            <ComparationStates />
            <div className="flex my-5 py-5 text-lg justify-center">
              <a href="/previsoes"
              className="my-5 bg-sky-800 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                Tendências do Comércio Exterior
              </a>
            </div>
          </SidebarLayout>
        </GlobalYearStateProvider>
      </ExportContextProvider>
    </div>
  )
};

export default Map;
