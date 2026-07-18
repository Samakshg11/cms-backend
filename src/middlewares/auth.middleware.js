const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const extractBearerToken = (authHeader) => {
  if (!authHeader) {
    return null;
  }

  const [scheme, token, ...rest] = authHeader.trim().split(/\s+/);

  if (rest.length > 0) {
    return null;
  }

  if (scheme?.toLowerCase() !== "bearer") {
    return null;
  }

  return token || null;
};

module.exports = async (req, res, next) => {
  const token = extractBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not configured" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id email isVerified");

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before accessing this route" });
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      isVerified: user.isVerified,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Token has expired";
      return next(error);
    }

    if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid token";
      return next(error);
    }

    return next(error);
  }
};
