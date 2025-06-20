const JWT = require("jsonwebtoken")
const User = require("../models/userSchema")
const jwtValidator = async (req, res, next) => {
  const token = req.cookies.taskToken
  console.log("token", token);
  try {
    if (!token) {
      return res.status(401).json({ message: "Access Denied" })
    }
    const verify = JWT.verify(token, process.env.JWT_KEY);
    const user = await User.findById(verify.id)
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "user not found" })
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid Token" })

  }
}
module.exports = jwtValidator;