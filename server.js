// Import
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import { logReq, globalErr } from "./middlewares/middleware.js";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

// Middleware
app.use(express.json());
app.use(logReq);

// Routes

// Global Error handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
