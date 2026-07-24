"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/axios";

const CreateListingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    price_unit: "",
    city: "",
    area: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [roomDetails, setRoomDetails] = useState({
    bedrooms: "",
    bathrooms: "",
    wifi: false,
  });

  const [vehicleDetails, setVehicleDetails] = useState({
    brand: "",
    model: "",
    fuelType: "",
    seats: "",
  });

  const [landDetails, setLandDetails] = useState({
    landArea: "",
    roadAccess: false,
  });

  // Protect route — only owners/admins can access
  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = JSON.parse(localStorage.getItem("rentsathi_user") || "null");
    if (!user?.token) {
      router.push("/login");
      return;
    }
    if (user.role !== "owner" && user.role !== "admin") {
      router.push("/"); // redirect non-owners to home
    }
  }, []);

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleImageChange(e) {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    e.target.value = "";
  }
  function removeImage(index) {
    URL.revokeObjectURL(images[index].preview);

    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleRoomChange(e) {
    const { name, value, type, checked } = e.target;

    setRoomDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleVehicleChange(e) {
    const { name, value } = e.target;

    setVehicleDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleLandChange(e) {
    const { name, type, value, checked } = e.target;

    setLandDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      // Common fields
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", Number(formData.price));
      data.append("price_unit", formData.price_unit);
      data.append("city", formData.city);
      data.append("area", formData.area);

      // Category-specific details
      if (formData.category === "room") {
        data.append("roomDetails", JSON.stringify(roomDetails));
      }

      if (formData.category === "vehicle") {
        data.append("vehicleDetails", JSON.stringify(vehicleDetails));
      }

      if (formData.category === "land") {
        data.append("landDetails", JSON.stringify(landDetails));
      }

      // Images
      images.forEach((image) => {
        data.append("images", image.file);
      });

      await api.post("/listings", data);

      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-lg md:max-w-xl dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              Add New Listing
            </h1>

            {/* Error Message */}
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Cozy Room in Thamel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe your listing..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select category</option>
                  <option value="room">Room</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="land">Land</option>
                </select>
              </div>

              {/* Price + Price Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price (Rs.)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min={0}
                    placeholder="e.g. 5000"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price Unit
                  </label>
                  <select
                    name="price_unit"
                    value={formData.price_unit}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select unit</option>
                    <option value="per_hour">Per Hour</option>
                    <option value="per_day">Per Day</option>
                    <option value="per_month">Per Month</option>
                    <option value="per_year">Per Year</option>
                  </select>
                </div>
              </div>

              {/* City + Area */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Kathmandu"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Area
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. Thamel"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {formData.category === "room" && (
                <div className="space-y-4 border rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Room Details
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Bedrooms */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={roomDetails.bedrooms}
                        onChange={handleRoomChange}
                        min={1}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    {/* Bathrooms */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        name="bathrooms"
                        value={roomDetails.bathrooms}
                        onChange={handleRoomChange}
                        min={1}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* WiFi */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="wifi"
                      name="wifi"
                      checked={roomDetails.wifi}
                      onChange={handleRoomChange}
                      className="w-4 h-4"
                    />

                    <label
                      htmlFor="wifi"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      WiFi Available
                    </label>
                  </div>
                </div>
              )}

              {formData.category === "vehicle" && (
                <div className="space-y-4 border rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Vehicle Details
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Brand
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={vehicleDetails.brand}
                        onChange={handleVehicleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={vehicleDetails.model}
                        onChange={handleVehicleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Fuel Type
                      </label>
                      <input
                        type="text"
                        name="fuelType"
                        value={vehicleDetails.fuelType}
                        onChange={handleVehicleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Seats
                      </label>
                      <input
                        type="number"
                        name="seats"
                        min={1}
                        value={vehicleDetails.seats}
                        onChange={handleVehicleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.category === "land" && (
                <div className="space-y-4 border rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Land Details
                  </h2>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Land Area
                    </label>
                    <input
                      type="text"
                      name="landArea"
                      value={landDetails.landArea}
                      onChange={handleLandChange}
                      placeholder="e.g. 10 Aana"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="roadAccess"
                      name="roadAccess"
                      checked={landDetails.roadAccess}
                      onChange={handleLandChange}
                    />

                    <label
                      htmlFor="roadAccess"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Road Access Available
                    </label>
                  </div>
                </div>
              )}

              {/* Images selection */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Listing Images
                </label>

                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden border"
                    >
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Select one or more images.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-violet-600 hover:bg-violet-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Listing"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateListingPage;
