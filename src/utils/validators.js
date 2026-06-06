const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const otpRegex = /^\d{6}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const isValidEmail = (value) => emailRegex.test(normalizeEmail(value));

const isStrongEnoughPassword = (value) =>
  typeof value === "string" && passwordRegex.test(value.trim());

const isValidOtp = (value) => typeof value === "string" && otpRegex.test(value.trim());

/**
 * Return an array of required field names that are missing or empty from `obj`.
 * Example: `missingFields(req.body, ['email','password'])` -> ['password']
 */
const missingFields = (obj, fields = []) => {
  return fields.filter((f) => !(obj && Object.prototype.hasOwnProperty.call(obj, f) && String(obj[f]).trim()));
};

module.exports = {
  isValidEmail,
  isStrongEnoughPassword,
  isValidOtp,
  normalizeEmail,
  missingFields,
};
