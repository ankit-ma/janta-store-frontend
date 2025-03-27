import { useState, useEffect } from "react";
import shopImage from "../../resources/background.webp";
import SalesDashboard from "./SalesDashboard";
import Loader from "../../UI/Loader";
const api = require("../../api/index");
function DashboardRight(props) {
  const [salesPerWeek, setSalesPerWeek] = useState([]);
  const [salesPerMonth, setSalesPerMonth] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todaySales, setTodaySales] = useState(0);
  const [monthSales, setMonthSale] = useState(0);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  useEffect(() => {
    api
      .fetchDashboardDetails()
      .then((response) => {
        console.log("response", response);
        setSalesPerWeek(response.data.salesPerDayForWeek);
        setSalesPerMonth(response.data.salesPerMonthForWeek);
        setIsLoading(false);
        setTodaySales(response.data.todaySales);
        setMonthSale(response.data.monthSales);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-2/6 p-6 text-sm bg-white shadow-lg rounded-r-lg">
          <div className="text-center  font-mono">
            <img
              src={shopImage}
              alt="Shop"
              className="w-32 h-32 rounded-full border-4 border-blue-500 mx-auto shadow-lg shadow-[#6366fcd0]"
            />
            <h2 className="text-2xl font-bold mt-4 text-[#6366fcd0]">
              Janta Store
            </h2>
            <div className="text-left">
              <table className="font-mono">
                <tr className="p-2">
                  <td className="text-gray-700 font-bold align-text-top">
                    Owner
                  </td>
                  <td className="text-gray-700 font-bold align-text-top">:</td>
                  <td className="text-blue-700 align-text-top">Ankit Kumar</td>
                </tr>
                <tr className="p-2">
                  <td className="text-gray-700 align-text-top font-bold">
                    Address
                  </td>
                  <td className="text-gray-700 font-bold align-text-top">:</td>
                  <td className="text-blue-700 align-text-top">
                    A3 Vrindawan Colony, Gobarshahi, Muzaffarpur Bihar 843146
                  </td>
                </tr>
                <tr className="p-2">
                  <td className="text-gray-700 align-text-top font-bold">
                    Phone
                  </td>
                  <td className="text-gray-700 font-bold align-text-top">:</td>
                  <td className="text-blue-700 align-text-top">
                    +91 6206744181, +91 9546649519
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="text-gray-700">
            <table className="font-mono">
              <tr className="p-2">
                <td className="text-gray-700 font-bold align-text-top">
                  GSTIN
                </td>
                <td className="text-gray-700 font-bold align-text-top">:</td>
                <td className="text-blue-700 align-text-top">21AAPK12BX1Z</td>
              </tr>
              <tr className="p-2">
                <td className="text-gray-700 align-text-top font-bold">Type</td>
                <td className="text-gray-700 font-bold align-text-top">:</td>
                <td className="text-blue-700 align-text-top">
                  Grocery, Daily household items.
                </td>
              </tr>
            </table>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-4/6 p-6 overflow-auto">
          <div className="space-y-4">
            <div className="p-4 bg-white">
              <h3 className="text-xl p-2 font-bold text-gray-500 border-b-2 border-dotted border-[#6366fcd0]">
                Sales
              </h3>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-2 ">
                  <h4 className="text-lg font-bold">Today</h4>
                  <p className="text-2xl font-bold text-yellow-600">
                    ₹ {todaySales}
                  </p>
                </div>
                <div className="p-2   ">
                  <h4 className="text-lg font-bold">This Month</h4>
                  <p className="text-2xl font-bold text-green-600">
                    ₹ {monthSales}
                  </p>
                </div>
              </div>

              {!isLoading && salesPerWeek.length > 0 && (
                <SalesDashboard
                  salesPerWeek={salesPerWeek}
                  salesPerMonth={salesPerMonth}
                />
              )}
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl p-2 font-bold text-gray-500 border-b-2 border-dotted border-[#6366fcd0]">
                Customer Interaction
              </h3>
              {/* Add customer interaction content */}
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold text-yellow-500">
                Finance Overview
              </h3>
              {/* Add finance overview content */}
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold text-yellow-500">
                Employee Overview
              </h3>
              {/* Add employee overview content */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardRight;
