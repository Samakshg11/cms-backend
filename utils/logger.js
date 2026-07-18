function timestamp() {
  return new Date().toISOString();
}

function formatLogArg(value) {
  if (value instanceof Error) {
    return value.stack || value.message;
  }

  return value;
}

module.exports = {
  info: (...args) => console.log('[INFO]', timestamp(), ...args.map(formatLogArg)),
  warn: (...args) => console.warn('[WARN]', timestamp(), ...args.map(formatLogArg)),
  error: (...args) => console.error('[ERROR]', timestamp(), ...args.map(formatLogArg)
};
