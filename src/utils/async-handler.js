const logger = require('../../utils/logger');

module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    try {
      logger.error('Unhandled async error', req.method, req.originalUrl, err.message);
    } catch (e) {
      // ignore logging errors
    }
    next(err);
  });
};
