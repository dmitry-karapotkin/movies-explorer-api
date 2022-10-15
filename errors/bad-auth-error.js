class BadAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadAuthorizationError';
    this.statusCode = 401;
  }
}

module.exports = BadAuthError;
