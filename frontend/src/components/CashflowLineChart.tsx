import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import type { CashflowOverPeriod } from "../types/analytics";

interface CashflowOverTimeProps {
  data: CashflowOverPeriod[];
}

export default function CashflowOverTime({ data }: CashflowOverTimeProps) {
  return (
    <div className="w-full h-[350px] bg-white rounded-2xl shadow p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Cash Flow By Month
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value: number) =>
              `$${value.toFixed(2)}`
            }
          />

          <Line
            dataKey="income"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          
          <Line
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
