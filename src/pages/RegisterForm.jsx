import React, { useState } from "react";

import AlertModal from "../UI/AlertModal";
import { Link, useNavigate } from "react-router-dom";

const api = require("../api/index");

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    email: "",
    designation: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Alert hojao");

  const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (registered) navigate("/");
  };
  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.employeeName) newErrors.employeeName = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Perform registration logic here
      console.log("Registration Data:", formData);
      try {
        const response = await api.register(formData);
        if (response.status === 200) {
          setAlertMessage(response.data.message);
          setRegistered(true);
          openModal();
        }
      } catch (error) {
        setAlertMessage(error);
        setRegistered(false);
        console.log(error);
        openModal();
      }
      // Save to localStorage or send to backend
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#00b4d8]">Register</h2>

        <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b-2 border-blue-500 focus:outline-none"
              />
              {errors.employeeName && (
                <span className="text-red-500 text-sm">
                  {errors.employeeName}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b-2 border-blue-500 focus:outline-none"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Designation</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b-2 border-blue-500 focus:outline-none"
              >
                <option value="">Select designation</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="cashier">Cashier</option>
              </select>
              {errors.designation && (
                <span className="text-red-500 text-sm">
                  {errors.designation}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b-2 border-blue-500 focus:outline-none"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b-2 border-blue-500 focus:outline-none"
              />

              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b-2 border-blue-500 focus:outline-none"
              />

              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#0077b6] text-white py-2 rounded hover:bg-[#00b4d8]"
        >
          Register
        </button>
      </form>
      <AlertModal
        isOpen={isModalOpen}
        title="Alert Title"
        message={alertMessage}
        onClose={closeModal}
      />
    </>
  );
};

export default RegisterForm;
