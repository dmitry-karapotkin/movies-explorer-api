const router = require('express').Router();
const {
  getAllMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateMovie,
  validateMovieId,
} = require('../middlewares/validations');

router.get('/', getAllMovies);
router.post('/', validateMovie, addMovie);
router.delete('/:_id', validateMovieId, deleteMovie);

module.exports = router;
