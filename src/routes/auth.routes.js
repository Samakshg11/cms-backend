const router = require("express").Router();
const auth = require("../controllers/auth.controller");
router.post("/send-otp",auth.sendOTP);
router.post("/send-otp",auth.verifyOTP);
router.post("/send-otp",auth.signup);
router.post("/send-otp",auth.login);

module.exports = router;