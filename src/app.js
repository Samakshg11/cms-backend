const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error.middleware");
const { getCorsOrigins } = require("./config/env");
const { name, version } = require("../package.json");

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(
  cors({
    origin: getCorsOrigins(),
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => res.send("CMS API Running"));
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: name,
    version,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/artifacts", require("./routes/artifact.routes"));

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

app.use(errorMiddleware);

module.exports = app;
