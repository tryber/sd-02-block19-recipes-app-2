import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { RecipesAppContext } from '../context/RecipesAppContext';

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

const submitForm = (email, setShouldRedirect) => {
  localStorage.setItem('meals-token', '1');
  localStorage.setItem('cocktails-token', '1');

  const emailObject = { email };
  localStorage.setItem('user', JSON.stringify(emailObject));

  setShouldRedirect(true);
};

const renderLoginPage = (setEmail, setEmailIsValid, setPasswordIsValid,
  emailIsValid, passwordIsValid, email, setShouldRedirect
) => (
  <div>
    <h1>Login</h1>
    <input
      placeholder="Email"
      data-testid="email-input"
      onChange={(event) => validateEmail(event, setEmail, setEmailIsValid)}
    />
    <input
      placeholder="Senha"
      data-testid="password-input"
      onChange={(event) => validatePassword(event, setPasswordIsValid)}
    />
    <button
      type="button"
      data-testid="login-submit-btn"
      disabled={!(emailIsValid && passwordIsValid)}
      onClick={() => submitForm(email, setShouldRedirect)}
    >
      Entrar
    </button>
  </div>
);

const Login = () => {
  const {
    displayHeader: [, setDisplayHeader],
    displayFooter: [, setDisplayFooter],
  } = useContext(RecipesAppContext);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(
    () => {
      setDisplayHeader(false);
      setDisplayFooter(false);
    },
    [],
  );

  return (
    shouldRedirect ?
      <Redirect to="/comidas" /> :
      renderLoginPage(setEmail, setEmailIsValid, setPasswordIsValid,
        emailIsValid, passwordIsValid, email, setShouldRedirect)
  );
};

export default Login;
