const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { createMovie, getMovie, deleteMovie } = require('../controllers/movies');
const BadRequestError = require('../errors/BadRequestError');

router.get('/', getMovie);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);
const urlValid = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new BadRequestError('Ссылка невалидна');
};
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(urlValid),
      trailerLink: Joi.string().required().custom(urlValid),
      thumbnail: Joi.string().required().custom(urlValid),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

module.exports = router;
