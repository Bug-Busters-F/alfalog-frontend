import React from "react";
import Chart from "react-apexcharts";

interface Data {
  value: number;
  filter: string;
}

interface PieChartProps {
  data: Data[];
}

const PieRemovedLines: React.FC<PieChartProps> = ({ data }) => {
  const series = data.map((item) => item.value);
  const labels = data.map((item) => item.filter);

  const colorPalette = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFBF33", "#A133FF", "#33FFEC", "#FF7733", "#77FF33", "#7733FF", "#FF33FF", "#33A1FF"
  ];

  const options = {
    chart: {
      id: 'pie',
      width: "100%",
    },
    labels: labels,
    colors: colorPalette.slice(0, data.length),
    responsive: [{
      breakpoint: 600,
      options: {
        chart: {
          width: "100%"
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="w-full">
      <div id="chart">
        <Chart
          options={options}
          series={series}
          type="pie"
          width="100%" />
      </div>
    </div>
  );
};

export default PieRemovedLines;
