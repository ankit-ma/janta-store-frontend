import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityData } from "../redux/action";
import Loader from "../UI/Loader";
import { useState } from "react";
import { Link } from "react-router-dom";

import DashboardRight from "./dashboard-right/DashboardRight";
import Billing from "./dashboard-right/Billing";
import InventoryManagement from "./dashboard-right/InventoryManagement";
import Inventory from "./dashboard-right/Inventory";
import CustomerDirectory from "./dashboard-right/CustomerDirectory";
import DailyInsight from "./dashboard-right/DailyInsight";
import DueLog from "./dashboard-right/DueLog";
import Notification from "./dashboard-right/Notification";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { activity } = useSelector((state) => state.activities);

  const activities = activity;
  const [loading, setLoading] = useState(false);
  const [activeCss, setActiveCss] = useState("hover:text-[#0077b6]");

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Navigator */}
      <aside className="w-1/5  text-white bg-[#03045e]">
        {/* <h2 className="text-2xl font-bold mb-4 px-2">Navigator</h2> */}
        <nav>
          <ul>
            {activities.map((activity, index) =>
              props.selected === activity.toLowerCase() ? (
                <Link
                  to={`/${activity.replaceAll(" ", "-").toLowerCase()}`}
                  className="text-[#0077b6]"
                >
                  <li key={index} className={`mb-2 text-xl px-4 py-2 bg-white`}>
                    {activity}
                  </li>
                </Link>
              ) : (
                <Link
                  to={`/${activity.replaceAll(" ", "-").toLowerCase()}`}
                  className={activeCss}
                >
                  <li
                    key={index}
                    className={`mb-2 px-4 py-2 text-xl hover:bg-white`}
                  >
                    {activity}
                  </li>
                </Link>
              )
            )}
          </ul>
        </nav>
      </aside>

      {/* Right Section - Cards */}

      <main className="w-4/5 p-4">
        {loading ? (
          <Loader />
        ) : (
          props.selected === "dashboard" && <DashboardRight />
        )}
        {props.selected === "billing" && <Billing />}
        {props.selected === "inventory management" && <Inventory />}
        {props.selected === "customer directory" && <CustomerDirectory />}
        {props.selected === "daily insight" && <DailyInsight />}
        {props.selected === "due log" && <DueLog />}
        {props.selected === "notification" && <Notification />}
      </main>
    </div>
  );
};

export default Dashboard;
