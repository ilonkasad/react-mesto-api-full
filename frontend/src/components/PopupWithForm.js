import React from 'react';
import closeIcon from '../images/sprint-4-images/close-icon.svg';

function PopupWithForm({ name, title, submitName, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={isOpen ? `popup popup_overlay-${name} popup_active` : `popup popup_overlay-${name}`}>
      <form className={`popup__container popup__container_type_${name}`} name={`popup_${name}`} onSubmit={onSubmit}>
        <button className="popup__btn-close" type="button" onClick={onClose}>
          <img className="popup__btn-close-img" src={closeIcon} alt="Закрыть" />
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__btn-save" type="submit">{submitName}</button>
      </form>
    </div>
  );
}
export default PopupWithForm;