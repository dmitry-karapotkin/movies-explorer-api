class EmailExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmailExistsError';
    this.statusCode = 409;
  }
}

module.exports = EmailExistsError;
