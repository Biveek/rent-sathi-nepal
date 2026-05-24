import express from "express"
import dotenv  from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
// import bodyParser from "body-parser";

import listingRoutes from "./routes/listing.route.js"
import authRouter from "./routes/auth.route.js"
import bookingRoute from "./routes/booking.route.js"
import verificationRouter from "./routes/verification.route.js"



dotenv.config()
connectDB()
const app = express()


// app.use("/api/listings",listingRoutes)

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.use("/api/listings",listingRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api/auth",authRouter)
app.use('/api/verify',verificationRouter)


app.get("/",(req,res)=>{
    res.send("API running")
})
app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})