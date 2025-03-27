import React from "react";
import { useState } from "react";
import PopupModal from "../UI/PopupModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityData, login } from "../redux/action";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../UI/Loader";
const api = require("../api/index");

const AuthOverlay = (props) => {
  const apiURL = process.env.REACT_APP_API_URL;

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const loginMethod = async (username, password) => {
    const auth = "Basic " + btoa(`${username}:${password}`);
    setIsLoading(true);
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
        setIsLoading(false);
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
        navigate("/store/dashboard");
      })
      .catch((error) => {
        setIsLoading(false);
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
      <form
        onSubmit={loginButtonListener}
        className="max-w-xl mx-auto p-6 bg-white shadow-[#6366fcd0] shadow-2xl rounded-xl transition-all duration-300 ease-in-out transform hover:shadow-blue-500 hover:rotate-2"
      >
        {isLoading && <Loader />}
        <h2 className="text-xl font-bold mb-6 text-[#03055ec8]">
          Login / Register
        </h2>
        <div className="m-2 min-w-80">
          <label className="text-xs block text-gray-700">
            Username (Email)
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-2 py-2 border-b-2 border-blue-500 focus:outline-none text-xs font-mono focus:bg-slate-200"
            onChange={onChangeInput}
          />
        </div>
        <div className="m-2 relative">
          <label className="block text-gray-700 text-xs">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full px-2 py-2 border-b-2 border-blue-500 focus:outline-none text-xs "
            onChange={onChangeInput}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute pb-2 right-2 top-8 text-gray-500 focus:outline-none hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="m-6 justify-center flex">
          <button
            type="submit"
            className="w-48 bg-[#0077b6] text-white py-2 rounded-lg hover:bg-[#00b4d8] text-xs"
          >
            Login
          </button>
        </div>
        <div className="text-center text-[#0015b6] text-xs hover:underline">
          <Link to="/register">Register</Link>
        </div>
      </form>

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
