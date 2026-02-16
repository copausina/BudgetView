import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import type { CategoryTotal } from "../types/analytics";

interface CategoryPieChartProps {
  data: CategoryTotal[];
  title: string;
}

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];

export default function CategoryPieChart({
  data,
  title,
}: CategoryPieChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full h-[350px] flex flex-col">
      <h2 className="text-lg font-semibold text-center mb-2">
        {title}
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              outerRadius="80%"
              label={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "15px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
