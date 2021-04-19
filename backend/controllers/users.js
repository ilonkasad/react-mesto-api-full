/* eslint-disable arrow-body-style */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const QueryError = require('../errors/not-found-err');
const DuplicationError = require('../errors/duplication-err');
const AuthError = require('../errors/auth-err');

const MONGO_DUPLICATE_ERR_CODE = 11000;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.cookie('jwt', token, { httpOnly: true });
      res.send({ token });
    })
    .catch((err) => {
      throw new AuthError({ message: err.message });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getProfile = (req, res, next) => {
  User.findOne({ _id: req.params._id })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new QueryError('Нет пользователя с таким id');
      }
      next(err);
    })
    .catch(next);
};
const getMeProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new QueryError('Нет пользователя с таким id');
      }
      next(err);
    })
    .catch(next);
};

const createProfile = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({
      data:
      {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new QueryError('Ошибка валидации');
      }
      if (err.kind === 'ObjectId') {
        throw new QueryError('Неправильный id');
      }
      if (err.code === MONGO_DUPLICATE_ERR_CODE) {
        throw new DuplicationError(
          'Пользователь с таким id уже зарегистрирован',
        );
      }
      next(err);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  if (name === null || about === null) {
    throw new QueryError('Некорректные данные для обновления данных пользователя');
  }
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new QueryError('Ошибка валидации');
      }
      next(err);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (avatar === null) {
    throw new QueryError('Неверная ссылка для обновления аватара');
  }
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new QueryError('Ошибка валидации');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getProfile,
  getMeProfile,
  createProfile,
  updateProfile,
  updateAvatar,
  login,
};
