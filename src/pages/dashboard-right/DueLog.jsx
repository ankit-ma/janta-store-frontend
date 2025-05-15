import { useEffect, useState } from "react";
const api = require("../../api/index");

export const fetchDueRecords = async () => {
  return api
    .fetchDueRecords()
    .then((response) => response)
    .catch((error) => {
      console.error("Data Fetch error", error);
      throw error;
    });
};

function DueLog() {
  const [dueRecords, setDueRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDueRecords()
      .then((res) => {
        const sortedData = res.data.sort((a, b) => b.dueAmount - a.dueAmount);
        setDueRecords(sortedData);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">DueLog</h2>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dueRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white p-4 shadow rounded-xl border border-gray-200 hover:shadow-md transition duration-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {record.customerName}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Last Due: ₹{record.lastDueAmount.toFixed(2)}
              </p>
              <p className="text-xl font-semibold text-red-600 mb-1">
                Current Due: ₹{record.dueAmount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">
                Last Updated:{" "}
                {new Date(record.lastUpdatedOn).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DueLog;
