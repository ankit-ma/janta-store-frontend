import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Cookies from "js-cookie";

import excelPng from "../../resources/excel.png";
import uploadPng from "../../resources/upload.png";
import ProductUploadHistory from "./ProductUploadHistory";

const api = require("../../api/index");

const InventoryManagement = () => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);
    const token = Cookies.get("token");
    // Replace with your API endpoint
    axios
      .post(
        "http://localhost:8080/admin/product/upload-product-list",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("File uploaded successfully", response);
        alert(response.data);
        setIsUploading(false);
      })
      .catch((error) => {
        console.error("File upload error", error);
        alert(error.response.data);
        setIsUploading(false);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const downloadTempleteHandler = async () => {
    await api.downloadtemplate();
  };
  return (
    <div className="container mx-auto p-4">
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
            to Download template
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
            <p className="text-blue-500 hover:text-blue-700 whitespace-nowrap overflow-hidden text-ellipsis">
              Drag 'n' drop a file here, or click to select a file
            </p>
          )}
        </div>
      </div>
      <ProductUploadHistory />
    </div>
  );
};

export default InventoryManagement;