import dotenv from "dotenv";

dotenv.config();
const config = {
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

export default config;
