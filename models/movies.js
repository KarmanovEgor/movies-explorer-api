const mongoose = require('mongoose');
const validator = require('validator');

const moviesSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'поле должно быть заполнено'],

    },
    duration: {
      type: Number,
      required: [true, 'поле должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
      validate: [validator.isURL, 'Введите верную ссылку'],
    },
    trailerLink: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
      validate: [validator.isURL, 'Введите верную ссылку'],
    },
    thumbnail: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
      validate: [validator.isURL, 'Введите верную ссылку'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'поле должно быть заполнено'],
    },
    movieId: {
      type: Number,
      required: [true, 'Поле должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', moviesSchema);
