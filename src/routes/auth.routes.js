const router = require("express").Router();

const auth = require("../controllers/auth.controller");
const {
  validateEmail,
  validateSignup,
  validateLogin,
} = require("../middlewares/validate.middleware");

router.post("/send-otp", validateEmail, auth.sendOTP);
router.post("/verify-otp", validateEmail, auth.verifyOTP);
router.post("/signup", validateEmail, validateSignup, auth.signup);
router.post("/login", validateEmail, validateLogin, auth.login);

module.exports = router;
