import React from 'react';
import PopupWithForm from '../components/PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, currentUser }) {
  const [name, setEditProfileName] = React.useState('');
  const [description, setEditProfileDesc] = React.useState('');

  function handleChangeProfileName(e) {
    setEditProfileName(e.target.value);
  }
  function handleChangeProfileDesc(e) {
    setEditProfileDesc(e.target.value);
  }

  React.useEffect(() => {
    setEditProfileName(currentUser.name);
    setEditProfileDesc(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm name="edit"
      title="Редактировать профиль"
      submitName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" className="popup__field popup__field_type_name popup__field_type_profile-title" placeholder="Имя" name="usrName" required minLength="2" maxLength="40" value={name} onChange={handleChangeProfileName} />
      <span className="popup__error" id="usrName-error"></span>
      <input type="text" className="popup__field popup__field_type_profession popup__field_type_profile-subtitle" placeholder="Профессия" name="usrProfession" required minLength="2" maxLength="200" value={description} onChange={handleChangeProfileDesc} />
      <span className="popup__error popup__error_active" id="usrProfession-error"></span>
    </PopupWithForm>
  )
};
export default EditProfilePopup;