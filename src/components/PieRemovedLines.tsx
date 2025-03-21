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

  const options = {
    chart: {
      id: 'pie',
      width: "100%",
    },
    labels: labels,
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
