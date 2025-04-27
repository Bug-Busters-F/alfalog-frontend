import React from "react"
import Chart from "react-apexcharts"

interface FilteredData {
  label: string
  removedCount: number
}

interface FilteredDataBarChartProps {
  data: FilteredData[]
}

interface BarChartOptions {
  chart: {
    type: "bar"
    height: number
    toolbar?: {
      show: boolean
    }
  }
  plotOptions: {
    bar: {
      borderRadius: number
      borderRadiusApplication?: "end" | "around"
      horizontal: boolean
    }
  }
  dataLabels?: {
    enabled: boolean
  }
  xaxis: {
    categories: string[]
  }
}

const FilteredDataBarChart: React.FC<FilteredDataBarChartProps> = ({
  data,
}) => {
  const series = [
    {
      name: "Linhas Removidas",
      data: data.map((item) => item.removedCount),
    },
  ]

  const options: BarChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.map((item) => item.label),
    },
  }

  return (
    <div className="p-5 bg-sky-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">
        Linhas Removidas por Motivo
      </h2>
      <div className="shadow-md bg-gray-200 border-b border-sky-700 rounded-lg">
        <Chart options={options}
        series={series}
        type="bar"
        height={350} />
      </div>
    </div>
  )
}

export default FilteredDataBarChart
