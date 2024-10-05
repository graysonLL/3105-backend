const jwt = require("jsonwebtoken");
const users = require("../models/userModel");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    const user = users.find((u) => u.id === decoded.id);

    if (!user) {
      return res.status(401).send("Access denied. Invalid token.");
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Access denied. Invalid token.");
  }
};

module.exports = authMiddleware;
