"use client";

export default function ListingsFilterBar({
  filters,
  setFilters,
}) {
  function handleChange(e) {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

        {/* Search */}
        <input
          type="text"
          name="search"
          placeholder="Search listings..."
          value={filters.search}
          onChange={handleChange}
          className="rounded-lg border px-4 py-3 outline-none transition focus:border-violet-600"
        />

        {/* Category */}
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="rounded-lg border px-4 py-3 outline-none transition focus:border-violet-600"
        >
          <option value="">All Categories</option>
          <option value="room">Room</option>
          <option value="vehicle">Vehicle</option>
          <option value="land">Land</option>
        </select>

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleChange}
          className="rounded-lg border px-4 py-3 outline-none transition focus:border-violet-600"
        />

        {/* Min Price */}
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
          className="rounded-lg border px-4 py-3 outline-none transition focus:border-violet-600"
        />

        {/* Max Price */}
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
          className="rounded-lg border px-4 py-3 outline-none transition focus:border-violet-600"
        />

      </div>
    </div>
  );
}