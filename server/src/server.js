import connectDB from "./config/db.js";
import app from "./app.js";
import "./config/cloudinary.js";
import config from "./config/config.js";

connectDB();

app.listen(config.port, () => {
    console.log(`Server running at ${config.port}`);
});