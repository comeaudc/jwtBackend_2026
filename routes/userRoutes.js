import express from "express";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";
dotenv.config();

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

      const { name, email, password } = req.body;

      try {
        //  Check if user already exists
        let user = await User.findOne({ email });

        // Respond with error
        if (user)
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });

        //  Create new user object
        user = new User({
          name,
          email,
          password,
        });

        // Create salt to hash our pw. Number represents number of rounds of encryption
        const salt = await bcrypt.genSalt(10);

        // Hash/Encrpyt our pw
        user.password = await bcrypt.hash(password, salt);

        // Save user to DB
        await user.save();

        // Create payload for JWT
        const payload = {
          user: {
            id: user._id,
            name: user.name, // normally would not include name
          },
        };

        //Respond with JWT, because you register and login simulatneously
        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: "3h" },
          (err, token) => {
            if (err) throw err;

            res.json({ token });
          },
        );
      } catch (error) {
        console.error(error.message);
        res
          .status(error.status || 500)
          .json({ errors: [{ msg: `❌ Error: ${error.message}` }] });
      }
    },
  );

export default router;
