const jwt = require("jsonwebtoken"); // jwt import
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  // agar token nahi mila
  if (!token)
    return res.status(401).json({ message: "No token" });
  try {
    // token verify karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded data req me attach
    req.user = decoded;
    next(); // next route pe jao

  } catch (error) {

    res.status(401).json({ message: "Invalid token" });

  }
};