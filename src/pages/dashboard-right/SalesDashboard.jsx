import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function getLast7Days() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    last7Days.push(days[day.getDay()]);
  }
  return last7Days;
}

function getLast30Days() {
  const today = new Date();
  const last30Days = [];
  for (let i = 29; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    last30Days.push(day.getDate());
  }
  return last30Days;
}
function SalesDashboard(props) {
  const [dailySalesData, setDailySalesData] = useState({
    labels: getLast7Days(),
    datasets: [
      {
        label: "Daily Sales",
        data: props.salesPerWeek,
        borderColor: "#6366fcd0",
        backgroundColor: "rgba(99, 102, 252, 0.2)",
        fill: true,
      },
    ],
  });
  const [monthlySalesData, setMonthlySalesData] = useState({
    labels: getLast30Days(),
    datasets: [
      {
        label: "Monthly Sales",
        data: props.salesPerMonth,
        borderColor: "#6366fcd0",
        backgroundColor: "rgba(99, 102, 252, 0.2)",
        fill: true,
      },
    ],
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="p-2">
          <h4 className="text-lg font-bold">Daily Sales (Last Week)</h4>
          <div className="h-40">
            <Line
              data={dailySalesData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="p-2">
          <h4 className="text-lg font-bold">Monthly Sales (Last Month)</h4>
          <div className="h-40">
            <Line
              data={monthlySalesData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesDashboard;
