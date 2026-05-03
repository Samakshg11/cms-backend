const {
  isValidEmail,
  isStrongEnoughPassword,
  isValidOtp,
  normalizeEmail,
} = require("../utils/validators");

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please provide a valid email" });
  }

  req.body.email = normalizeEmail(email);
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

const validateOtp = (req, res, next) => {
  const { otp } = req.body;

  if (!isValidOtp(otp)) {
    return res.status(400).json({ message: "OTP must be a 6-digit code" });
  }

  req.body.otp = otp.trim();
  next();
};

module.exports = {
  validateEmail,
  validateSignup,
  validateLogin,
  validateOtp,
};
