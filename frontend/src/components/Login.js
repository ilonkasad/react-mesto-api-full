import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
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
    handleLogin(password, email);
  }

  return (
    <form onSubmit={handleSubmit} className="signup">
      <div className="signup__account">
        <h1 className="signup__title">Вход</h1>
        <input id="email" name="email" type="email" value={data.email} onChange={handleChange} className="signup__input-data" placeholder="Email" />
        <input id="password" name="password" type="password" value={data.password} onChange={handleChange} className="signup__input-data" placeholder="Пароль" />
      </div>
      <div className="signup__login signup__login_type_in">
        <button className="signup__button">Войти</button>
      </div>
    </form>
  )
}

export default Login;