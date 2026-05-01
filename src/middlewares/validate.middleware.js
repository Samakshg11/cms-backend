const { isValidEmail, isStrongEnoughPassword } = require("../utils/validators");

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please provide a valid email" });
  }

  next();
};

const validateSignup = (req, res, next) => {
  const { password } = req.body;

  if (!isStrongEnoughPassword(password)) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  next();
};

const validateLogin = validateSignup;

module.exports = {
  validateEmail,
  validateSignup,
  validateLogin,
};
