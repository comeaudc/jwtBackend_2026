// Import
import express from "express";
import dotenv from "dotenv";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// MIddleware

// Routes

// Global Error handling

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
