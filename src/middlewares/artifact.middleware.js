const validateCreateArtifact = (req, res, next) => {
  const { title, description } = req.body;

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (title.trim().length > 120) {
    return res.status(400).json({ message: "Title must be 120 characters or fewer" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ message: "Description must be a string" });
  }

  if (typeof description === "string" && description.length > 2000) {
    return res.status(400).json({ message: "Description must be 2000 characters or fewer" });
  }

  req.body.title = title.trim();
  if (typeof description === "string") {
    req.body.description = description.trim();
  }

  next();
};

module.exports = {
  validateCreateArtifact,
};
