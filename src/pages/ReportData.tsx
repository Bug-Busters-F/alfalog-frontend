import PieRemovedLines from "../components/PieRemovedLines";
import BarRemovedLines from "../components/BarRemovedLines";
import SidebarLayout from "../components/Sidebar";

const data = [
  { value: 44, filter: 'Unidade de medida inválida' },
  { value: 55, filter: 'País inválido' },
  { value: 13, filter: 'UF não declarada' },
  { value: 43, filter: 'Vias de transporte inválidas' },
  { value: 22, filter: 'URF inválido' },
  { value: 43, filter: 'QT_ESTAT = 0' },
  { value: 22, filter: 'KG_LIQUIDO = 0' },
  { value: 43, filter: 'VL_FOB = 0' }
]

const ReportData = () => {
    return(
      <div>
      <SidebarLayout>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
            <PieRemovedLines data={data} />
          </div>
          <div style={{ flex: 1, marginLeft: '10px' }}>
            <BarRemovedLines data={data} />
          </div>
        </div>
      </SidebarLayout>
    </div>
  )
  };
  
  export default ReportData;
