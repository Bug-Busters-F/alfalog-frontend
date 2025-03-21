import React from "react";
import Chart from "react-apexcharts";

interface Data {
  value: number;
  filter: string;
}

interface BarChartProps {
  data: Data[];
}

const BarRemovedLines: React.FC<BarChartProps> = ({ data }) => {

  const series = [{
    data: data.map((item) => item.value)
  }];

  const categories = data.map((item) => item.filter);

  const options = {
    chart: {
      id: 'bar',
      height: "100%"
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories,
    },
      responsive: [
          {
              breakpoint: 600,
              options: {
                  chart: {
                      height: "auto"
                  }
              }
          }
      ]

  };

  return (
    <div>
      <div id="chart">
        <Chart
         options={options}
         series={series}
         type="bar"
         width="100%" />
      </div>
    </div>
  );
};

export default BarRemovedLines;
