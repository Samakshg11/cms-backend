require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { validateEnv } = require("./src/config/env");

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  validateEnv();
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server");
  console.error(error.message);
  process.exit(1);
});
