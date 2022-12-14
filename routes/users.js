const router = require('express').Router();
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');
const { validateUserInfo } = require('../middlewares/validations');

router.get('/me', getUserInfo);
router.patch('/me', validateUserInfo, updateUserInfo);

module.exports = router;
