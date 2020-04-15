import React from 'react';

const Login = () => (
  <div>
    <h1>Login</h1>
    <input placeholder="Email" data-testid="email-input" />
    <input placeholder="Senha" data-testid="password-input" />
    <button data-testid="login-submit-btn">Entrar</button>
  </div>
);

export default Login;
