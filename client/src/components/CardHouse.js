import React from "react";

const CardHouse = () => {
  return (
    <div className="w-full rounded-xl bg-[#0f0f12] p-3 text-white shadow-lg">
      <img
        src="https://media.istockphoto.com/id/1696781145/photo/modern-building-in-the-city-with-blue-sky.jpg?s=612x612&w=0&k=20&c=POfayTyDe06tGX4CeJgS8-fb896MUC46dl3ZbHXBqN4="
        alt="Villa"
        className="h-60 w-full rounded-lg object-cover"
      />

      <div className="mt-4">
        <h3 className="text-[18px] font-semibold">Seaside Serenity Villa</h3>

        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban
          neighborhood. Read More
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-[11px] text-zinc-300">
            4-Bedroom
          </span>

          <span className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-[11px] text-zinc-300">
            3-Bathroom
          </span>

          <span className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-[11px] text-zinc-300">
            1-Hall
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-zinc-500">Price</p>
            <p className="mt-1 text-2xl font-semibold">Rs.5500</p>
          </div>

          <button className="rounded-lg bg-violet-600 px-5 py-3 text-xs font-medium transition hover:bg-violet-500">
            View Property Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHouse;
