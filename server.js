require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { validateEnv } = require("./src/config/env");

validateEnv();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server running ${PORT}`),
);
