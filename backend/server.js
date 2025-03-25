const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/user.js");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const otproute = require("./routes/otp-route.js");
const loginroute = require("./routes/loginroute.js");
const helproute = require("./routes/helproute.js");
const app = express();
const path = require("path");
const chatRoutes = require("./routes/chat");



app.use(cors());
app.use(express.json());



 
connectDB();

app.use("/", userRoutes);
app.use("/",otproute);
app.use("/",loginroute);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images
app.use("/", helproute);
app.use("/", chatRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));