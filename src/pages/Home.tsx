import SidebarLayout from "../components/Sidebar";
import BrazilMapComponent from "../components/BrazilMap";
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext";
import ComparationStates from "../components/ComparationStates";
import { ExportContextProvider } from "../context/ExportContext";

const Home = () => {
    return(
    <div>
      <ExportContextProvider>
        <GlobalYearStateProvider>
          <SidebarLayout>
            <BrazilMapComponent />
            <ComparationStates/>
          </SidebarLayout>
        </GlobalYearStateProvider>
      </ExportContextProvider>
    </div>
  )
  };
  
  export default Home;

