import React from "react";

const ProductDetail = () => {
  return (
    <div className="text-white p-6 rounded-xl">
     
      <span className="inline-block px-3 py-1 text-sm rounded-md bg-green-700 text-green-100">
        Available
      </span>

  
      <h1 className="mt-5 text-4xl font-semibold leading-tight">
        Seaside Serenity Villa
      </h1>

      {/* Rating + Reviews + Delivery */}
      <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
        <div className="flex items-center gap-1 text-yellow-400">
          ★ ★ ★ ★ ★<span className="text-gray-400 ml-1">(5.0)</span>
        </div>

        <a href="#" className="underline text-gray-300">
          345 Reviews
        </a>

        <div className="flex items-center gap-1 text-blue-400">

          Location 
        </div>
      </div>

      {/* Price */}
      <h2 className="mt-8 text-5xl font-bold">$1,249.99</h2>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4 mt-8">
        <button className="px-5 py-3 border border-slate-700 rounded-lg text-gray-300 hover:bg-slate-800 transition">
          ♡ Add to favorites
        </button>

        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
          Check
        </button>
      </div>

      <div className="border-t border-slate-700 my-8" />

      {/* Options */}
      <div className="">
        A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.
      </div>
    </div>
  );
};

export default ProductDetail;
