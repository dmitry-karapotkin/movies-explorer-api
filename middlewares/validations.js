const { celebrate, Joi } = require('celebrate');
const { HTTP_REGEX } = require('../utils/constants');

const validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .pattern(/^[a-zA-ZА-Яа-яЁё -]+$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .pattern(/^[a-zA-ZА-Яа-яЁё -]+$/),
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
    duration: Joi.number().required().integer().min(0),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(HTTP_REGEX)),
    trailerLink: Joi.string().required().pattern(new RegExp(HTTP_REGEX)),
    thumbnail: Joi.string().required().pattern(new RegExp(HTTP_REGEX)),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.number().integer().required(),
  }),
});

module.exports = {
  validateNewUser,
  validateUserInfo,
  validateAuthentication,
  validateMovie,
  validateMovieId,
};
