import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";

import { logout } from "../../redux/action";
import excelPng from "../../resources/excel.png";
import uploadPng from "../../resources/upload.png";
import ProductUploadHistory from "./ProductUploadHistory";

const api = require("../../api/index");

const InventoryManagement = (props) => {
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();
  const apiURL = process.env.REACT_APP_API_URL;
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);
    const token = Cookies.get("token");
    // Replace with your API endpoint
    axios
      .post(apiURL + "/admin/product/upload-product-list", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("File uploaded successfully", response);
        alert(response.data);
        setIsUploading(false);
      })
      .catch((error) => {
        console.error("File upload error", error);
        alert(error.response.data);
        setIsUploading(false);
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const downloadTempleteHandler = async () => {
    await api.downloadtemplate();
  };
  return (
    <div className="container mx-auto p-4">
      <button
        className="flex text-center m-4 cursor-pointer hover:text-[#00b4d8]"
        onClick={props.hideUpload}
      >
        <IoArrowBackSharp className="text-2xl" />
        <strong className="m-0 pl-2">Back</strong>
      </button>

      <div className="flex space-x-4">
        <div className="flex-1 flex items-center border-dotted border-2 border-green-500 bg-green-100 bg-opacity-50 p-4 text-center cursor-pointer hover:bg-opacity-25 rounded-md">
          <img
            src={excelPng}
            alt="Excel template"
            className="w-[6vw] h-auto mr-4"
          />
          <p>
            Click{" "}
            <strong
              className="text-blue-500 hover:text-blue-700 whitespace-nowrap overflow-hidden text-ellipsis"
              onClick={downloadTempleteHandler}
            >
              here
            </strong>{" "}
            to Download template.
          </p>
        </div>
        <div
          {...getRootProps()}
          className="flex-1 flex items-center border-dotted border-2 border-blue-500 bg-blue-100 bg-opacity-50 p-4 text-center cursor-pointer hover:bg-opacity-25 rounded-md"
        >
          <input {...getInputProps()} />
          <img
            src={uploadPng}
            alt="Upload template"
            className="w-[6vw] h-auto mr-4"
          />
          {isUploading ? (
            <p>Uploading...</p>
          ) : (
            <p className="text-black-500 hover:text-blue-700 whitespace-nowrap overflow-hidden text-ellipsis">
              Drag 'n' drop a file here, or click to select a file
              <br />
              Supported file formats :: <strong>.xlsx</strong>
            </p>
          )}
        </div>
      </div>
      <ProductUploadHistory />
    </div>
  );
};

export default InventoryManagement;
