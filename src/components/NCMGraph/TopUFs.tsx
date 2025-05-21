import { BarChart } from "../PathBarChart";

interface NCMBarChartProps {
    data: { name: string; value: number }[];
}

export default function NCMBarChart({ data }: NCMBarChartProps) {
    return (
        <div className="flex flex-col gap-4 px-4 py-2 bg-white rounded-md shadow mb-6">
            <BarChart data={data} />
        </div>
    );
}
