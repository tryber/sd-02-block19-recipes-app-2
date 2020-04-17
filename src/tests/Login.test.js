import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

afterEach(cleanup);

test('exibe todos os elementos da página', () => {
  const { getByText, getByTestId } = render(<Login />);

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
  const { getByTestId } = render(<Login />);

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
  const { getByTestId } = render(<Login />);

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
  const { getByTestId } = render(<Login />);

  const emailInput = getByTestId('email-input');
  const validEmail = 'aaa@bbb.com';

  const passwordInput = getByTestId('password-input');
  const validPassWord = '1234567';

  fireEvent.change(emailInput, { target: { value: validEmail } });
  fireEvent.change(passwordInput, { target: { value: validPassWord } });

  const loginSubmitBtn = getByTestId('login-submit-btn');
  expect(loginSubmitBtn.disabled).toBeFalsy();
});
