const logger = require('../../utils/logger');

module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let details;
  const isDev = process.env.NODE_ENV === "development";

  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
    details = Object.values(err.errors || {}).map((item) => item.message);
  }

  if (err.name === "CastError") {
    status = 400;
    message = "Invalid identifier format";
  }

  if (err.code === 11000) {
    status = 409;
    message = "A record with the same unique value already exists";
    details = Object.keys(err.keyPattern || {});
  }

  if (status >= 500) {
    logger.error("Unhandled server error", req.method, req.originalUrl, err);
  }

  res.status(status).json({
    success: false,
    message,
    ...(details && details.length > 0 ? { details } : {}),
    ...(isDev && { stack: err.stack }),
  });
};
