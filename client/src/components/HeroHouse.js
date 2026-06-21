import React from "react";

const HeroHouse = () => {
  return (
    <section className="my-10 px-6">
      <div className="bg-gradient-to-r from-violet-700 to-indigo-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden">
        {/* Left Content */}
        <div className="text-white max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Experience the road
            <br />
            like never before
          </h1>

          <p className="mt-4 text-sm text-gray-200">
            Discover premium car rentals with flexible booking options and
            unbeatable comfort for every journey.
          </p>

          <button className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-medium transition">
            View all cars
          </button>
        </div>

        {/* Right Form */}
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg text-gray-950">
          <h2 className="text-2xl font-bold text-center mb-6">Book your car</h2>

          <form className="space-y-4">
            <select className="w-full bg-gray-100 p-3 rounded-lg outline-none">
              <option>Car type</option>
            </select>

            <select className="w-full bg-gray-100 p-3 rounded-lg outline-none">
              <option>Place of rental</option>
            </select>

            <select className="w-full bg-gray-100 p-3 rounded-lg outline-none">
              <option>Place of return</option>
            </select>

            <input
              type="date"
              className="w-full bg-gray-100 p-3 rounded-lg outline-none"
            />

            <input
              type="date"
              className="w-full bg-gray-100 p-3 rounded-lg outline-none"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition"
            >
              Book now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroHouse;