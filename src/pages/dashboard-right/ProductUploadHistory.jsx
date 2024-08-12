import { useEffect, useState } from "react";

const api = require("../../api/index");

function ProductUploadHistory(props) {
  const [history, setHistory] = useState([]);
  const [historyLoded, setHistoryLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api
      .fetchUploadHistory(10, pageNumber)
      .then((response) => {
        console.log("Response here", response.data.content);
        setHistory(response.data.content);
        setHistoryLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {historyLoded && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Request Id
                </th>
                <th scope="col" className="px-6 py-3">
                  File Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Upload Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr
                  key={index}
                  className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{record.id}</td>
                  <td className="px-6 py-4">{record.fileName}</td>
                  <td className="px-6 py-4">
                    {new Date(record.loggedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {record.status === "Completed" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      )}
                      {record.status === "In Progress" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-orange-500 me-2"></div>
                      )}
                      {record.status === "Error" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      )}{" "}
                      {record.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ProductUploadHistory;
