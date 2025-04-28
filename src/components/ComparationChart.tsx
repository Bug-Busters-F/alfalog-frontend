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
}

interface ChartSeries {
  name: string;
  data: number[];
}

interface Data {
  state: string;
  value: number;
  year: number;
}

interface LineChartProps {
  data: Data[];
  serie: string;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const estados = Array.from(new Set(data.map((item) => item.state)));

  const series: ChartSeries[] = estados.map((estado) => ({
    name: estado,
    data: data
      .filter((item) => item.state === estado)
      .sort((a, b) => a.year - b.year)
      .map((item) => item.value),
  }));

  const options: ChartOptions = {
    chart: {
      id: "line-chart",
      toolbar: { show: true },
    },
    xaxis: {
      categories: Array.from(new Set(data.map((item) => item.year.toString()))),
    },
    stroke: { curve: "smooth" },
  };

  return (
    <div className="p-5 rounded-lg shadow-md">
      <div className="shadow-md border-b border-sky-700 rounded-lg">
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
