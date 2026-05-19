const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  const connection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(
    `MongoDB connected: ${connection.connection.host} (${process.env.NODE_ENV || "development"})`
  );

  return connection;
};

module.exports = connectDB;
