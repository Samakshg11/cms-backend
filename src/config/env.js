const requiredVars = ["MONGO_URI", "JWT_SECRET", "EMAIL_USER", "EMAIL_PASS"];
const allowedNodeEnvs = new Set(["development", "test", "production"]);
const DEFAULT_PORT = 5000;
const DEFAULT_JWT_EXPIRES_IN = "7d";
const DEFAULT_JWT_ISSUER = "cms-backend";

let resolvedPort = DEFAULT_PORT;
let resolvedCorsOrigins = "*";
let resolvedJwtExpiresIn = DEFAULT_JWT_EXPIRES_IN;
let resolvedJwtIssuer = DEFAULT_JWT_ISSUER;

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
  } else {
    resolvedPort = DEFAULT_PORT;
    process.env.PORT = String(DEFAULT_PORT);
  }

  const rawCorsOrigin = readEnv("CORS_ORIGIN");
  if (!rawCorsOrigin || rawCorsOrigin === "*") {
    resolvedCorsOrigins = "*";
  } else {
    const origins = rawCorsOrigin
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);

    resolvedCorsOrigins = origins.length > 0 ? origins : "*";
  }

  resolvedJwtExpiresIn = readEnv("JWT_EXPIRES_IN") || DEFAULT_JWT_EXPIRES_IN;
  resolvedJwtIssuer = readEnv("JWT_ISSUER") || DEFAULT_JWT_ISSUER;
};

module.exports = {
  DEFAULT_PORT,
  getCorsOrigins: () => resolvedCorsOrigins,
  getJwtConfig: () => ({
    expiresIn: resolvedJwtExpiresIn,
    issuer: resolvedJwtIssuer,
  }),
  getPort: () => resolvedPort,
  validateEnv,
};
