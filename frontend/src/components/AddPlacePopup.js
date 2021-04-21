import React from 'react';
import PopupWithForm from '../components/PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  let nameCard = React.useRef();
  let linkCard = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameCard.current.value,
      link: linkCard.current.value,
      likes: []
    });
    nameCard = '';
    linkCard = '';
  }

  return (
    <PopupWithForm name="add"
      title="Новое место"
      submitName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" ref={nameCard} className="popup__field popup__field_type_name" placeholder="Название" name="nameCard" required minLength="2" maxLength="30" />
      <span className="popup__error" id="nameCard-error"></span>
      <input type="url" ref={linkCard} className="popup__field popup__field_type_profession" placeholder="Ссылка на картинку" name="linkCard" required />
      <span className="popup__error popup__error_active" id="linkCard-error"></span>
    </PopupWithForm>
  )
}
export default AddPlacePopup;