import SidebarLayout from "../components/Sidebar";
import BrazilMapComponent from "../components/BrazilMap";
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext";
import ComparationStates from "../components/ComparationStates";

const Home = () => {
    return(
    <div>
      <GlobalYearStateProvider>
        <SidebarLayout>
          <BrazilMapComponent />
          <ComparationStates/>
        </SidebarLayout>
      </GlobalYearStateProvider>
    </div>
  )
  };
  
  export default Home;

