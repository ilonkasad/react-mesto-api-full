import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from '../components/Header';
import Main from '../components/Main';
import Register from '../components/Register';
import Login from '../components/Login';
import InfoTooltip from '../components/InfoTooltip';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import Api from '../utils/api.js';
import * as auth from '../middlewares/auth';

export const api = new Api(
  {
    url: auth.BASE_URL,
    headers: {
      'authorization': localStorage.getItem('token'),
      'Accept': 'text/html, application/json',
      'Content-Type': 'application/json'
    }
  }
);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerStatus, setHeaderStatus] = useState('register');
  const [userData, setUserData] = useState({
    password: '',
    email: ''
  });
  const [tooltip, setTooltip] = useState({
    success: true,
    display: false
  });
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setselectedCard] = React.useState(null);
  const [currentUser, setUser] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const history = useHistory();

  const handleLogin = (password, email) => {
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          setLoggedIn(true);
          setHeaderStatus('logout');
          setUserData({
            ...userData,
            password: password,
            email: email,
          })
          history.push('/');
        } else {
          if (data.message === "[object Object]") {
            setLoggedIn(false);
            throw new Error("Некорректный email или пароль");
          }
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  const handleRegister = (password, email) => {
    auth.register(password, email)
      .then((res) => {
        if (res.error === 'Пользователь с таким email уже зарегистрирован') {
          throw new Error(res.error);
        }
        setHeaderStatus('register');
        setTooltip({
          ...tooltip,
          success: true,
          display: true
        });
        history.push('/signin')
      })
      .catch((e) => {
        console.error(e.message);
        setHeaderStatus('toRegister');
        setTooltip({
          ...tooltip,
          success: false,
          display: true
        });
      });
  }

  const handleSignOut = (headerStatus) => {
    if (headerStatus === 'logout') {
      setLoggedIn(false);
      localStorage.removeItem('token');
      setHeaderStatus('register');
      history.push('/signin');
      setUserData({
        ...userData,
        password: '',
        email: '',
      })
    }
    else if (headerStatus === 'register') {
      setHeaderStatus('login');
      history.push('/signup');
    }
    else if (headerStatus === 'login') {
      setHeaderStatus('register');
      history.push('/signin');
    }
  }

  const handleInfoClose = () => {
    if (tooltip.success) {
      setHeaderStatus('register');
    }
    else {
      setHeaderStatus('login');
    }

    setTooltip({
      success: false,
      display: false
    });
  }

  const tokenCheck = React.useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setUserData(userData => ({ ...userData, username: res.username, email: res.email }));
            setLoggedIn(true);
          }
          else {
            if (res.message === "Токен не передан или передан не в том формате") {
              localStorage.removeItem('token');
              throw new Error(res.message);
            }
          }
        })
        .catch(e => {
          setLoggedIn(false);
          console.error(e)
        });
    } else {
      setLoggedIn(false);
    }
  }, [])

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  //информация о пользователе  
  React.useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      api.setToken();
      api.getUserInfo().then(data => {
        setUser(data)
      })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  //карточки
  React.useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      api.setToken();
      api.getInitialCards().then(data => {
        setCards(data)
      })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfileOpen(false);
    setAddPlacePopupOpen(false);
    setselectedCard(null);
  }
  function handleCardClick(card) {
    setselectedCard(card);
  }
  function handleUpdateUser(obj) {
    api.updateUserInfo(obj)
      .then(res => {
        setUser(res.data);

      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopups());
  }
  function handleUpdateAvatar(link) {
    api.updateAvatar(link)
      .then(res => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopups());
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard.data : c);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id, { owner: card.owner, user: currentUser._id }).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(cardInfo) {
    api.addNewCard(cardInfo).then((newCard) => {
      setCards([newCard.data, ...cards]);
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopups());
  }


  return (
    <div className="main-page">
      <Header headerStatus={headerStatus} email={userData.email} onSignOut={handleSignOut} />
      <Switch>
        <ProtectedRoute exact path="/" component={Main} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} loggedIn={loggedIn} currentUser={currentUser}>
        </ProtectedRoute>
        <Route path="/signup">
          <Register handleRegister={handleRegister} />
        </Route>
        <Route path="/signin">
          <Login handleLogin={handleLogin} />
        </Route>
        <Footer />
      </Switch>

      <InfoTooltip display={tooltip.display} success={tooltip.success} onClose={handleInfoClose} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} currentUser={currentUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <PopupWithForm name="submit"
        title="Вы уверены?"
        submitName="Да"
        isOpen={0}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <ImagePopup card={selectedCard}
        onClose={closeAllPopups} />

    </div>
  );
}

export default App;
