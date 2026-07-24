import Listing from "../models/listing.model.js";
import uploadImage from "../utils/cloudinaryUpload.js";

const getListings = async (req, res) => {
  try {
    const { city, category, minPrice, maxPrice, search } = req.query;

    let filter = { status: "active" };

    if (city) filter.city = new RegExp(city, "i");
    if (category) filter.category = category;
    if (search) filter.title = new RegExp(search, "i");

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const listings = await Listing.find(filter)
      .populate("owner_id", "name is_verified_owner")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: listings.length === 0 ? "No listings found" : "Listings fetched",
      data: listings,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createDummyListings = async (req, res) => {
  try {
    const data = [
      {
        owner_id: "000000000000000000000001",
        title: "Room in Thamel",
        category: "room",
        price: 12000,
        price_unit: "per_month",
        city: "Kathmandu",
        area: "Thamel",
        status: "active",
      },
      {
        owner_id: "000000000000000000000001",
        title: "Bike Rental",
        category: "vehicle",
        price: 800,
        price_unit: "per_day",
        city: "Kathmandu",
        area: "Putalisadak",
      },
      {
        owner_id: "000000000000000000000001",
        title: "2BHK Flat",
        category: "room",
        price: 18000,
        price_unit: "per_month",
        city: "Pokhara",
        area: "Lakeside",
      },
    ];

    await Listing.insertMany(data);
    res.json({ message: "Dummy data inserted" });
  } catch (err) {
    res.status(500).json({ message: "Error inserting data" });
  }
};

const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      owner_id: req.user._id,
      status: { $ne: "removed" },
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      message:
        listings.length === 0
          ? "No listings found"
          : "Listings fetched successfully",
      data: listings,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "owner_id",
      "name profile_photo is_verified_owner trust_score",
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json({ success: true, data: listing });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      price_unit,
      city,
      area,
      roomDetails,
      vehicleDetails,
      landDetails,
    } = req.body;

    if (!title || !description || !category || !price || !city) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }
    const images = [];

    for (const file of req.files) {
      const result = await uploadImage(file, "listings");

      images.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    const listing = await Listing.create({
      owner_id: req.user._id, // comes from auth middleware
      title,
      description,
      category,
      price,
      price_unit,
      city,
      area,
      images,
      ...(category === "room" && { roomDetails }),
      ...(category === "vehicle" && { vehicleDetails }),
      ...(category === "land" && { landDetails }),
    });

    console.log(listing);

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Only owner can update
    if (listing.owner_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not your listing",
      });
    }

    const {
      title,
      description,
      category,
      price,
      price_unit,
      city,
      area,
      roomDetails,
      vehicleDetails,
      landDetails,
    } = req.body;

    // Update basic fields
    listing.title = title;
    listing.description = description;
    listing.category = category;
    listing.price = price;
    listing.price_unit = price_unit;
    listing.city = city;
    listing.area = area;

    // Update category-specific fields
    listing.roomDetails =
      category === "room" ? roomDetails : undefined;

    listing.vehicleDetails =
      category === "vehicle" ? vehicleDetails : undefined;

    listing.landDetails =
      category === "land" ? landDetails : undefined;

    // Upload new images only if provided
    if (req.files && req.files.length > 0) {
      const images = [];

      for (const file of req.files) {
        const result = await uploadImage(file, "listings");

        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      listing.images = images;
    }

    await listing.save();

    return res.json({
      success: true,
      message: "Listing updated successfully",
      data: listing,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // make sure only the owner can delete
    if (listing.owner_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your listing" });
    }

    listing.status = "removed";
    await listing.save();

    res.json({ message: "Listing removed" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export {
  getListings,
  createDummyListings,
  getMyListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};
