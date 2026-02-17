import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function auth(req, res, next) {
    // Get token from header
  const token = req.header("x-auth-token");

  // if no token, res with error
  if (!token)
    return res.status(401).json({ errors: [{ msg: "No token, Auth Denied" }] });

  try {
    //decode token. CHecks if token is ours (we created it with our signature) AND if its not expired
    const decoded = jwt.verify(token, process.env.jwtSecret);

    // set req.user to the decoded user information from payload.
    // Standard practice to put in req.user for easy use
    req.user = decoded.user;

    next()

  } catch (err) {
    console.error(err.message);
    res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
  }
}
