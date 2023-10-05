const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');
const { emailValid } = require('../utils/validCheck');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(emailValid),
    password: Joi.string().required().min(2),
  }),
}), login);

module.exports = router;
