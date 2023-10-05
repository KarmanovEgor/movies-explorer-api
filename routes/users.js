const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { emailValid } = require('../utils/validCheck');

const {
  getMe,
  editUser,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailValid),
  }),
}), editUser);

module.exports = router;
