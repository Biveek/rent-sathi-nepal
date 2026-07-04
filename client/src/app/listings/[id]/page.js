import CardHouse from "@/components/CardHouse";
import ProductDetail from "@/components/ProductDetail";
import ProductInfo from "@/components/ProductInfo";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-3/4 md:w-1/2">
          <ProductInfo />
        </div>

        <div className="w-full md:w-1/2">
          <ProductDetail />
        </div>
      </div>

      <div className="grid items-center justify-center grid-cols-1 [@media(max-width:600px)]:grid-cols-[300px] [@media(min-width:601px)]:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-3">
        <CardHouse />
        <CardHouse />
        <CardHouse />
        <CardHouse />
        <CardHouse />
      </div>
    </>
  );
};

export default page;
