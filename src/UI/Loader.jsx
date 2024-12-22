import React from "react";
import "./Loader.css";
import { SquareLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen z-1000">
      <SquareLoader color="#99adf3" />
    </div>
  );
};

export default Loader;
