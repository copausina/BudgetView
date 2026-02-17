import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import type { CategoryTotal } from "../types/analytics";
import { useState } from "react";

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
  "#f97316",
  "#64748b",
  "#21fce2e0",
  "#286b0aff",
];

export default function CategoryPieChart({
  data,
  title,
}: CategoryPieChartProps) {
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(new Set());

  const filteredData = data.filter(
    d => !hiddenCategories.has(d.category)
  );

  const renderLegend = () => {
    return (
      <ul className="flex flex-wrap justify-center gap-2 mt-2">
        {data.map((entry, index) => {
          const isHidden = hiddenCategories.has(entry.category);
          return (
            <li
              key={entry.category}
              className={`flex items-center gap-1 cursor-pointer ${
                isHidden ? "opacity-40" : "opacity-100"
              }`}
              onClick={() => toggleCategory(entry.category)}
            >
              <div
                className="w-2 h-2 rounded-sm"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              {entry.category}
            </li>
          );
        })}
      </ul>
    );
  };

  function toggleCategory(category: string) {
    setHiddenCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full h-[350px] flex flex-col">
      <h2 className="text-lg font-semibold text-center mb-2">
        {title}
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="total"
              nameKey="category"
              outerRadius="80%"
              label={false}
            >
              {data.map((entry, index) => {
                const isHidden = hiddenCategories.has(entry.category);
                if (isHidden) return null;
                return (
                  <Cell
                    key={`cell-${entry.category}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                );
              })}
            </Pie>

            <Tooltip />
            {/* custom legend height must be explicitly set or else pie chart will randomly change size on refreshes */}
            <Legend content={renderLegend} height={74} wrapperStyle={{ fontSize: "15px" }} /> 
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
