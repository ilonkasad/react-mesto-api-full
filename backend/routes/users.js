const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers,
  getProfile,
  getMeProfile,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMeProfile);

router.patch(
  '/users/me',
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
      })
      .unknown(true),
  }),
  updateProfile,
);

router.get('/users/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().messages({
      'string.length': 'некорректная длина id',
    }),
  }).unknown(true),
}), getProfile);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().pattern(new RegExp(/(http|https):\/\/(www\.)?(\S+)\.([a-zA-Z])+(\/)?(\w-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=)?/))
          .message('Неверно указана ссылка для аватара пользователя')
          .messages({
            'string.empty': 'Не указана ссылка для аватара пользователя',
          }),
      })
      .unknown(true),
  }),
  updateAvatar,
);

module.exports = router;
