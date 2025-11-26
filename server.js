import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

import dotenv from "dotenv";
dotenv.config();

// NEW ROUTE IMPORT (ADD THIS)
import userRouter from "./routes/userRoute.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();

// EXISTING FOOD ROUTES
app.use("/api/food", foodRouter);

// NEW USER ROUTES (ADD THIS)
app.use("/api/user", userRouter);

app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
