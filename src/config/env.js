const requiredVars = ["MONGO_URI", "JWT_SECRET", "EMAIL_USER", "EMAIL_PASS"];
const allowedNodeEnvs = new Set(["development", "test", "production"]);
const DEFAULT_PORT = 5000;

let resolvedPort = DEFAULT_PORT;

const validateEnv = () => {
  const missing = requiredVars.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
  }

  if (!allowedNodeEnvs.has(process.env.NODE_ENV)) {
    throw new Error(
      `Invalid NODE_ENV: ${process.env.NODE_ENV}. Expected one of development, test, production`
    );
  }

  if (process.env.PORT !== undefined) {
    const parsedPort = Number(process.env.PORT);
    const isValidPort = Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort <= 65535;

    if (!isValidPort) {
      throw new Error(`Invalid PORT: ${process.env.PORT}`);
    }

    resolvedPort = parsedPort;
    return;
  }

  resolvedPort = DEFAULT_PORT;
};

module.exports = {
  DEFAULT_PORT,
  getPort: () => resolvedPort,
  validateEnv,
};
