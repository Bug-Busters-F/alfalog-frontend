import React from 'react';
import Chart from 'react-apexcharts';

interface DataPoint {
  year: number;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  forecastData: DataPoint[];
}

const AreaChart: React.FC<AreaChartProps> = ({ data, forecastData }) => {
  // Adiciona o último ponto de dados reais no início da série de previsão (continuidade visual)
  let forecastSeriesData: DataPoint[] = [];
  if (data.length > 0) {
    const lastReal = data[data.length - 1];
    forecastSeriesData = forecastData.length > 0
      ? [{ year: lastReal.year, value: lastReal.value }, ...forecastData]
      : [];
  }

  // Prepara as séries para o gráfico: x como timestamp para o ano
  const series = [
    {
      name: 'Dados Reais',
      data: data.map(item => ({ x: new Date(item.year, 0, 1).getTime(), y: item.value })),
    },
    {
      name: 'Previsão',
      data: forecastSeriesData.map(item => ({ x: new Date(item.year, 0, 1).getTime(), y: item.value })),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: true, // 🔥 Ativa a toolbar interativa
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: { enabled: true }, // 🔍 Ativa o zoom interativo
    },
    colors: ['#3B82F6', '#F97316'],
    stroke: {
      curve: 'smooth',
      width: 2,
      dashArray: [0, 4], // Traço liso e tracejado para diferenciação
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        opacityFrom: 0.7,
        opacityTo: 0.0,
        stops: [0, 100],
      },
    },
    markers: {
      size: 4,
    },
    xaxis: {
      type: 'datetime',
      title: { text: 'Ano' },
      labels: {
        format: 'yyyy',
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => val.toLocaleString(),
      },
    },
    tooltip: {
      x: {
        format: 'yyyy',
      },
    },

    legend: {
      position: 'top',
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Comparação de Dados Reais e Previsão</h2>
      <Chart options={options} series={series} type="area" height={350} width="100%" />
    </div>
  );
};

export default AreaChart;
