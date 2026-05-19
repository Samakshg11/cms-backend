const requiredVars = ["MONGO_URI", "JWT_SECRET", "EMAIL_USER", "EMAIL_PASS"];
const allowedNodeEnvs = new Set(["development", "test", "production"]);
const DEFAULT_PORT = 5000;

let resolvedPort = DEFAULT_PORT;

const readEnv = (name) => {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
};

const validateEnv = () => {
  const missing = requiredVars.filter((name) => readEnv(name).length === 0);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  requiredVars.forEach((name) => {
    process.env[name] = readEnv(name);
  });

  const rawNodeEnv = readEnv("NODE_ENV");
  process.env.NODE_ENV = rawNodeEnv || "development";

  if (!allowedNodeEnvs.has(process.env.NODE_ENV)) {
    throw new Error(
      `Invalid NODE_ENV: ${process.env.NODE_ENV}. Expected one of development, test, production`
    );
  }

  const rawPort = readEnv("PORT");

  if (rawPort.length > 0) {
    const parsedPort = Number(rawPort);
    const isValidPort = Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort <= 65535;

    if (!isValidPort) {
      throw new Error(`Invalid PORT: ${process.env.PORT}`);
    }

    resolvedPort = parsedPort;
    process.env.PORT = String(parsedPort);
    return;
  }

  resolvedPort = DEFAULT_PORT;
  process.env.PORT = String(DEFAULT_PORT);
};

module.exports = {
  DEFAULT_PORT,
  getPort: () => resolvedPort,
  validateEnv,
};
