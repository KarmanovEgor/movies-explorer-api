const mongoose = require('mongoose');
const validator = require('validator');

const moviesSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
      minlength: [2, 'чувак , минимум 2 символа'],
      maxlength: [30, 'чувак , максимум 30 символов'],
    },
    director: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
      minlength: [2, 'чувак , минимум 2 символа'],
      maxlength: [30, 'чувак , максимум 30 символов'],
    },
    duration: {
      type: Number,
      required: [true, 'поле должно быть заполнено'],
      minlength: [2, 'чувак , минимум 2 символа'],
      maxlength: [30, 'чувак , максимум 30 символов'],
    },
    year: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
      minlength: [2, 'чувак , минимум 2 символа'],
      maxlength: [30, 'чувак , максимум 30 символов'],
    },
    description: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
      minlength: [2, 'чувак , минимум 2 символа'],
      maxlength: [300, 'чувак , максимум 300 символов'],
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
