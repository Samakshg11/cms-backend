const parsePositiveInteger = (value, { min = 1, max = Number.MAX_SAFE_INTEGER } = {}) => {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < min || parsedValue > max) {
    return null;
  }

  return parsedValue;
};

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

  const normalizedDescription = typeof description === "string" ? description.trim() : undefined;

  if (normalizedDescription !== undefined && normalizedDescription.length > 2000) {
    return res.status(400).json({ message: "Description must be 2000 characters or fewer" });
  }

  req.body.title = title.trim();
  if (normalizedDescription !== undefined) {
    req.body.description = normalizedDescription;
  }

  next();
};

const validateArtifactQuery = (req, res, next) => {
  const { page, limit, q } = req.query;

  if (page !== undefined && parsePositiveInteger(page) === null) {
    return res.status(400).json({ message: "page must be a positive integer" });
  }

  if (
    limit !== undefined &&
    parsePositiveInteger(limit, { min: 1, max: 100 }) === null
  ) {
    return res.status(400).json({ message: "limit must be an integer between 1 and 100" });
  }

  if (q !== undefined && typeof q !== "string") {
    return res.status(400).json({ message: "q must be a string" });
  }

  if (q !== undefined && q.trim().length > 200) {
    return res.status(400).json({ message: "q must be 200 characters or fewer" });
  }

  if (page !== undefined) {
    req.query.page = parsePositiveInteger(page);
  }

  if (limit !== undefined) {
    req.query.limit = parsePositiveInteger(limit, { min: 1, max: 100 });
  }

  if (q !== undefined) {
    req.query.q = q.trim();
  }

  next();
};

module.exports = {
  validateCreateArtifact,
  validateArtifactQuery,
};
