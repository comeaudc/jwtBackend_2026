// Import
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

// MIddleware

// Routes

// Global Error handling

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
