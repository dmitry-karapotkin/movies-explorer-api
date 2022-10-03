const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const AlreadyExistsError = require('../errors/already-exists-error');
const BadRequestError = require('../errors/bad-request-error');
const { superSecret } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, name, password: hash,
    }))
    .then(() => res.send({
      email, name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError());
      } else if (err.code === 11000) {
        next(new AlreadyExistsError('Данный email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((data) => res.send(data))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user === null) {
        User.findByIdAndUpdate(
          userId,
          { email, name },
          {
            new: true,
            runValidators: true,
            upsert: false,
          },
        )
          .then((data) => res.send(data))
          .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
              next(new BadRequestError());
            } else {
              next(err);
            }
          });
      } else {
        throw new AlreadyExistsError('Данный email уже занят');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOneByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : superSecret,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
          secure: NODE_ENV === 'production' || false,
          sameSite: 'None',
        })
        .send({ message: 'Успешная авторизация' })
        .end();
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUserInfo,
};
