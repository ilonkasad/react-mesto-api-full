const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const QueryError = require('../errors/query-err');
const DelError = require('../errors/del-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new DelError('Невозможно удалить карточку');
      }
      Card.findByIdAndRemove(req.params._id)
        .then(() => {
          res.send();
        })
        .catch((err) => { next(err); })
        .catch(next);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new QueryError('Нет карточки с таким id');
      }
      next(err);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new QueryError('Нет карточки с таким id');
      }
      next(err);
    })
    .catch(next);
};

const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new QueryError('Нет карточки с таким id');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
