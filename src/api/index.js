import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../redux/action";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: apiUrl,
  // Add any other configuration options here
});

// Add a request interceptor to automatically include the token in the Authorization header
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // config.headers["Content-Type"] = "application/json";
  return config;
});

export const login = async (username, password) => {
  const auth = "Basic " + btoa(`${username}:${password}`);

  await axios
    .post(
      "http://localhost:8080/authenticate",
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
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("activity", response.data.data);
      // dispatch(fetchActivityData(response.data.data));
      console.log("Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
      // alert(error);
    });
};

export const register = async (formdata) => {
  try {
    const response = await api.post("/register", formdata);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const downloadtemplate = async () => {
  api
    .get("/admin/product/download-template", {
      responseType: "blob", // Important: This tells Axios to treat the response as binary data
    })
    .then((response) => {
      console.log("File Downloded successfully");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "product_template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((error) => {
      console.error("File upload error", error);
    });
};

export const fetchUploadHistory = async (size, pageNumber) => {
  return api
    .get(`/admin/product/upload-history/${size}/${pageNumber}`)
    .then((response) => {
      console.log("Data fetched", response);
      return response;
    })
    .catch((error) => {
      console.error("File upload error", error);
      throw error;
    });
};

export const searchProduct = async (keyword) => {
  return api.get(`/solr/search/products/*${keyword}*`);
};

export const searchCustomer = async (phonenumber) => {
  const employeeId = Cookies.get("employeeId");
  return api.get(`/janta-store/add-customer/${employeeId}/${phonenumber}`);
};

export const addCustomer = async (customer) => {
  const employeeId = Cookies.get("employeeId");
  const token = Cookies.get("token");
  console.log("Addcustomer url", apiUrl);
  return axios.post(
    apiUrl + `/janta-store/add-customer/${employeeId}`,
    customer,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
