import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
  // State to store the list of products
  const [products, setProducts] = useState([]);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div>
      {/* Display heading for the product list */}
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold mt-10 text-gray-700">Products</h1>
      </div>
      {/* Display list of products */}
      <div className="m-20 flex flex-row flex-wrap gap-10">
        {/* Map through the products array and render ProductItem component for each product */}
        {products.slice(0, 10).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
