import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data, colors }) => {
  const defaultColors = ["#4CAF50", "#FF9800", "#F44336"];
  const barColors = colors || defaultColors;

  const getBarColor = (index) => {
    return barColors[index % barColors.length];
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded-lg border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.priority}
          </p>
          <p className="text-sm text-gray-600">
            Count:{" "}
            <span className="text-sm font-medium text-gray-900">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid stroke="none" />
        <XAxis
          dataKey="priority"
          tick={{ fill: "#555", fontSize: 12 }}
          stroke="none"
        />
        <YAxis tick={{ fill: "#555", fontSize: 12 }} stroke="none" />
        <Tooltip
          content={<CustomToolTip />}
          cursor={{ fill: "transparent" }}
        />
        <Bar
          dataKey="count"
          name={"priority"}
          radius={[10, 10, 0, 0]}
        >
          {data?.map((entry, index) => (
            <Cell key={index} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
