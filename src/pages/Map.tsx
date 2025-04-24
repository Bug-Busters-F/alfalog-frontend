import SidebarLayout from "../components/Sidebar";
import BrazilMapComponent from "../components/BrazilMap";
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext";

const Map = () => {
    return(
    <div>
      <GlobalYearStateProvider>
        <SidebarLayout>
          <BrazilMapComponent />
        </SidebarLayout>
      </GlobalYearStateProvider>
    </div>
  )
  };
  
  export default Map;