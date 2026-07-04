"use client";
// import Card from "@/components/Card";
// import Hero from "@/components/Hero";
import HeroHouse from "@/components/HeroHouse";
import HeroRoom from "@/components/HeroRoom";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardHouse from "@/components/CardHouse";

// const Page = async () => {

//     const response = await fetch("http://localhost:3010/api/listings", {
//     cache: "no-store",
//   });
//   const cards = await response.json();
//   return (
//     <div className="flex flex-wrap gap-4 justify-center">

// {cards.data
//   .filter(card => card.category === "room")
//   .map(card => (
//     <Card key={card.area} data={card} />
//   ))}
//     </div>
//   );
// };

const HomePage = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full"
        style={{ height: "auto", minHeight: "600px" }}
      >
        <SwiperSlide style={{ height: "auto" }}>
          <HeroRoom />
          {/* This is test 1 */}
        </SwiperSlide>
        <SwiperSlide style={{ height: "auto" }}>
          <HeroHouse />
          {/* This is test 2 */}
        </SwiperSlide>
      </Swiper>
      <style>{`
        :global(.swiper-wrapper) {
          height: auto;
        }

        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: white;
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          transition: all 0.3s ease;
          z-index: 10;
        }

        :global(.swiper-button-next:hover),
        :global(.swiper-button-prev:hover) {
          background: rgba(0, 0, 0, 0.7);
        }

        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.7);
          width: 12px;
          height: 12px;
        }

        :global(.swiper-pagination-bullet-active) {
          background: white;
        }
      `}</style>
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

export default HomePage;
