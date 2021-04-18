import React from 'react';
import closeIcon from '../images/sprint-4-images/close-icon.svg';
import okIcon from '../images/sprint-4-images/login_ok.svg';
import badIcon from '../images/sprint-4-images/login_bad.svg';

const InfoTooltip = ({ display, success, onClose }) => {
  return (
    <div className={display ? "popup popup_overlay-view popup_view popup_active" : "popup popup_overlay-view popup_view"}>
      <form className="popup__container popup__container_type_view " name="popup_view">
        <button className="popup__btn-close" type="button" onClick={onClose}>
          <img className="popup__btn-close-img" src={closeIcon} alt="Закрыть" />
        </button>
        {success === true ?
          <div className="popup__info">
            <img className="popup__info-img" src={okIcon} alt="Успешная регистрация" />
            <p className="popup__info_msg">Вы успешно зарегистрировались!</p>
          </div>
          :
          <div className="popup__info">
            <img className="popup__info-img" src={badIcon} alt="Неуспешная регистрация" />
            <p className="popup__info_msg">Что-то пошло не так! Попробуйте еще раз.</p>
          </div>
        }

      </form>
    </div>
  )
}

export default InfoTooltip;