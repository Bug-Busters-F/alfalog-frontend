import PieRemovedLines from "../components/PieRemovedLines"
import BarRemovedLines from "../components/BarRemovedLines"
import SidebarLayout from "../components/Sidebar"
import { GlobalYearStateProvider } from "../context/GlobalYearStateContext";

const data = [
    { value: 44, filter: 'Unidade de medida inválida' },
    { value: 55, filter: 'País inválido' },
    { value: 13, filter: 'UF não declarada' },
    { value: 43, filter: 'Vias de transporte inválidas' },
    { value: 22, filter: 'URF inválido' },
    { value: 43, filter: 'QT_ESTAT = 0' },
    { value: 22, filter: 'KG_LIQUIDO = 0' },
    { value: 43, filter: 'VL_FOB = 0' }
];

const ReportData = () => {
    return (
        <GlobalYearStateProvider>
                <SidebarLayout>
                    <h2 className="text-xl text-center font-bold mb-4">Linhas removidas</h2>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2">
                            <PieRemovedLines data={data} />
                        </div>
                        <div className="w-full md:w-1/2">
                            <BarRemovedLines data={data} />
                        </div>
                    </div>
                </SidebarLayout>
        </GlobalYearStateProvider>
    );
};

export default ReportData
