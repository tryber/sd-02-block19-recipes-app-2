import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesAppContext } from '../context/RecipesAppContext';
import '../styles/Login.css';

const validateEmail = ({ target }, setEmail, setEmailIsValid) => {
  const { value } = target;
  const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  setEmail(value);
  return regex.test(value) ? setEmailIsValid(true) : setEmailIsValid(false);
};

const validatePassword = ({ target }, setPasswordIsValid) => {
  const { value } = target;
  return (value.length > 6) ? setPasswordIsValid(true) : setPasswordIsValid(false);
};

const submitForm = (email) => {
  localStorage.setItem('meals-token', '1');
  localStorage.setItem('cocktails-token', '1');

  const emailObject = { email };
  localStorage.setItem('user', JSON.stringify(emailObject));
};

const renderEmailInput = (setEmail, setEmailIsValid) => (
  <input
    placeholder="Email"
    data-testid="email-input"
    onChange={(event) => validateEmail(event, setEmail, setEmailIsValid)}
  />
);

const renderPasswordInput = (setPasswordIsValid) => (
  <input
    type="password"
    placeholder="Senha"
    data-testid="password-input"
    onChange={(event) => validatePassword(event, setPasswordIsValid)}
  />
);

const renderLoginSubmitBtn = (emailIsValid, passwordIsValid, email, toggleHeaderAndFooter) => (
  <Link to="/comidas" className="link">
    <button
      type="button"
      data-testid="login-submit-btn"
      disabled={!(emailIsValid && passwordIsValid)}
      onClick={() => {
        submitForm(email);
        toggleHeaderAndFooter();
      }}
    >
      Entrar
    </button>
  </Link>
);

const Login = () => {
  const {
    toggleHeaderAndFooter,
  } = useContext(RecipesAppContext);

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="login-page">
      <h1>Login</h1>
      {renderEmailInput(setEmail, setEmailIsValid)}
      {renderPasswordInput(setPasswordIsValid)}
      {renderLoginSubmitBtn(emailIsValid, passwordIsValid, email, toggleHeaderAndFooter)}
    </div>
  );
};

export default Login;
