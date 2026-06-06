/**
 * Authentication routes
 * - POST /send-otp    : send an OTP to an email
 * - POST /verify-otp  : verify OTP and mark email verified
 * - POST /signup      : create a new user
 * - POST /login       : authenticate and receive JWT
 */
const router = require("express").Router();

const auth = require("../controllers/auth.controller");
const {
  validateEmail,
  validateSignup,
  validateLogin,
  validateOtp,
} = require("../middlewares/validate.middleware");

router.post("/send-otp", validateEmail, auth.sendOTP);
router.post("/verify-otp", validateEmail, validateOtp, auth.verifyOTP);
router.post("/signup", validateEmail, validateSignup, auth.signup);
router.post("/login", validateEmail, validateLogin, auth.login);

module.exports = router;
