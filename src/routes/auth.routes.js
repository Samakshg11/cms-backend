const router = require("express").Router(); // router create

const auth = require("../controllers/auth.controller"); // controller import


// send otp route
router.post("/send-otp", auth.sendOTP);

// verify otp route
router.post("/verify-otp", auth.verifyOTP);

// signup route
router.post("/signup", auth.signup);

// login route
router.post("/login", auth.login);


module.exports = router; // router export