module.exports = (req, res, next) => {
  const user = req.user;
  if (!req.user.username.endsWith("@gmail.com")) {
    return res.status(403).json({ error: "Only @gmail.com user allowed" });
  }
  next();
};
