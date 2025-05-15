import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityData, logout } from "../redux/action";
import Loader from "../UI/Loader";
import { useState } from "react";
import { Link } from "react-router-dom";

import DashboardRight from "./dashboard-right/DashboardRight";
import Billing from "./dashboard-right/Billing";
import Inventory from "./dashboard-right/Inventory";
import CustomerDirectory from "./dashboard-right/CustomerDirectory";
import DueLog from "./dashboard-right/DueLog";
import Notification from "./dashboard-right/Notification";
import StaffManagement from "./dashboard-right/StaffManagement";
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { activity } = useSelector((state) => state.activities);

  const activities = activity;
  useEffect(() => {
    if (activities.length === 0) {
      // dispatch(logout());
      const localActivity = localStorage.getItem("activity").split(",");
      dispatch(fetchActivityData(localActivity));
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [activeCss, setActiveCss] = useState("hover:text-[#0077b6]");

  return (
    <div className="min-h-screen flex font-mono">
      {/* Left Section - Navigator */}
      <aside className="w-1/7 bg-[#ffffff] p-3 text-black border-r-2 border-[#6366fcd0]">
        {/* <h2 className="text-2xl font-bold mb-4 px-2">Navigator</h2> */}
        <nav className="">
          <ul>
            {activities.map((activity, index) =>
              props.selected === activity.toLowerCase() ? (
                <Link
                  to={`/store/${activity.replaceAll(" ", "-").toLowerCase()}`}
                  className="text-[#dfe9ef]"
                >
                  <li
                    key={index}
                    className={`mb-4 text-m px-4 py-2 bg-[#6366fcd0] text-white rounded-xl shadow-md hover:shadow-lg transition-all`}
                  >
                    {activity}
                  </li>
                </Link>
              ) : (
                <Link
                  to={`/store/${activity.replaceAll(" ", "-").toLowerCase()}`}
                  className={activeCss}
                >
                  <li
                    key={index}
                    className={`mb-4 px-4 py-2 text-m hover:rounded-xl hover:shadow-lg hover:bg-[#6366fcd0] hover:text-white`}
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
        {/* {props.selected === "staff management" && <StaffManagement />} */}
        {props.selected === "due log" && <DueLog />}
        {/* {props.selected === "notification" && <Notification />} */}
      </main>
    </div>
  );
};

export default Dashboard;
