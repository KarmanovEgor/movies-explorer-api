const { celebrate, Joi } = require('celebrate');
// const validator = require('validator'); не получилось у меня через валидатор
const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { emailValid } = require('../utils/validCheck');

router.post('/', celebrate({
  body: Joi.object().keys({
    // Joi.string().allow('').pattern(new RegExp(validator.isEmail())),
    email: Joi.string().required().email(emailValid),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
module.exports = router;
