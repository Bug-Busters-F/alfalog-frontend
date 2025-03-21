import React, { useState } from "react";
import Brazil from "@react-map/brazil";
import AreaChart from "../components/AreaChart";

const BrazilMapComponent: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [chartKey, setChartKey] = useState(0) //recria o grafico

  const handleSelect = (state: string | null) => {
    if (state) {
      setSelectedState(state);
      setChartKey((prevKey) => prevKey + 1) //att o grafico
    }
  }

  const data = [ //dados do grafico
    { year: 123, value: 21 },
    { year: 124, value: 30 },
    { year: 125, value: 50 },
    { year: 126, value: 10 },
  ]

  console.log(selectedState)
  
  return (
    <div>
      <Brazil
        type="select-single"
        size={400}
        mapColor="#e0e0e0"
        strokeColor="#000"
        strokeWidth={1}
        hoverColor="#a4e44f"
        selectColor="#6eb8f5"
        hints={true}
        hintTextColor="white"
        hintBackgroundColor="black"
        onSelect={handleSelect}
      />
      
      {selectedState && (
        <div key={chartKey}> 
          <h3>Dados do estado: {selectedState}</h3>
            <AreaChart data={data}>
            </AreaChart>
        </div>
      )}
    </div>
  )
}

export default BrazilMapComponent;