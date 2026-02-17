import express from "express";
import User from "../models/userSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
dotenv.config();

const router = express.Router();

//  @route: POST /api/auth
//  @desc: Login User
//  @access: Public
router.route("/").post((req, res) => {
  res.send("testing auth");
});

export default router;
