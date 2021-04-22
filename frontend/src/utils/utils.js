import { editValidator, addValidator, createCard, inputValues, dataInfo, api, popupEdit, popupAdd, popupAvatar } from './index.js';
import  Section  from './Section.js';
import { popupName, popupProfession, defaultLike, avatarSelector, btnUserInfo, 
         btnNewCard, btnUpdAva, btnLoadingTxt, btnSaveTxt, btnCreateTxt } from './constants.js';

 export function editCardOpen(modal) {
   modal.open();
   const info = inputValues.getUserInfo(dataInfo);
   popupName.value = info.name;
   popupProfession.value = info.about;
   editValidator.clearError();
  }

 export function addCardOpen(modal) {
    modal.open();
    addValidator.clearError();
  }

 export function editSubmitHandler({usrName, usrProfession}) {
    dataIsLoading(true, btnUserInfo, btnSaveTxt);
    api.updateUserInfo(
      {
        name: usrName,
        about: usrProfession
      }
    )
    .then(() => { 
      inputValues.setUserInfo(usrName, usrProfession);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })   
    .finally(()=> dataIsLoading(false,btnUserInfo, btnSaveTxt));
  }
  
 export function addSubmitHandler({nameCard, linkCard}) {
  dataIsLoading(true, btnNewCard, btnCreateTxt);  
  api.addNewCard(
      {
        name: nameCard,
        link: linkCard,
        likes: defaultLike
      }
    )
    .then(data => {
      const cardAdded = new Section({
        renderer: () => {
          cardAdded.addItem(createCard(nameCard, linkCard, defaultLike, data._id, data.owner._id));
        }
      }, ".elements");
      cardAdded.renderItem();
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err);
    }) 
    .finally(()=> dataIsLoading(false, btnNewCard, btnCreateTxt));
  }

  export function avatarSubmitHandler({linkAvatar}) {
    dataIsLoading(true, btnUpdAva, btnSaveTxt);
    api.updateAvatar(
      {
        avatar: linkAvatar
      }
    )
    .then(()=>{
      inputValues.setAvatar(avatarSelector,linkAvatar);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> dataIsLoading(false, btnUpdAva, btnSaveTxt));         
  }
  
 export function closeByPopup(evt,modal) {
    if (evt.target.classList.contains('popup')) {
       modal.classList.remove("popup_active"); 
    }
  }
  function dataIsLoading(isLoading, button, textDefault) {
    if (isLoading) {
        button.textContent = btnLoadingTxt;
    }
    else {
        button.textContent = textDefault;
    }
  }
  
  