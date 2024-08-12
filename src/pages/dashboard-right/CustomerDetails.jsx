import React, { useState } from "react";

const CustomerDetails = ({
  setIsCustomerFound,
  totalPrice,
  isCustomerFound,
}) => {
  const [customerDetails, setLocalCustomerDetails] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    due: 0,
    currentBillAmount: totalPrice,
    totalAmount: totalPrice,
  });

  const handlePhoneNumberChange = async (e) => {
    const phoneNumber = e.target.value;
    setLocalCustomerDetails((prevDetails) => ({ ...prevDetails, phoneNumber }));
    if (phoneNumber) {
      // Simulate API call to get customer details
      const customer = dummyCustomers.find(
        (cust) => cust.phoneNumber === phoneNumber
      );
      if (customer) {
        setLocalCustomerDetails(customer);
        setIsCustomerFound(true);
      } else {
        setIsCustomerFound(false);
        setLocalCustomerDetails({
          ...customerDetails,
          phoneNumber,
          currentBillAmount: totalPrice,
          totalAmount: totalPrice,
        });
      }
    } else {
      setIsCustomerFound(false);
      setLocalCustomerDetails({
        ...customerDetails,
        phoneNumber,
        currentBillAmount: totalPrice,
        totalAmount: totalPrice,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleRegisterCustomer = () => {
    // Handle customer registration
    console.log("Registering customer:", customerDetails);
  };

  return (
    <div className="p-4 border-l">
      <h2 className="text-lg font-bold mb-4">Customer Details</h2>
      <div className="mb-4">
        <label className="block mb-1">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={customerDetails.phoneNumber}
          onChange={handlePhoneNumberChange}
          className="w-full p-2 border rounded bg-blue-100 text-blue-700 focus:outline-none focus:bg-blue-200 focus:border-blue-400"
        />
      </div>
      {!isCustomerFound && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleRegisterCustomer}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Register Customer
          </button>
        </>
      )}
      {isCustomerFound && (
        <div>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Due</label>
            <input
              type="number"
              name="due"
              value={customerDetails.due}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Current Bill Amount</label>
            <input
              type="number"
              name="currentBillAmount"
              value={customerDetails.currentBillAmount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={customerDetails.totalAmount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Dummy customer data for simulation
const dummyCustomers = [
  {
    phoneNumber: "1234567890",
    name: "John Doe",
    address: "123 Elm St",
    due: 50,
    currentBillAmount: 100,
    totalAmount: 150,
  },
  {
    phoneNumber: "0987654321",
    name: "Jane Smith",
    address: "456 Oak St",
    due: 30,
    currentBillAmount: 60,
    totalAmount: 90,
  },
];

export default CustomerDetails;
