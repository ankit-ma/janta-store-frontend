import { useState, useEffect } from "react";

const api = require("../../api/index");
function DashboardRight(props) {
  const [customerDetails, setCustomerDetails] = useState([]);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  useEffect(() => {
    api
      .fetchCustomerDetailsForDashboard(10, 0)
      .then((response) => {
        setCustomerDetails(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customerDetails.map((customer) => {
          const date = new Date(customer.lastBilledDate);
          return (
            <div key={customer.id} className="bg-white p-4 shadow rounded">
              <p>{customer.customerName}</p>
              <p>+91- {customer.phoneNumber}</p>
              <p>{customer.dueAmount}</p>
              <p>{customer.address}</p>
              <p>{formatter.format(date)}</p>
              <p>{customer.bills}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DashboardRight;
