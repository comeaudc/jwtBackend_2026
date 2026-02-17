import express from "express";
import User from "../models/userSchema.js";

const router = express.Router();

router.route('/').get((req,res) => {
    res.send('testing auth')
})

export default router;
