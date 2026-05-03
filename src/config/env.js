const requiredVars = ["MONGO_URI", "JWT_SECRET", "EMAIL_USER", "EMAIL_PASS"];

const validateEnv = () => {
  const missing = requiredVars.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
  }
};

module.exports = {
  validateEnv,
};
