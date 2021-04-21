import React from 'react';
import iconDel from '../images/sprint-4-images/icon-del.svg';
import iconDelUp from '../images/sprint-4-images/icon-del-up.svg';

function Card({ card, onCardClick, onCardLike, onCardDelete, currentUser }) {

    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }

    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `elements__trash ${isOwn ? '' : 'elements__trash_hide'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `elements__like ${!isLiked ? '' : 'elements__like_active'}`
    );
    return (
        <div className="elements__element">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
                <img className="elements__trash-img" src={iconDelUp} alt="Иконка удаления" />
                <img src={iconDel} alt="Иконка удаления')%>" />
            </button>
            <img className="elements__image" src={card.link} onClick={handleClick} alt={card.name} />
            <div className="elements__group">
                <h2 className="elements__title popup__title_submit">{card.name}</h2>
                <div className="elements__like-group">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <h3 className="elements__like-count">{card.likes.length}</h3>
                </div>
            </div>
        </div>
    )
}
export default Card;
