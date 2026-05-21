import express from "express";
import cors from "cors";
import vehicleRoutes from "./routes/vehicle.route.js";

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


app.use("/api/vehicles", vehicleRoutes);

export default app;