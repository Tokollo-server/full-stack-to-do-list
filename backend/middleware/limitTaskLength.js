module.exports = (req, res, next) => {
  if (req.body.text && req.body.text.length > 140) {
    return res.status(400).json({ error: "Task too long (max 140 chars)" });
  }
  next();
};
