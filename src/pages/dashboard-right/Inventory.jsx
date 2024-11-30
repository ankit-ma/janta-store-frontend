import MyButton from "../../UI/MyButton";
import InventoryManagement from "./InventoryManagement";
import Pagination from "../../UI/Pagination";
import { useState, useEffect } from "react";
import { LiaFileUploadSolid } from "react-icons/lia";

import { MdModeEdit } from "react-icons/md";

const api = require("../../api/index");

const Inventory = () => {
  const [showUpoload, setShowUpload] = useState(false);
  const [products, setProducts] = useState([]);
  const [inventoryLoaded, setInventoryLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchInventory(pageNumber);
  }, []);

  const fetchInventory = (pageNum) => {
    setPageNumber(pageNum);

    api
      .fetchInventoryDetails(10, pageNum)
      .then((response) => {
        console.log("Response here", response.data.content);
        setProducts(response.data.content);

        setTotalPage(response.data.totalPages);
        setInventoryLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadButtonHandler = () => {
    console.log("upload button handler");
    setShowUpload(true);
  };
  const hideUpload = () => {
    setShowUpload(false);
  };
  return (
    <>
      {showUpoload && <InventoryManagement hideUpload={hideUpload} />}
      {!showUpoload && (
        <div className="container">
          {/* Filter div */}
          <div></div>
          <button
            className="flex hover:text-[#00b4d8]"
            onClick={uploadButtonHandler}
          >
            <strong>Upload Product</strong>
            <LiaFileUploadSolid className="text-2xl" />
          </button>
          <div className="">
            <div className="relative mb-4"></div>
            <div className="max-h-96 overflow-y-auto overflow-x-auto mb-4">
              <table className="min-w-full bg-white ">
                <thead className="sticky top-0 text-xs text-white bg-[#03045e] light:bg-gray-700 dark:text-white">
                  <tr>
                    <th className="py-2 px-4 border-b">Action</th>
                    <th className="py-2 px-4 border-b">Sl.No</th>
                    <th className="py-2 px-4 border-b">Product Name</th>
                    <th className="py-2 px-4 border-b">Brand Name</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Base Price</th>
                    <th className="py-2 px-4 border-b">SGST(%)</th>
                    <th className="py-2 px-4 border-b">CGST(%)</th>
                    <th className="py-2 px-4 border-b">Discount(%)</th>
                    <th className="py-2 px-4 border-b">
                      Additional Information{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryLoaded &&
                    products.map((product, index) => (
                      <tr key={index}>
                        <td className="text-md py-1 px-2 border-b ">
                          <MdModeEdit />
                        </td>
                        <td className="text-xs py-1 px-2 border-b">
                          {index + 1}
                        </td>
                        <td className="text-xs py-1 px-2 border-b">
                          {product.productName}
                        </td>
                        <td className="text-xs py-1 px-2 border-b">
                          {product.brandName}
                        </td>
                        <td className="text-xs py-1 px-2 border-b">
                          {product.quantity}
                          <td />
                        </td>
                        <td className="text-xs py-1 px-2 border-b">
                          ₹ {product.mrp}
                        </td>
                        <td className="text-xs py-1 px-2 border-b">
                          {product.sgst}%
                        </td>
                        <td className="text-xs py-1 px-2 border-b">
                          {product.cgst}%
                        </td>
                        <td className="text-xs py-1 px-2 border-b">
                          {product.discount}%
                        </td>
                        <td className="text-xs py-1 px-2 border-b">
                          {product.additionalInformation}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <hr />
            <Pagination
              currentPage={pageNumber}
              totalPages={totalPage}
              onPageChange={fetchInventory}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Inventory;
