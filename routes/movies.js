const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createMovie,
  getMovie,
  deleteMovie,
} = require('../controllers/movies');
const { urlValid } = require('../utils/validCheck');

router.get('/', getMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlValid),
    trailerLink: Joi.string().required().pattern(urlValid),
    thumbnail: Joi.string().required().pattern(urlValid),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

module.exports = router;
