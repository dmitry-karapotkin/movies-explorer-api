class BadAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadAuthorizationError';
    this.statusCode = 401;
    this.message = 'Неправильная почта или пароль';
  }
}

module.exports = BadAuthError;
