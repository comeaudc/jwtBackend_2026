import express from "express";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";

const router = express.Router();

//  @route: POST /api/users
//  @desc: Register/Creating a user
//  @access: Public
router.route("/").get((req, res) => {
  res.send("testing user");
});

export default router;
