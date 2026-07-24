import React from "react";

const HeroRoom = () => {
  return (
    <div className="flex flex-col gap-5 bg-gradient-to-r from-violet-700 to-indigo-600">
      <div className="flex gap-5">
        <div className="flex-1 flex flex-col gap-8 p-10 justify-center ">
          <div>
            <h1 className="text-5xl">Discover Your Dream Room with Us</h1>

            <p className="text-[0.8rem]">
              lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30
              lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30
              lorem30{" "}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button className="border-2 border-amber-50 px-3 py-2 rounded-lg cursor-pointer">
              Learn More
            </button>
            <button className="border-2 border-purple-500 bg-purple-500 px-3 py-2 rounded-lg cursor-pointer">
              Browse Properties
            </button>
          </div>
          <div className="flex gap-3 flex-wrap">
            <span className="inline-block border-2 border-gray-500 px-3 py-2 bg-gray-800 rounded-lg">
              <h3 className="text-3xl font-bold">200+</h3>
              <p className="whitespace-nowrap">Happy Customers</p>
            </span>
            <span className="inline-block border-2 border-gray-500 px-3 py-2 bg-gray-800 rounded-lg">
              <h3 className="text-3xl font-bold">200+</h3>
              <p className="whitespace-nowrap">Happy Customers</p>
            </span>
            <span className="inline-block border-2 border-gray-500 px-3 py-2 bg-gray-800 rounded-lg">
              <h3 className="text-3xl font-bold">200+</h3>
              <p className="whitespace-nowrap">Happy Customers</p>
            </span>
          </div>
        </div>
        <div className="flex-1 bg-red-300 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://media.istockphoto.com/id/1696781145/photo/modern-building-in-the-city-with-blue-sky.jpg?s=612x612&w=0&k=20&c=POfayTyDe06tGX4CeJgS8-fb896MUC46dl3ZbHXBqN4="
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4" >
        <div>
            <h2>Icon</h2>
            <p>Content Goes here</p>
        </div>
                <div>
            <h2>Icon</h2>
            <p>Content Goes here</p>
        </div>
                <div>
            <h2>Icon</h2>
            <p>Content Goes here</p>
        </div>
                <div>
            <h2>Icon</h2>
            <p>Content Goes here</p>
        </div>
      </div>
    </div>
  );
};

export default HeroRoom;
 