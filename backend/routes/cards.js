const routerCrd = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
} = require('../controllers/cards');

routerCrd.get('/cards', getCards);

routerCrd.post(
  '/cards',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30)
          .messages({
            'string.min': 'Наименование должно содержать больше 2 символов',
            'string.max': 'Наименование должно содержать менее 30 символов',
            'string.empty': 'Не указано наименование карточки',
          }),
        link: Joi.string().pattern(new RegExp(/(http|https):\/\/(www\.)?(\S+)\.([a-zA-Z])+(\/)?(\w-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=)?/))
          .messages({
            'string.empty': 'Не указана ссылка для карточки',
          }),
      })
      .unknown(true),
  }),
  createCard,
);

routerCrd.delete(
  '/cards/:_id',
  celebrate({
    params: Joi.object()
      .keys({
        _id: Joi.string().length(24).required().hex()
          .message(
            'некорректная длина id',
          ),
      })
      .unknown(true),
  }),
  deleteCard,
);

routerCrd.put(
  '/cards/:_id/likes',
  celebrate({
    params: Joi.object()
      .keys({
        _id: Joi.string().length(24).required().hex()
          .messages({
            'string.length': 'некорректная длина id',
          }),
      })
      .unknown(true),
  }),
  likeCard,
);

routerCrd.delete(
  '/cards/:_id/likes',
  celebrate({
    params: Joi.object()
      .keys({
        _id: Joi.string().length(24).required().hex()
          .messages({
            'string.length': 'некорректная длина id',
          }),
      })
      .unknown(true),
  }),
  deleteLikeCard,
);

module.exports = routerCrd;
