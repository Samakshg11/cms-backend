const logger = require('../../utils/logger');

module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error('Unhandled async error', req.method, req.originalUrl, err);
    next(err);
  });
};
