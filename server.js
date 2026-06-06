require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { getPort, validateEnv } = require("./src/config/env");
const logger = require("./utils/logger");

let server;

const shutdown = (signal) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);

  if (!server) {
    process.exit(0);
    return;
  }

  server.close((error) => {
    if (error) {
      logger.error("Error while closing server", error.message);
      process.exit(1);
      return;
    }

    logger.info("Shutdown complete");
    process.exit(0);
  });
};

const startServer = async () => {
  validateEnv();
  await connectDB();
  const port = getPort();

  server = app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer().catch((error) => {
  logger.error("Failed to start server", error.message);
  process.exit(1);
});
