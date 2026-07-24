import express from "express";
import cors from "cors";
import listingRoutes from "./routes/listing.route.js";
import authRouter from "./routes/auth.route.js";
import bookingRoute from "./routes/booking.route.js";
import reviewRoute from "./routes/review.route.js";
import logger from "./middlewares/logger.js";
import userRoute from "./routes/user.route.js";
// import bodyParser from "body-parser";
import { protect } from "./middlewares/authMiddleware.js";
import verificationRouter from "./routes/verification.route.js";
import messageRouter from "./routes/message.route.js";
import paymentRouter from "./routes/payment.route.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5500",
    "http://localhost:5173",
  ],
  credentials: true,
}));
app.use(express.json());
// app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Rent Sathi Nepal API Running");
});

app.use("/api/users", userRoute);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewRoute);
app.use("/api/verify", verificationRouter);
app.use("/api/messages", protect, messageRouter);
app.use("/api/payment", paymentRouter);

export default app;