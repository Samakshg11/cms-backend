require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { getPort, validateEnv } = require("./src/config/env");

let server;

const shutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);

  if (!server) {
    process.exit(0);
    return;
  }

  server.close((error) => {
    if (error) {
      console.error("Error while closing server", error.message);
      process.exit(1);
      return;
    }

    process.exit(0);
  });
};

const startServer = async () => {
  validateEnv();
  await connectDB();
  const port = getPort();

  server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer().catch((error) => {
  console.error("Failed to start server");
  console.error(error.message);
  process.exit(1);
});
