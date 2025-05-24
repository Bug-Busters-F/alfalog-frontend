import React from 'react';
import Plot from 'react-plotly.js';

interface DataPoint {
  ds: string;
  y: number;
  trend?: number;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
}

interface ForecastChartProps {
  data: DataPoint[];
  forecastType: 1 | 2 | 3; // 1: Balança, 2: Exportações, 3: Importações
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data, forecastType }) => {
  const x = data.map(d => d.ds);
  const y = data.map(d => d.y);
  const yhat = data.map(d => d.yhat);
  const yhatLower = data.map(d => d.yhat_lower);
  const yhatUpper = data.map(d => d.yhat_upper);
  const trend = data.map(d => d.trend ?? null);

  let title
  if (forecastType === 1) title = 'Previsão da Balança Comercial';
  else if (forecastType === 2) title = 'Previsão das Exportações';
  else if (forecastType === 3) title = 'Previsão das Importações';

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      <Plot
        data={[
          {
            x: [...x, ...x.slice().reverse()],
            y: [...yhatUpper, ...yhatLower.slice().reverse()],
            fill: 'toself',
            fillcolor: 'rgba(30, 136, 229, 0.2)',
            line: { color: 'transparent' },
            type: 'scatter',
            name: 'Intervalo de Confiança',
            showlegend: true,
          },
          {
            x,
            y: yhat,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Previsão',
            line: { color: '#e53935' },
          },
          {
            x,
            y: trend,
            type: 'scatter',
            mode: 'lines',
            name: 'Tendência',
            line: { color: '#1A237E', dash: 'dot' },
          },
          {
            x,
            y,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Valor Real',
            line: { color: '#2E7D32' },
            marker: { color: '#2E7D32', size: 6 },
          },
        ]}
        layout={{
          title,
          xaxis: { title: 'Data', type: 'date' },
          yaxis: { title: 'Valor Agregado (R$/kg)' },
          autosize: true,
          margin: { t: 50, l: 50, r: 50, b: 50 },
          legend: { orientation: 'h', y: -0.3 },
        }}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

export default ForecastChart;
