module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";
  const isDev = process.env.NODE_ENV === "development";

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message,
    ...(isDev && { stack: err.stack }),
  });
};
