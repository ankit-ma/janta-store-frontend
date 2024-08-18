import React from "react";
import { useState } from "react";
import PopupModal from "../UI/PopupModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityData, login } from "../redux/action";
import axios from "axios";
import Cookies from "js-cookie";
const api = require("../api/index");

const AuthOverlay = (props) => {
  const apiURL = process.env.REACT_APP_API_URL;

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    const eventName = e.target.name;
    if (eventName === "email") {
      setusername(e.target.value);
    }
    if (eventName === "password") {
      setPassword(e.target.value);
    }
  };
  const loginMethod = async (username, password) => {
    const auth = "Basic " + btoa(`${username}:${password}`);

    await axios
      .post(
        apiURL + "/authenticate",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        }
      )
      .then((response) => {
        Cookies.set("token", response.data.token);
        Cookies.set("loggedIn", true);
        Cookies.set("employeeId", response.data.employeeId);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("activity", response.data.data);
        // dispatch(fetchActivityData(response.data.data));
        console.log("Response:", response.data);
        dispatch(fetchActivityData(response.data.data));
        dispatch(login({ name: response.data.name }));
        navigate("/dashboard");
      })
      .catch((error) => {
        Cookies.set("loggedIn", false);
        console.log("overlayclass error");
        setErrorMessage("Wrong credentials");
        openModal();
        // alert(error);
      });
  };
  const loginButtonListener = async (e) => {
    e.preventDefault();
    console.log(username, password);
    loginMethod(username, password);
    //console.log(password);
  };
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-teal-600">
            Login / Register
          </h2>
          {/* Login and Register Form */}
          <form onSubmit={loginButtonListener}>
            <div className="mb-4">
              <label className="block text-gray-700">Username (Email)</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                onChange={onChangeInput}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                onChange={onChangeInput}
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
      {isOpen && (
        <PopupModal
          isOpen={isOpen}
          onClose={closeModal}
          title="Error"
          message={errorMessage}
          type="error"
        />
      )}
    </>
  );
};

export default AuthOverlay;
