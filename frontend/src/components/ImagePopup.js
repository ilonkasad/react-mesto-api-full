import React from 'react';
import closeIcon from '../images/sprint-4-images/close-icon.svg';

function ImagePopup({card, onClose}) {
    return (
    <div className={card? "popup popup_overlay-view popup_view popup_active" : "popup popup_overlay-view popup_view"}>
        <form className="popup__container popup__container_type_view " name="popup_view">
          <button className="popup__btn-close popup__btn-close_type_view" type="button" onClick={onClose}>
            <img className="popup__btn-close-img" src={closeIcon} alt="Закрыть"/>
          </button>
          <img className="popup__image" alt="Выбранное изображение" src={card? card.link: null} />
          <h2 className="popup__subtitle">{card? card.text: null}</h2>
        </form>
    </div>
    );
}
export default ImagePopup;