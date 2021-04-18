/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createProfile } = require('./controllers/users');

const app = express();
const { PORT = 3000 } = process.env;

const options = {
  origin: [
    'http://localhost:3000',
    'https://ваш-домен',
    'https://your-name-of.github.io',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('*', cors(options));

app.use(bodyParser.json());

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email()
          .messages({
            'string.email': 'Некорректный адрес почты',
            'string.empty': 'Не указан адрес почты',
            'any.required': 'Адрес почты обязателен для заполнения',
          }),
        password: Joi.string().required().min(8)
          .messages({
            'string.min': 'Пароль должен содержать минимум 8 символов',
            'string.empty': 'Не указан пароль',
            'any.required': 'Пароль обязателен для заполнения',
          }),
      })
      .unknown(true),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30)
          .messages({
            'string.min': 'Имя должно содержать больше 2 символов',
            'string.max': 'Имя должно содержать менее 30 символов',
            'string.empty': 'Не указано имя пользователя',
          }),
        about: Joi.string().min(2).max(30)
          .messages({
            'string.min': 'Поле информация о пользователе должно содержать больше 2 символов',
            'string.max': 'Поле информация о пользователе должно содержать менее 30 символов',
            'string.empty': 'Не указана информация о пользователе',
          }),
        avatar: Joi.string().pattern(new RegExp(/(http|https):\/\/(www\.)?(\S+)\.([a-zA-Z])+(\/)?(\w-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=)?/))
          .message('Неверно указана ссылка для аватара пользователя')
          .messages({
            'string.empty': 'Не указана ссылка для аватара пользователя',
          }),
        email: Joi.string().required().email()
          .messages({
            'string.email': 'Некорректный адрес почты',
            'string.empty': 'Не указан адрес почты',
            'any.required': 'Адрес почты обязателен для заполнения',
          }),
        password: Joi.string().required().min(8)
          .messages({
            'string.min': 'Пароль должен содержать минимум 8 символов',
            'string.empty': 'Не указан пароль',
            'any.required': 'Пароль обязателен для заполнения',
          }),
      })
      .unknown(true),
  }),
  createProfile,
);

app.use('/', usersRouter);
app.use('/', cardsRouter);

// app.use(auth);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
