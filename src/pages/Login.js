import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const Login = () => {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const validateEmail = ({ target }) => {
    const { value } = target;
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return regex.test(value) ? setEmailIsValid(true) : setEmailIsValid(false);
  };

  const validatePassword = ({ target }) => {
    const { value } = target;
    return (value.length > 6) ? setPasswordIsValid(true) : setPasswordIsValid(false);
  };

  return (
    <div>
      <SearchBar />
      <h1>Login</h1>
      <input placeholder="Email" data-testid="email-input" onChange={validateEmail} />
      <input placeholder="Senha" data-testid="password-input" onChange={validatePassword} />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={!(emailIsValid && passwordIsValid)}
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
