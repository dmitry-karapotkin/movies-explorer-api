require('dotenv').config();

const jwt = require('jsonwebtoken');
const BadAuthorizationError = require('../errors/bad-auth-error');
const { superSecret } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : superSecret);
  } catch (err) {
    next(new BadAuthorizationError());
  }
  req.user = payload;
  next();
};

module.exports = auth;
