import AreaChart from "../components/AreaChart";
import SidebarLayout from "../components/Sidebar";


const Home = () => {
    return(
    <div>
      <SidebarLayout>
        <AreaChart data={[{value:21,year:123},{value:30,year:124},{value:50,year:125},{value:10 , year:126}]}/>
      </SidebarLayout>
    </div>
  )
  };
  
  export default Home;
