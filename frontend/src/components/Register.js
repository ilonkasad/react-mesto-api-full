/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

const Register = ({ handleRegister }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = data;

    handleRegister(password, email);
  }

  return (
    <form onSubmit={handleSubmit} className="signup">
      <div className="signup__account">
        <h1 className="signup__title">Регистрация</h1>
        <input id="email" name="email" type="email" value={data.email} onChange={handleChange} className="signup__input-data" placeholder="Email" />
        <input id="password" name="password" type="password" value={data.password} onChange={handleChange} className="signup__input-data" placeholder="Пароль" />
      </div>
      <div className="signup__login">
        <button className="signup__button">Зарегистрироваться</button>
        <p className="signup__assumption">Уже зарегистрированы? <a className="signup__assumption-link" href="#">Войти</a></p>
      </div>
    </form>
  )
}

export default Register;