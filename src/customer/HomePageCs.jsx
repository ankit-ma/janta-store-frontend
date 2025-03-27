import React, { useState } from "react";
import ProductList from "./ProductListing/ProductList";

const HomePageCs = () => {
  const [selectedProductType, setSelectedProductType] = useState("");
  return (
    <div>
      <div>Product Categories Bar</div>
      <ProductList type={selectedProductType} />
    </div>
  );
};
export default HomePageCs;
