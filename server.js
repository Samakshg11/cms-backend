require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { getPort, validateEnv } = require("./src/config/env");

const startServer = async () => {
  validateEnv();
  await connectDB();
  const port = getPort();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server");
  console.error(error.message);
  process.exit(1);
});
