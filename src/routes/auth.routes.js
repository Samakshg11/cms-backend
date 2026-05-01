const router = require("express").Router(); // router create

const auth = require("../controllers/auth.controller"); // controller import
const {
  validateEmail,
  validateSignup,
  validateLogin,
} = require("../middlewares/validate.middleware");


// send otp route
router.post("/send-otp", validateEmail, auth.sendOTP);

// verify otp route
router.post("/verify-otp", validateEmail, auth.verifyOTP);

// signup route
router.post("/signup", validateEmail, validateSignup, auth.signup);

// login route
router.post("/login", validateEmail, validateLogin, auth.login);


module.exports = router; // router export
