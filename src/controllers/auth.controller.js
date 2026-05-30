const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const asyncHandler = require("../utils/async-handler");
const { normalizeEmail } = require("../utils/validators");
const { getJwtConfig } = require("../config/env");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createAuthToken = (userId) => {
  const { expiresIn, issuer } = getJwtConfig();

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn,
    issuer,
  });
};

exports.sendOTP = asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await OTP.deleteMany({ email });
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
  const email = normalizeEmail(req.body.email);
  const { otp } = req.body;
  const user = await User.findOne({ email }).select("_id");
  if (!user) {
    return res.status(404).json({ message: "User not found for this email" });
  }

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

  await Promise.all([
    User.updateOne({ _id: user._id }, { isVerified: true }),
    OTP.deleteMany({ email }),
  ]);

  res.json({ message: "Email verified successfully" });
});

exports.signup = asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const { password } = req.body;
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
  const email = normalizeEmail(req.body.email);
  const { password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const match = await user.comparePassword(password);
  if (!match) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ message: "Please verify your email before logging in" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }

  const token = createAuthToken(user._id);
  res.json({ token });
});
