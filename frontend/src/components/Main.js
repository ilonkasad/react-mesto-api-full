import React from 'react';
import editBtn from '../images/sprint-4-images/edit.svg';
import addBtn from '../images/sprint-4-images/add.svg';
import Card from '../components/Card';

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={props.currentUser.avatar} alt="Аватар" />
          <button className="profile__avatar-button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__profile-info">
          <div className="profile__correction">
            <h1 className="profile__title">{props.currentUser.name}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button">
              <img
                src={editBtn}
                alt="Редактировать"
              />
            </button>
          </div>
          <h2 className="profile__subtitle">{props.currentUser.about}</h2>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} type="button">
          <img src={addBtn} alt="Добавить" />
        </button>
      </section>
      <section className="elements">
        {
          props.cards.map((card) =>
          (<Card key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={(card) => props.onCardLike(card)}
            onCardDelete={(card) => props.onCardDelete(card)}
            currentUser={props.currentUser} />
          ))
        }
      </section>
    </main>
  );
}
export default Main;