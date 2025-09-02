const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received token:", token);

  if (!token) {
    return res.status(400).send("Token missing");
  }

  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) {
      console.log("Token verification failed:", error.message);
      return res
        .status(403)
        .send({ message: "Token verification failed", error: error.message });
    }

    req.user = user;
    next();
  });
};
