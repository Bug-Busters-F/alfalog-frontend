import React from "react";
import Chart from "react-apexcharts";

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
  colors?: string[];
}

interface ChartSeries {
  name: string;
  data: number[];
}

interface Data {
  state: number;
  value: number;
  year: number;
  estadoNome: string;
}

interface LineChartProps {
  data: Data[];
  serie: string;
  estado1: string;
  estado2: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, serie, estado1, estado2 }) => {
  // Cores para as séries (pode personalizar)
  const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

  // Agrupa os dados por estado
  const series: ChartSeries[] = [
    {
      name: estado1,
      data: data
        .filter((item) => item.estadoNome === estado1)
        .sort((a, b) => a.year - b.year)
        .map((item) => item.value),
    },
    {
      name: estado2,
      data: data
        .filter((item) => item.estadoNome === estado2)
        .sort((a, b) => a.year - b.year)
        .map((item) => item.value),
    },
  ];

  // Obtém os anos únicos para o eixo X
  const years = Array.from(new Set(data.map((item) => item.year)))
    .sort()
    .map((year) => year.toString());

  const options: ChartOptions = {
    chart: {
      id: "comparison-chart",
      toolbar: { show: true },
    },
    xaxis: {
      categories: years,
    },
    stroke: { curve: "smooth" },
    colors: colors,
  };

  return (
    <div className="p-5 rounded-lg shadow-md">
      <div className="shadow-md border-b border-sky-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{serie} - Comparação entre {estado1} e {estado2}</h2>
        <Chart
          options={options}
          series={series}
          type="line"
          width="100%"
          height={350}
        />
      </div>
    </div>
  );
};

export default LineChart;