const Movie = require('../models/movies');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const AlreadyExistsError = require('../errors/already-exists-error');
const BadRequestError = require('../errors/bad-request-error');

const getAllMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate(['owner'])
    .then((data) => res.send(data))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const { movieId } = req.body;
  const owner = req.user._id;
  Movie.findOne({ movieId, owner })
    .then((data) => {
      if (data === null) {
        const movie = req.body;
        movie.owner = owner;
        Movie.create(movie)
          .then((addedMovie) => addedMovie.populate('owner'))
          .then((addedMovie) => res.send(addedMovie))
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
  const movieId = req.params._id;
  Movie.findOne({ movieId })
    .then((data) => {
      if (data === null) {
        throw new NotFoundError('Фильм не найден');
      }
      if (data.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return Movie.findOneAndRemove({ movieId })
        .then((movie) => res.send({ message: `Фильм ${movie.nameRU} удален` }));
    })
    .catch(next);
};

module.exports = {
  getAllMovies,
  addMovie,
  deleteMovie,
};
