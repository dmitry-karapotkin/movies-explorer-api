const Movie = require('../models/movies');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const AlreadyExistsError = require('../errors/already-exists-error');
const BadRequestError = require('../errors/bad-request-error');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((data) => res.send(data))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const { movieId } = req.body;
  Movie.findById(movieId)
    .then((data) => {
      if (data === null) {
        Movie.create(req.body)
          .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
              next(new BadRequestError());
            } else {
              next(err);
            }
          });
      } else {
        throw new AlreadyExistsError('Фильм уже добавлен');
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id: movieId } = req.params;
  Movie.find({ movieId })
    .then((data) => {
      if (data === null) {
        throw new NotFoundError('Фильм не найден');
      }
      if (data.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return Movie.findAndRemove({ movieId })
        .then((movie) => res.send({ message: `Фильм ${movie.name} удален` }));
    })
    .catch(next);
};

module.exports = {
  getAllMovies,
  addMovie,
  deleteMovie,
};
