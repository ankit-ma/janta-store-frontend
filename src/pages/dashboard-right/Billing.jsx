import React, { useState } from "react";
import CustomerDetails from "./CustomerDetails";

const Billing = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCustomerFound, setIsCustomerFound] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filteredSuggestions = dummyProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleProductSelect = (product) => {
    const newProduct = { ...product };
    newProduct.total =
      newProduct.quantity * newProduct.mrp +
      newProduct.sgst +
      newProduct.cgst -
      newProduct.discount;
    setProducts([...products, newProduct]);
    calculateTotalPrice([...products, newProduct]);
    setSearchTerm("");
    setSuggestions([]);
  };

  const calculateTotalPrice = (products) => {
    const total = products.reduce((sum, product) => sum + product.total, 0);
    setTotalPrice(total);
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
      setProducts(updatedProducts);
      calculateTotalPrice(updatedProducts);
    } else if (quantity === 0 || isNaN(quantity)) {
      e.target.className = "w-full p-2 border bg-blue-100";
      product.quantity = "";
      setProducts(updatedProducts);
    } else {
      e.target.className = "w-full p-2 border bg-red-100";
      product.quantity = product.availableQuantity;
      product.total =
        quantity * product.mrp + product.sgst + product.cgst - product.discount;
      setProducts(updatedProducts);
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
      setProducts(updatedProducts);
      calculateTotalPrice(updatedProducts);
    }
  };

  return (
    <div className="container mx-auto p-4 flex gap-8">
      <div className="w-2.7/3">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for a product"
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {suggestions.length > 0 && (
            <div className="absolute z-10 bg-white border w-full mt-1 rounded shadow-lg">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleProductSelect(product)}
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b"></th>
                <th className="py-2 px-4 border-b">Sl. No</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">MRP/Product</th>
                <th className="py-2 px-4 border-b">SGST(%)</th>
                <th className="py-2 px-4 border-b">CGST(%)</th>
                <th className="py-2 px-4 border-b">Discount(%)</th>
                <th className="py-2 px-4 border-b">Total </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    <button>🔴</button>
                  </td>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">
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
                  <td className="py-2 px-4 border-b">₹ {product.mrp}</td>
                  <td className="py-2 px-4 border-b">{product.sgst}</td>
                  <td className="py-2 px-4 border-b">{product.cgst}</td>
                  <td className="py-2 px-4 border-b">{product.discount}</td>
                  <td className="py-2 px-6 border-b">
                    ₹ {product.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            Total Price: ₹ {totalPrice.toFixed(2)}
          </span>
          <button className="p-2 bg-green-500 text-white rounded">
            Proceed
          </button>
        </div>
      </div>
      <CustomerDetails
        setIsCustomerFound={setIsCustomerFound}
        totalPrice={totalPrice}
        isCustomerFound={isCustomerFound}
      />
    </div>
  );
};

// Dummy products data for simulation
const dummyProducts = [
  {
    id: 1,
    name: "Product 1",
    quantity: 1,
    availableQuantity: 10,
    mrp: 100,
    sgst: 10,
    cgst: 10,
    discount: 5,
    total: 115,
  },
  {
    id: 2,
    name: "Product 2",
    quantity: 1,
    availableQuantity: 5,
    mrp: 200,
    sgst: 20,
    cgst: 20,
    discount: 10,
    total: 230,
  },
  {
    id: 3,
    name: "Product 3",
    quantity: 1,
    availableQuantity: 8,
    mrp: 150,
    sgst: 15,
    cgst: 15,
    discount: 7.5,
    total: 172.5,
  },
];

export default Billing;
