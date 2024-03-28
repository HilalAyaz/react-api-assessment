import React from "react";
import ProductList from "./../components/ProductList";
import backgorund from "../assets/background.jpg";
const Landing = () => {
  return (
    <div>
      <div className="pb-5">
        <img
          src={backgorund}
          alt="bg"
          className="w-full h-[500px] object-cover shadow-lg shadow-black rounded-b-lg"
        />
      </div>
      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default Landing;
