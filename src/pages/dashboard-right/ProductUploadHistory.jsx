import { useEffect, useState } from "react";
import Pagination from "../../UI/Pagination";
import { MdOutlineDownloading } from "react-icons/md";

const api = require("../../api/index");

function ProductUploadHistory(props) {
  const [history, setHistory] = useState([]);
  const [historyLoded, setHistoryLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchProducts(pageNumber);
  }, []);

  const fetchProducts = (pageNum) => {
    setPageNumber(pageNum);

    api
      .fetchUploadHistory(10, pageNum)
      .then((response) => {
        console.log("Response here", response.data.content);
        setHistory(response.data.content);

        setTotalPage(response.data.totalPages);
        setHistoryLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {historyLoded && (
        <div className="relative overflow-x-auto  sm:rounded-lg py-10">
          <table className="w-full text-sm text-left rtl:text-right text-[#03045e] font-bold shadow-md">
            <thead className="text-xs text-white uppercase bg-[#03045e]">
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
                  className={`bg-white border-b hover:bg-gray-50`}
                >
                  <td className="px-6 py-4 text-black">{record.id}</td>
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
                    {record.status === "Completed" && (
                      <a
                        href="#"
                        className="font-medium text-xl text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <MdOutlineDownloading />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={pageNumber}
            totalPages={totalPage}
            onPageChange={fetchProducts}
          />
        </div>
      )}
    </>
  );
}

export default ProductUploadHistory;
