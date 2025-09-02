module.exports = (req, res, next) => {
  if (!req.is("application/json")) {
    return res.status(400).json({ error: "Only JSON requests allowed" });
  }
  next();
};
