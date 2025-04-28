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
  markers?: {
    size: number;
  };
  yaxis: {
    opposite: boolean;
    labels: {
      formatter: (value: number) => string;
    };
  };
}

interface ChartSeries {
  name: string;
  data: number[];
}

interface Data {
  value: number;
  year: number;
}

interface AreaChartProps {
  data: Data[];
}

const AreaChart: React.FC<AreaChartProps> = (props: AreaChartProps) => {
  const series: ChartSeries[] = [
    {
      name: "Balança Comercial",
      data: props.data.map((item) => item.value),
    },
  ];

  const options: ChartOptions = {
    chart: {
      id: "area-chart",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: props.data.map((item) => item.year.toString()),
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    markers: {
      size: 5,
    },
    yaxis: {
      opposite: true,
      labels: {
        formatter: (value) => `${value < 0 ? "" : "+"}${value}`,
      },
    },
  };

  return (
    <div className="p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Evolução da Balança Comercial</h2>
      <div className="shadow-mdborder-b border-sky-700 rounded-lg">
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
