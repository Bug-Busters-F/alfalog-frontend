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
      height: 350
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
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Linhas removidas</h2>
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
