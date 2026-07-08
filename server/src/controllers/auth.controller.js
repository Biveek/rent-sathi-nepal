import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import uploadImage from "../utils/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
  return token;
};
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "USer with same email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get my profile

export const getMe = async (req, res) => {
  try {
    // const user = await User.findById(req.params.id)
    res.json(req.user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update my profile

export const updateMe = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update profile information
    if (name) user.name = name;
    if (phone) user.phone = phone;

    // Upload new profile photo
    if (req.file) {
      // Delete previous image if it exists
      if (user.profile_photo?.public_id) {
        await cloudinary.uploader.destroy(user.profile_photo.public_id);
      }

      const result = await uploadImage(req.file, "profiles");

      user.profile_photo = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
