const mongoose = require("mongoose");
const logger = require("../../utils/logger");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  const connection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  logger.info(
    "MongoDB connected",
    connection.connection.host,
    process.env.NODE_ENV || "development"
  );

  return connection;
};

module.exports = connectDB;
