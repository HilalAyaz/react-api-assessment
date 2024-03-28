import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="w-60 bg-gray-100 shadow-md rounded-xl duration-500 hover:shadow-xl flex flex-col items-center cursor-pointer">
      {/* Product image */}
      <img className="w-30 h-40 p-2" src={product.image} alt={product.title} />

      <div className="px-4 py-1 ">
        {/* Product category */}
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {product.category}
        </span>

        {/* Product title */}
        <p className="text-lg font-bold text-black block capitalize">
          {product.title}
        </p>

        {/* Product rating */}
        <div>
          <p className="text-lg font-semibold text-black ">
            Rating: {product.rating.rate}
          </p>
        </div>

        {/* Product price */}
        <div>
          <p className="text-lg font-semibold text-blue-400  my-3">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
