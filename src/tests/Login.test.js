import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import RecipesAppProvider from '../context/RecipesAppContext';

afterEach(cleanup);

test('exibe todos os elementos da página', () => {
  const { getByText, getByTestId } = render(
    <RecipesAppProvider>
      <App />
    </RecipesAppProvider>
  );

  const pageTitle = getByText(/Login/i);
  expect(pageTitle).toBeInTheDocument();

  const emailInput = getByTestId('email-input');
  expect(emailInput).toBeInTheDocument();

  const passwordInput = getByTestId('password-input');
  expect(passwordInput).toBeInTheDocument();

  const loginSubmitBtn = getByTestId('login-submit-btn');
  expect(loginSubmitBtn).toBeInTheDocument();
});

test('botão de entrar é desabilitado se email é inválido', () => {
  const { getByTestId } = render(
    <RecipesAppProvider>
      <App />
    </RecipesAppProvider>
  );

  const emailInput = getByTestId('email-input');
  const invalidEmail = 'aaa@bbb';

  const passwordInput = getByTestId('password-input');
  const validPassWord = '1234567';

  fireEvent.change(emailInput, { target: { value: invalidEmail } });
  fireEvent.change(passwordInput, { target: { value: validPassWord } });

  const loginSubmitBtn = getByTestId('login-submit-btn');
  expect(loginSubmitBtn.disabled).toBeTruthy();
});

test('botão de entrar é desabilitado se senha é inválida', () => {
  const { getByTestId } = render(
    <RecipesAppProvider>
      <App />
    </RecipesAppProvider>
  );

  const emailInput = getByTestId('email-input');
  const validEmail = 'aaa@bbb.com';

  const passwordInput = getByTestId('password-input');
  const invalidPassWord = '123456';

  fireEvent.change(emailInput, { target: { value: validEmail } });
  fireEvent.change(passwordInput, { target: { value: invalidPassWord } });

  const loginSubmitBtn = getByTestId('login-submit-btn');
  expect(loginSubmitBtn.disabled).toBeTruthy();
});

test('botão de entrar é habilitado se email e senha são válidos', () => {
  const { getByTestId } = render(
    <RecipesAppProvider>
      <App />
    </RecipesAppProvider>
  );

  const emailInput = getByTestId('email-input');
  const validEmail = 'aaa@bbb.com';

  const passwordInput = getByTestId('password-input');
  const validPassWord = '1234567';

  fireEvent.change(emailInput, { target: { value: validEmail } });
  fireEvent.change(passwordInput, { target: { value: validPassWord } });

  const loginSubmitBtn = getByTestId('login-submit-btn');
  expect(loginSubmitBtn.disabled).toBeFalsy();
});

test('botão de entrar funciona conforme o esperado', () => {
  const { getByTestId, queryByText } = renderWithRouter(
    <RecipesAppProvider>
      <App />
    </RecipesAppProvider>
  );

  const emailInput = getByTestId('email-input');
  const validEmail = 'aaa@bbb.com';
  const passwordInput = getByTestId('password-input');
  const validPassWord = '1234567';
  const loginSubmitBtn = getByTestId('login-submit-btn');

  fireEvent.change(emailInput, { target: { value: validEmail } });
  fireEvent.change(passwordInput, { target: { value: validPassWord } });
  fireEvent.click(loginSubmitBtn);

  const mealsToken = localStorage.getItem('meals-token');
  expect(mealsToken).toBe('1');

  const cocktailsToken = localStorage.getItem('cocktails-token');
  expect(cocktailsToken).toBe('1');

  const user = JSON.parse(localStorage.getItem('user'));
  expect(user.email).toBe('aaa@bbb.com');

  const comidas = queryByText(/comidas/i);
  expect(comidas).toBeInTheDocument();
});
