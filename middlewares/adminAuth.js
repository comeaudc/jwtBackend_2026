import User from "../models/userSchema.js";

export default async function adminAuth(req, res, next) {
  try {
    // Get user info
    let user = await User.findById(req.user.id).select("isAdmin");

    // if user not found, throw error
    if (!user)
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

    // if user has admin privledges continue, else throw error
    if (user.isAdmin) {
      next();
    } else {
      throw new Error("You shall not pass!!!");
    }
  } catch (err) {
    console.error(err.message);
    res.status(403).json({ errors: err.message });
  }
}
