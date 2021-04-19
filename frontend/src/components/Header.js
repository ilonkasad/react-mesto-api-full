import React from 'react';
const Header = ({ headerStatus, email, onSignOut }) => {
    let headerText;
    switch (headerStatus) {
        case 'login':
            headerText = 'Войти'; break;
        case 'register':
            headerText = 'Регистрация'; break;
        case 'toRegister':
            headerText = 'Зарегистрироваться'; break;
        case 'logout':
            headerText = 'Выйти'; break;
        default:
            headerText = 'Регистрация';
    }
    const handleSignOut = (e) => {
        e.preventDefault();
        onSignOut(headerStatus);
    }

    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__login">
                <p className="header__email">{email}</p>
                <button className="header__btn-out" onClick={handleSignOut}>{headerText}</button>
            </div>
        </header>
    );
}
export default Header;