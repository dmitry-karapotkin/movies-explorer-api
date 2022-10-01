const router = require('mongoose').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-error');
const { validateNewUser, validateAuthentication } = require('../middlewares/validations');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateNewUser, createUser);
router.post('/signin', validateAuthentication, login);

router.user(auth);

router.use('/movies', movieRouter);
router.use('/users', userRouter);
router.get('/signout', (req, res) => {
  res
    .clearCookie('jwt', {
      httpOnly: true,
      maxAge: 3600000 * 24 * 7,
      secure: process.env.NODE_ENV === 'production' || false,
      sameSite: 'None',
    })
    .send({ message: 'Выход выполнен успешно' });
});
router.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;