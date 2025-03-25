import React from "react";
import Chart from "react-apexcharts";

// Definindo a tipagem para as opções do gráfico
interface ChartOptions {
  chart: {
    id: string;
    toolbar?: {
      show: boolean;
    };
  };
  xaxis: {
    categories: string[];
  };
  stroke?: {
    curve: "smooth" | "straight" | "stepline";
  };
  fill?: {
    type: "solid" | "gradient";
    gradient?: {
      shadeIntensity: number;
      opacityFrom: number;
      opacityTo: number;
      stops: number[];
    };
  };
}

// Definindo a tipagem para os dados do gráfico
interface ChartSeries {
  name: string;
  data: number[];
}

interface Data{
    value: number
    year: number
}

interface AreaChartProps{
    data: Data[]
}

const AreaChart: React.FC<AreaChartProps> = (props: AreaChartProps) => {
  // Dados do gráfico
  const series: ChartSeries[] = [
    {
      name: "Preço Agregado",
      data: props.data.map((item)=>item.value),
    },
  ];

  // Opções do gráfico
  const options: ChartOptions = {
    chart: {
      id: "area-chart",
      toolbar: {
        show: true, // Mostra a barra de ferramentas (zoom, exportação, etc.)
      },
    },
    xaxis: {
      categories: props.data.map((item=>item.year.toString())), // Categorias do eixo X
    },
    stroke: {
      curve: "smooth", // Linha suavizada
    },
    fill: {
      type: "gradient", // Preenchimento com gradiente
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  return (
    <div className="p-5 bg-sky-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Evolução da Balança Comercial</h2>
      <div className="shadow-md bg-gray-200 border-b border-sky-700 rounded-lg">
        <Chart
          options={options}
          series={series}
          type="area"
          width="100%"
          height={350}
        />
      </div>
    </div>
  );
};

export default AreaChart;