import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const EnergyChart = ({ usageHistory }) => {
  return (
    <div className="mt-6 w-full max-w-lg">
      <h2 className="text-lg font-semibold mb-2">Energy Usage Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={usageHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="energy" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;