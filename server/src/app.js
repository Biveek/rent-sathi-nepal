import express from "express";
import cors from "cors";
import listingRoutes from "./routes/listing.route.js";
import authRouter from "./routes/auth.route.js";
import bookingRoute from "./routes/booking.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Rent Sathi Nepal API Running");
});

app.get("/homepage", (req, res) => {
  res.send("This is homepage");
});

app.get("/contact", (req, res) => {
  res.send("This is contact us page");
});


app.use("/api/listings",listingRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api/auth",authRouter);

export default app;