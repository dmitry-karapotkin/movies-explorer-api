const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Неверный формат url-ссылки постера'],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Неверный формат url-ссылки трейлера'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Неверный формат url-ссылки миникартинки'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        validator.isAlpha(val, ['ru-RU'], { ignore: ' ' });
      },
      message: 'Неправильный формат названия фильма на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        validator.isAlpha(val, ['en-US'], { ignore: ' ' });
      },
      message: 'Неправильный формат названия фильма на английском языке',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
