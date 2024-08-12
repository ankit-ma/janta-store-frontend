import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityData } from "../redux/action";
import Loader from "../UI/Loader";
import { useState } from "react";
import { Link } from "react-router-dom";

import DashboardRight from "./dashboard-right/DashboardRight";
import Billing from "./dashboard-right/Billing";
import InventoryManagement from "./dashboard-right/InventoryManagement";
import CustomerDirectory from "./dashboard-right/CustomerDirectory";
import DailyInsight from "./dashboard-right/DailyInsight";
import DueLog from "./dashboard-right/DueLog";
import Notification from "./dashboard-right/Notification";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const activitiesRedux = useSelector(
    (state) => state.activities.activity.activityData
  );

  const activities = localStorage.getItem("activity").split(",");
  const [loading, setLoading] = useState(false);
  const [activeCss, setActiveCss] = useState("hover:text-red-500");

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Navigator */}
      <aside className="w-1/5 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Navigator</h2>
        <nav>
          <ul>
            {activities.map((activity, index) => (
              <li key={index} className="mb-6 text-xl">
                {props.selected === activity.toLowerCase() ? (
                  <Link
                    to={`/${activity.replaceAll(" ", "-").toLowerCase()}`}
                    className="text-red-500"
                  >
                    {activity}
                  </Link>
                ) : (
                  <Link
                    to={`/${activity.replaceAll(" ", "-").toLowerCase()}`}
                    className={activeCss}
                  >
                    {activity}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Right Section - Cards */}

      <main className="w-3/4 p-4">
        {loading ? (
          <Loader />
        ) : (
          props.selected === "dashboard" && <DashboardRight />
        )}
        {props.selected === "billing" && <Billing />}
        {props.selected === "inventory management" && <InventoryManagement />}
        {props.selected === "customer directory" && <CustomerDirectory />}
        {props.selected === "daily insight" && <DailyInsight />}
        {props.selected === "due log" && <DueLog />}
        {props.selected === "notification" && <Notification />}
      </main>
    </div>
  );
};

export default Dashboard;
