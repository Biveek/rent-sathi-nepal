import express from "express";
import multer from "multer";
import cors from "cors";
import listingRoutes from "./routes/listing.route.js";
import authRouter from "./routes/auth.route.js";
import bookingRoute from "./routes/booking.route.js";
import reviewRoute from "./routes/review.route.js";
import logger from "./middlewares/logger.js";
import userRoute from "./routes/user.route.js";
import bodyParser from "body-parser";
import { admminOnly, protect } from "./middlewares/authMiddleware.js";
import connectCloudinary from "./config/cloudinary.js";

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Rent Sathi Nepal API Running");
});

app.get("/homepage", (req, res) => {
  res.send("This is homepage");
});

app.get("/contact", (req, res) => {
  res.send("This is contact us page");
});

app.use("/api/users", protect, admminOnly,upload.single("image"), userRoute);
app.use("/api/listings", upload.array("images", 10), listingRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewRoute);

export default app;
