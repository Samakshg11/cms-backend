const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (value) => typeof value === "string" && emailRegex.test(value.trim());

const isStrongEnoughPassword = (value) =>
  typeof value === "string" && value.length >= 6;

module.exports = {
  isValidEmail,
  isStrongEnoughPassword,
};
