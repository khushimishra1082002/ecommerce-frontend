import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const salesData = [
  { month: "Jan", revenue: 1200, orders: 80 },
  { month: "Feb", revenue: 2100, orders: 110 },
  { month: "Mar", revenue: 800, orders: 50 },
  { month: "Apr", revenue: 1600, orders: 95 },
  { month: "May", revenue: 2400, orders: 130 },
  { month: "Jun", revenue: 2800, orders: 140 },
];

const RevenueChart = () => {
  return (
    <div className="p-5 bg-white rounded-xl shadow border border-black/10 space-y-5">
     <h2 className="text-base font-semibold font-heading">Sales Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
