import React from 'react';
import PopupWithForm from '../components/PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    
    const avaRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avaRef.current.value,
        });
      } 

    return (
        <PopupWithForm name="avatar" 
                      title="Обновить аватар?" 
                      submitName="Сохранить"
                      isOpen = {isOpen}
                      onClose = {onClose}
                      onSubmit = {handleSubmit}
        >
                      <input type="url"  ref={avaRef}  //onChange={handleChangeAvaLink} 
                      className="popup__field popup__field_type_avatar" placeholder="Ссылка на аватар" name="linkAvatar" required/>
                      <span className="popup__error popup__error_active" id="linkAvatar-error"></span>                       
       </PopupWithForm>
    )
}
export default EditAvatarPopup;