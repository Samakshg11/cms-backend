const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const otpRegex = /^\d{6}$/;

const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const isValidEmail = (value) => emailRegex.test(normalizeEmail(value));

const isStrongEnoughPassword = (value) =>
  typeof value === "string" && value.trim().length >= 6;

const isValidOtp = (value) => typeof value === "string" && otpRegex.test(value.trim());

module.exports = {
  isValidEmail,
  isStrongEnoughPassword,
  isValidOtp,
  normalizeEmail,
};
