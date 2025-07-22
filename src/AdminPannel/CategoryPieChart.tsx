import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Electronics", value: 400 },
  { name: "Fashion", value: 300 },
  { name: "Grocery", value: 200 },
  { name: "Beauty", value: 100 },
  { name: "Mobiles", value: 200 },
  { name: "Footwear", value: 100 },
];

const COLORS = [
  "#3b82f6", 
  "#f97316", 
  "#22c55e", 
  "#a855f7", 
  "#0ea5e9", 
  "#eab308", 
];

const CategoryPieChart = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm w-full h-96 border border-black/10 ">
      <h2 className="text-base font-semibold font-heading">
        Sales by Category
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              whiteSpace: "normal",
              overflow: "hidden",
              textAlign: "center",
              paddingTop: 10,
              paddingBottom: 16, 
              width: "100%",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
