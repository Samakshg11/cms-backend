module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal server error";
  const isDev = process.env.NODE_ENV === "development";

  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
  }

  if (err.name === "CastError") {
    status = 400;
    message = "Invalid identifier format";
  }

  if (err.code === 11000) {
    status = 409;
    message = "A record with the same unique value already exists";
  }

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message,
    ...(isDev && { stack: err.stack }),
  });
};
