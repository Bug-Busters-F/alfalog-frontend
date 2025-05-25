import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface Data {
  name: string;
  value: number;
}

interface BarChartProps {
  data: Data[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<{
    series: { data: number[] }[];
    options: ApexOptions;
  }>( {
    series: [{ data: [] }],
    options: {
      chart: {
        type: "bar",
        height: 500,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: [],
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '60%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      grid: {
        borderColor: "#e0e0e0",
        strokeDashArray: 3,
      },
      tooltip: {
        theme: "light",
      },
      colors: [
        "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
        "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
        "#2E294E", "#1B998B", "#2E86AB", "#F26419", "#A23B72",
        "#E2C044"
      ],
    },
  });

useEffect(() => {
  const values = data.map((item) => item.value);
  const labels = data.map((item) => item.name);

  setChartData((prev) => ({
    ...prev,
    series: [{ name: "Quantidade", data: values }],
    options: {
      ...prev.options,
      xaxis: {
        ...prev.options.xaxis,
        categories: labels,
      },
      tooltip: {
        ...prev.options.tooltip,
        y: {
          formatter: (value: number) => `${value}`,
          title: {
            formatter: () => "Quantidade",
          },
        },
      },
    },
  }));
}, [data]);


  return (
    <div className="w-full">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartData.options.chart?.height}
      />
    </div>
  );
};
