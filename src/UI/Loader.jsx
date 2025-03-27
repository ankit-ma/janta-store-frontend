import React from "react";
import "./Loader.css";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
      <RingLoader color="#0c9f26" />
    </div>
  );
};

export default Loader;
