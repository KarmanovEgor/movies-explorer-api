const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { SECRET_KEY = 'diploma' } = process.env;

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.status(HTTP_STATUS_CREATED).send({
        name: user.name, email: user.email, _id: user._id,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(`Пользователь с данным email: ${email} уже зареган`));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else {
          next(err);
        }
      }));
};

module.exports.editUser = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  User.findOne({ email }) // Проверяем, существует ли уже пользователь с указанным адресом почты
    .then((existingUser) => {
      if (existingUser && existingUser._id.toString() !== _id) {
        // Если пользователь существует и его _id не совпадает с _id текущего пользователя,
        // возвращаем ошибку 409
        throw new ConflictError('Адрес почты уже зарегистрирован другим пользователем');
      } else {
        // Если пользователь не существует или его _id совпадает с _id текущего пользователя,
        // обновляем данные пользователя
        return User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
          .orFail();
      }
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь по указанному идентификатору не найден'));
      } else if (err instanceof ConflictError) {
        // Обрабатываем ошибку 409 и отправляем соответствующее сообщение
        res.status(409).json({ message: err.message });
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
