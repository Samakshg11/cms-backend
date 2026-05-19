const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is required" });
  }

  const [scheme, token] = authHeader.trim().split(/\s+/);

  if (scheme?.toLowerCase() !== "bearer" || !token) {
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
    error.statusCode = 401;
    error.message = "Invalid token";
    next(error);
  }
};
