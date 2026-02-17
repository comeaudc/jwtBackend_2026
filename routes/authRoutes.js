import express from "express";
import User from "../models/userSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import auth from "../middlewares/basicAuth.js";
import adminAuth from "../middlewares/adminAuth.js";
dotenv.config();

const router = express.Router();

//  @route: POST /api/auth
//  @desc: Login User
//  @access: Public
router
  .route("/")
  .post(
    [
      check("email", "Please include a valid email").isEmail(),
      check("password", "Password required").not().isEmpty(),
    ],
    async (req, res) => {
      // Check req body for errors
      const errors = validationResult(req);

      // If errors, respond to FE
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;

      try {
        // Find user by email
        let user = await User.findOne({ email });

        // If no user, res with error
        if (!user)
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });

        // COmpare password
        const isMatch = await bcrypt.compare(password, user.password);

        // If no match return with error
        if (!isMatch)
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });

        // Create payload for jwt
        const payload = {
          user: {
            id: user._id,
          },
        };

        // Sign and send JWT in res
        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: "3h" },
          (err, token) => {
            if (err) throw err;

            res.json({ token });
          },
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: err.message }] });
      }
    },
  )
  //  @route: GET /api/auth
  //  @desc: GET User information
  //  @access: Private 
  .get(auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  });

//  @route: GET /api/auth/admin
//  @desc: GET Admin information
//  @access: Admin 
router.route("/admin").get(auth, adminAuth, async (req, res) => {
  res.send("You are an admin!!!!");
});

export default router;
