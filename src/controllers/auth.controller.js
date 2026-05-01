const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const asyncHandler = require("../utils/async-handler");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
exports.sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = otpGenerator.generate(6, { digits: true });
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await OTP.create({ email, otp, expiresAt });
  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });

  res.status(200).json({
    message: "OTP sent successfully",
  });
});

exports.verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const record = await OTP.findOne({ email }).sort({ createdAt: -1 });
  if (!record) {
    return res.status(400).json({ message: "No OTP found for this email" });
  }

  if (record.expiresAt < new Date()) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  const match = await bcrypt.compare(otp, record.otp);
  if (!match) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await User.updateOne({ email }, { isVerified: true });
  res.json({ message: "Email verified successfully" });
});

exports.signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ email, password });
  res.status(201).json({
    id: user._id,
    email: user.email,
    isVerified: user.isVerified,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ token });
});
