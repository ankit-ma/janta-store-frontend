import React, { useState, useEffect } from "react";
import CustomerDetails from "./CustomerDetails";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { TiDelete } from "react-icons/ti";
import {
  updateProduct,
  updateTotalPrice,
  updateProductData,
  logout,
} from "../../redux/action";
import BillingSummary from "./BillingSummary";
import MyButton from "../../UI/MyButton";

const api = require("../../api/index");

const Billing = () => {
  const { products, totalPrice } = useSelector((state) => state.bills);
  const dispatch = useDispatch();
  // const [products, setProducts] = useState(productRedux);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [isCustomerFound, setIsCustomerFound] = useState(false);
  const [showBilingSummay, setShowBillingSummay] = useState(false);

  const handleSearchChange = (value) => {
    // const value = e.target.value;
    // setSearchTerm(value);
    if (value.trim() !== "") {
      api
        .searchProduct(value.trim())
        .then((response) => {
          //console.log("Search Result ", response);
          setSuggestions(response.data);
        })
        .catch((error) => {
          setSuggestions([]);
          if (error.response && error.response.status === 401) {
            dispatch(logout());
          }
        });
    } else {
      setSuggestions([]);
      return;
    }
  };
  const debouncedFetchResults = _.debounce(handleSearchChange, 200);

  // Use useEffect to trigger the debounced function when searchTerm changes
  useEffect(() => {
    debouncedFetchResults(searchTerm);

    // Cleanup function to cancel the debounced function if the component unmounts
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [searchTerm]);
  const handleProductSelect = (product) => {
    const oldProduct = products.filter(
      (p) => p.productId === product.productId
    );
    console.log("selected product:", product);
    console.log("oldProduct", oldProduct);
    console.log("Product", products);
    if (oldProduct.length !== 0) {
      alert("Already present in bill");
      return;
    }
    const newProduct = { ...product };
    newProduct.total =
      newProduct.quantity * newProduct.mrp +
      newProduct.sgst +
      newProduct.cgst -
      newProduct.discount;
    // setProducts([...products, newProduct]);
    dispatch(updateProduct(newProduct));

    calculateTotalPrice([...products, newProduct]);
    setSearchTerm("");
    setSuggestions([]);
  };

  const calculateTotalPrice = (products) => {
    const total = products.reduce((sum, product) => sum + product.total, 0);
    // setTotalPrice(total);
    dispatch(updateTotalPrice(total));
  };

  const handleQuantityChange = (index, quantity, e) => {
    const updatedProducts = [...products];
    const product = updatedProducts[index];
    console.log(product);
    if (quantity <= product.availableQuantity && quantity >= 1) {
      e.target.className = "w-full p-2 border bg-white";
      product.quantity = quantity;
      product.total =
        quantity * product.mrp + product.sgst + product.cgst - product.discount;
      // setProducts(updatedProducts);
      dispatch(updateProductData(updatedProducts));

      calculateTotalPrice(updatedProducts);
    } else if (quantity === 0 || isNaN(quantity)) {
      e.target.className = "w-full p-2 border bg-blue-100";
      product.quantity = "";
      //  setProducts(updatedProducts);
      dispatch(updateProductData(updatedProducts));
    } else {
      e.target.className = "w-full p-2 border bg-red-100";
      product.quantity = product.availableQuantity;
      product.total =
        quantity * product.mrp + product.sgst + product.cgst - product.discount;
      //  setProducts(updatedProducts);
      dispatch(updateProductData(updatedProducts));

      calculateTotalPrice(updatedProducts);
      alert("Available Qauntity is: " + product.availableQuantity);
    }
  };
  const handleBlur = (index) => {
    const updatedProducts = [...products];
    const product = updatedProducts[index];

    if (product.quantity === "" || isNaN(product.quantity)) {
      product.quantity = 1;
      product.total =
        product.mrp + product.sgst + product.cgst - product.discount;
      // setProducts(updatedProducts);
      dispatch(updateProductData(updatedProducts));
      calculateTotalPrice(updatedProducts);
    }
  };

  const removeProductHandler = (index) => {
    console.log("Index: " + index);
    products.splice(index, 1);
    // setProducts(products);
    dispatch(updateProductData(products));
    calculateTotalPrice(products);
  };

  const billProceedButtonHandler = () => {
    if (totalPrice !== 0 && isCustomerFound) {
      setShowBillingSummay(true);
    } else {
      alert("Please Add customer details");
      setShowBillingSummay(false);
    }
  };
  const closeBilingSummayOverlay = () => {
    setShowBillingSummay(false);
  };
  return (
    <div className="container mx-auto p-4 flex gap-8">
      <div className="w-4/5">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for a product"
            className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          {suggestions.length > 0 && (
            <div
              className={`absolute z-10 bg-white border w-full mt-1 rounded shadow-lg `}
            >
              {suggestions.map((product) => (
                <div
                  key={product.productId}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleProductSelect(product)}
                >
                  {product.productName}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="max-h-64 overflow-y-auto overflow-x-auto mb-4">
          <table className="min-w-full bg-white font-bold">
            <thead className="sticky top-0 text-xs text-white bg-[#03045e] light:bg-gray-700 dark:text-white">
              <tr>
                <th className="py-2 px-4 border-b"></th>
                <th className="py-2 px-4 border-b">Sl.No</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Base Price</th>
                <th className="py-2 px-4 border-b">SGST(%)</th>
                <th className="py-2 px-4 border-b">CGST(%)</th>
                <th className="py-2 px-4 border-b">Discount(%)</th>
                <th className="py-2 px-4 border-b">Total </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="text-md py-1 px-2 border-b">
                    <button onClick={() => removeProductHandler(index)}>
                      <TiDelete className="text-red-500" />
                    </button>
                  </td>
                  <td className="text-xs py-1 px-2 border-b">{index + 1}</td>
                  <td className="text-xs py-1 px-2 border-b">
                    {product.productName}
                  </td>
                  <td className="text-xs py-1 px-2 border-b">
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value), e)
                      }
                      onBlur={() => handleBlur(index)}
                      className="w-full p-2 border bg-blue-100 text-blue-700 focus:outline-none focus:bg-blue-200 focus:border-blue-400"
                      min="1"
                      max={product.availableQuantity}
                    />
                  </td>
                  <td className="text-xs py-1 px-2 border-b">
                    ₹ {product.mrp}
                  </td>
                  <td className="text-xs py-1 px-2 border-b">
                    {product.sgst}%
                  </td>
                  <td className="text-xs py-1 px-2 border-b">
                    {product.cgst}%
                  </td>
                  <td className="text-xs py-1 px-2 border-b">
                    {product.discount}%
                  </td>
                  <td className="text-xs py-1 px-2 border-b">
                    ₹ {product.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <div className="flex justify-between items-center py-2">
          <span className="text-xl font-bold text-[#03045e]">
            Total Price: ₹ {totalPrice.toFixed(2)}
          </span>
          <MyButton
            buttonName={"Proceed"}
            buttonHandler={billProceedButtonHandler}
          />
        </div>
      </div>
      <div className="w-1/5">
        <CustomerDetails
          setIsCustomerFound={setIsCustomerFound}
          isCustomerFound={isCustomerFound}
        />
      </div>
      {showBilingSummay && (
        <BillingSummary onClose={closeBilingSummayOverlay} />
      )}
    </div>
  );
};

export default Billing;
