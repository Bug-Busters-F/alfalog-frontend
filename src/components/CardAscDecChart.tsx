import React from "react"
import Chart from "react-apexcharts"
import { ApexOptions } from "apexcharts"

interface SeriesData {
  name: string
  data: number[]
}

interface CardLineChartProps {
  startYear: number
  endYear: number
  series: SeriesData[]
  height?: number
  title?: string
}

const CardLineChart: React.FC<CardLineChartProps> = ({
  startYear,
  endYear,
  series,
  height = 350,
  title,
}) => {
  const categories = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => (startYear + i).toString()
  )

  const options: ApexOptions = {
    chart: {
      type: "line",
      height,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 4,
      curve: "straight",
    },
    legend: {
      tooltipHoverFormatter: function (val: string, opts: any) {
        return (
          val +
          " - <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        )
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: categories,
    },
    tooltip: {
      y: series.map(() => ({
        title: {
          formatter: (val: string) => val,
        },
      })),
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  }

  return (
    <div className="p-2 bg-sky-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2 text-white text-center">
        {title || "Estatísticas por Ano"}
      </h2>
      <div className="shadow-md bg-gray-100 border-b border-gray-300 rounded-lg">
        <Chart options={options} series={series} type="line" height={height} />
      </div>
    </div>
  )
}

export default CardLineChart
