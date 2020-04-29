import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Profile from '../pages/Profile';
import RecipesAppProvider from '../context/RecipesAppContext';

afterEach(cleanup);

test('renderiza todos os elementos da página', () => {
  localStorage.setItem('user', JSON.stringify({ email: 'aaaaa@bbbbb.com' }));

  const { getByTestId } = render(
    <RecipesAppProvider>
      <Profile />
    </RecipesAppProvider>,
  );

  const profileEmail = getByTestId('profile-email');
  expect(profileEmail).toBeInTheDocument();

  const profileDoneBtn = getByTestId('profile-done-btn');
  expect(profileDoneBtn).toBeInTheDocument();

  const profileFavoriteBtn = getByTestId('profile-favorite-btn');
  expect(profileFavoriteBtn).toBeInTheDocument();

  const profileLogoutBtn = getByTestId('profile-logout-btn');
  expect(profileLogoutBtn).toBeInTheDocument();
});

test('limpa o localStorage quando o botão "Sair" é clicado', () => {
  localStorage.setItem('user', JSON.stringify({ email: 'aaaaa@bbbbb.com' }));

  const { getByTestId } = render(
    <RecipesAppProvider>
      <Profile />
    </RecipesAppProvider>,
  );

  const profileLogoutBtn = getByTestId('profile-logout-btn');
  fireEvent.click(profileLogoutBtn);

  const localStorageUser = JSON.parse(localStorage.getItem('user'));
  expect(localStorageUser).toBeNull();
});
