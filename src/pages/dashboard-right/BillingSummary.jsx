import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Loader from "../../UI/Loader";

const api = require("../../api/index");
const BillingSummary = ({ onClose }) => {
  const { products, totalPrice, customerDetails } = useSelector(
    (state) => state.bills
  );
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [showPyamentError, setShowPyamentError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handlePaymentChange = (event) => {
    setSelectedPaymentMode(event.target.value);
    setShowPyamentError(false);
  };
  const generateBillhandler = async () => {
    if (selectedPaymentMode !== "") {
      //call generate bill api
      setLoading(true);
      console.log("Inside paymentMode api");
      const body = {
        customerDetails,
        totalPrice,
        products,
        paymentMode: selectedPaymentMode,
      };
      api
        .generateBillAPi(body)
        .then((response) => {
          console.log("Pdf Downloded successfully", response);

          // let filename = response.data.fileName; // Default filename

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "bill.pdf");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          setLoading(false);
        })
        .catch((error) => {
          console.error("File upload error", error);
          setLoading(false);
        });
    } else {
      setShowPyamentError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <IoCloseSharp className="h-6 w-6" />
          </button>

          {/* Store Header */}
          <div className="text-center mb-4">
            <p className="text-lg font-semibold">
              -------------- Janta Store -----------------
            </p>
          </div>

          {/* Customer Details */}
          <hr />
          <div className="p-4 bg-blue-100 rounded-lg">
            <h1 className="text-xl font-semibold mb-4">Customer Details</h1>
            <p>
              <strong>Customer Name: </strong>
              {customerDetails.customerName}
            </p>
            <p>
              <strong>Phone Number: </strong>
              +91- {customerDetails.phoneNumber}
            </p>
            <p>
              <strong>Address: </strong>
              {customerDetails.address}
            </p>
          </div>
          <hr className="my-4" />

          {/* Payment Details */}
          <div className="p-4 bg-green-100 rounded-lg">
            <h1 className="text-xl font-semibold mb-4">Bill Details</h1>
            <p>
              <strong>Due: </strong>₹ {customerDetails.due}
            </p>
            <p>
              <strong>Total Price: </strong>₹{" "}
              {customerDetails.due + customerDetails.currentBillAmount}
            </p>
            <p>
              <strong>Quantity: </strong>
              {products.length}
            </p>
          </div>
          <hr className="my-4" />

          {/* Payment Mode Section */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <h1 className="text-xl font-semibold mb-4">Payment Mode</h1>
            <ul className="space-y-2">
              <li className="flex items-center">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMode"
                  value="Cash"
                  checked={selectedPaymentMode === "Cash"}
                  onChange={handlePaymentChange}
                  className="mr-2 focus:ring-blue-500"
                />
                <label htmlFor="cash" className="text-gray-700">
                  Cash
                </label>
              </li>
              <li className="flex items-center">
                <input
                  type="radio"
                  id="online"
                  name="paymentMode"
                  value="Online"
                  checked={selectedPaymentMode === "Online"}
                  onChange={handlePaymentChange}
                  className="mr-2 focus:ring-blue-500"
                />
                <label htmlFor="online" className="text-gray-700">
                  Online
                </label>
              </li>
              <li className="flex items-center">
                <input
                  type="radio"
                  id="due"
                  name="paymentMode"
                  value="Due"
                  checked={selectedPaymentMode === "Due"}
                  onChange={handlePaymentChange}
                  className="mr-2 focus:ring-blue-500"
                />
                <label htmlFor="due" className="text-gray-700">
                  Due
                </label>
              </li>
            </ul>
            {showPyamentError && (
              <p className="text-red-500">Please select Pyment Mode</p>
            )}
          </div>

          {/* Buttons Section */}
          <div className="flex justify-between mt-6">
            <button
              onClick={generateBillhandler}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingSummary;
