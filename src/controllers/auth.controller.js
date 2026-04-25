const User = require("../models/user.model");
const OTP = require("../models/otp.model");   
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // token generate
const otpGenerator = require("otp-generator"); // otp create
const nodemailer = require("nodemailer"); // email send


// email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail", // gmail service
  auth: {
    user: process.env.EMAIL_USER, // gmail id hai 
    pass: process.env.EMAIL_PASS  // gmail app password hai 
  }
});
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body; // body se email lena

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = otpGenerator.generate(6, { digits: true });

    // 5 minute expiry set
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // otp database me save
    await OTP.create({ email, otp, expiresAt });

    // email send
    await transporter.sendMail({
      to: email, // receiver
      subject: "Your OTP Code", 
      text: `Your OTP is ${otp}` 
    });

    res.status(200).json({
      message: "OTP sent successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.verifyOTP = async (req, res) => {

  const { email, otp } = req.body; // body se email & otp leta hai
  // latest otp record find
  const record = await OTP.findOne({ email }).sort({ createdAt: -1 });
  if (!record) 
    return res.status(400).json({ message: "No OTP found" });
  // expiry check krta hai y function
  if (record.expiresAt < new Date())
    return res.status(400).json({ message: "OTP khtam " });
  // otp compare krta hai 
  const match = await bcrypt.compare(otp, record.otp);
  if (!match)
    return res.status(400).json({ message: "GLT OTP" });
  // user verify update
  await User.updateOne({ email }, { isVerified: true });
  res.json({ message: "Email Sahi hai lala" });
};



exports.signup = async (req, res) => {

  const { email, password } = req.body; // body se data lena

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // new user create 
  const user = await User.create({ email, password });
  res.status(201).json({
    id: user._id,
    email: user.email,
    isVerified: user.isVerified
  }); 
};

exports.login = async (req, res) => {
  const { email, password } = req.body; // login data body s le rha hai 

  // user ko search liya jaa rha hai by email
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Aisa koi user nhi hai" });
  // password compare
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: "Galat Paasword hai" });
  // token generate kr rha hai y
  const token = jwt.sign(
    { id: user._id }, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: "7d" } // token expiry
  );
  res.json({ token });
};