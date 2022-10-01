const { celebrate, Joi } = require('celebrate');
const { HTTP_REGEX } = require('../utils/constants');

const validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(HTTP_REGEX)),
    trailerLink: Joi.string().required().pattern(new RegExp(HTTP_REGEX)),
    thumbnail: Joi.string().required().pattern(new RegExp(HTTP_REGEX)),
    owner: Joi.string().alphanum().required(),
    movieId: Joi.string().alphanum().required(),
    nameRU: Joi.string().required().pattern(/^[\sа-яА-Я0-9]+$/),
    nameEN: Joi.string().required().pattern(/^[\sa-zA-Z0-9]+$/),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().required(),
  }),
});

module.exports = {
  validateNewUser,
  validateUserInfo,
  validateAuthentication,
  validateMovie,
  validateMovieId,
};
