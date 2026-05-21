const express = require("express");
const cors = require("cors");

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

module.exports = app;