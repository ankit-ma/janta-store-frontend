import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalPrice, updateUser, logout } from "../../redux/action";
import Loader from "../../UI/Loader";

const api = require("../../api/index");
const CustomerDetails = ({ setIsCustomerFound, isCustomerFound }) => {
  const { customerDetails, totalPrice } = useSelector((state) => state.bills);
  const dispatch = useDispatch();
  //   const [customerDetails, setLocalCustomerDetails] = useState({
  //     customerName: "",
  //     phoneNumber: "",
  //     address: "",
  //     due: 0,
  //     currentBillAmount: totalPrice,
  //     totalAmount: totalPrice,
  //   });
  const [isLoading, setLoader] = useState(false);
  const phoneNumberRegex = /^[6-9]\d{9}$/; // checks on 10 input
  const phoneRegexIncrementally = /^[6-9]{1}\d{0,9}$/; // chekc on each input
  const handlePhoneNumberChange = async (e) => {
    const phoneNumber = e.target.value;
    if (phoneNumber === "") {
      //   setLocalCustomerDetails((prevDetails) => ({
      //     ...prevDetails,
      //     phoneNumber,
      //   }));
      dispatch(
        updateUser({
          ...customerDetails,
          phoneNumber,
        })
      );
    }
    if (!phoneRegexIncrementally.test(phoneNumber)) {
      return;
    }
    dispatch(
      updateUser({
        ...customerDetails,
        phoneNumber,
      })
    );
    if (phoneNumber.length === 10) {
      setLoader(true);

      api
        .searchCustomer(phoneNumber)
        .then((response) => {
          if (response.status === 202) {
            alert("Not exist case: " + response.data);
            setIsCustomerFound(false);
            dispatch(
              updateUser({
                ...customerDetails,
                phoneNumber,
                customerName: "",
                address: "",
                currentBillAmount: totalPrice,
                totalAmount: totalPrice,
              })
            );
            // setLocalCustomerDetails({
            //   ...customerDetails,
            //   phoneNumber,
            //   customerName: "",
            //   address: "",
            //   currentBillAmount: totalPrice,
            //   totalAmount: totalPrice,
            // });
            return;
          }
          const customer = response.data;
          console.log(customer);
          if (customer) {
            customer["currentBillAmount"] = totalPrice;
            customer["totalAmount"] = totalPrice;
            //setLocalCustomerDetails(customer);
            dispatch(updateUser(customer));
            setIsCustomerFound(true);
          } else {
            setIsCustomerFound(false);
            dispatch(
              updateUser({
                ...customerDetails,
                phoneNumber,
                currentBillAmount: totalPrice,
                totalAmount: totalPrice,
              })
            );
            // setLocalCustomerDetails({
            //   ...customerDetails,
            //   phoneNumber,
            //   currentBillAmount: totalPrice,
            //   totalAmount: totalPrice,
            // });
          }
        })
        .catch((e) => {
          console.log("Error: " + e);
          alert(e);
          if (e.response && e.response.status === 401) {
            dispatch(logout());
          }
        });
      setLoader(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateUser({
        ...customerDetails,
        [name]: value,
      })
    );
    // setLocalCustomerDetails((prevDetails) => ({
    //   ...prevDetails,
    //   [customerName]: value,
    // }));
  };

  const handleRegisterCustomer = async () => {
    // Handle customer registration
    const customer = {
      customerName: customerDetails.customerName,
      address: customerDetails.address,
      phoneNumber: customerDetails.phoneNumber,
    };
    console.log("Registering customer:", customer);
    api
      .addCustomer(customer)
      .then((response) => {
        alert("Customer added succesfully");
        setIsCustomerFound(true);
      })
      .catch((e) => {
        alert("Error: ", e);
        if (e.response && e.response.status === 401) {
          dispatch(logout());
        }
      });
  };
  if (isLoading) {
    return <Loader />;
  }
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
              name="customerName"
              value={customerDetails.customerName}
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
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleRegisterCustomer}
          >
            Register
          </button>
        </>
      )}
      {isCustomerFound && (
        <div>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="customerName"
              value={customerDetails.customerName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded "
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
