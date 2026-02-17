import express from "express";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";

const router = express.Router();

//  @route: POST /api/users
//  @desc: Register/Creating a user
//  @access: Public
router
  .route("/")
  .post(
    [
      check("name", "Name is required.").not().isEmpty(),
      check("email", "Please include a valid email.").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters.",
      ).isLength({ min: 6 }),
    ],
    async (req, res) => {
      // Variable to hold errors if there are any
      // Create an array of errors, from our previous 'checks'
      const errors = validationResult(req);

      //if errors array is NOT empty, respond with error
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      res.send("testing user");
    },
  );

export default router;
