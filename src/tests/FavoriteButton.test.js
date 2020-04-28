import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FavoriteButton from '../components/FavoriteButton';
import RecipesAppProvider from '../context/RecipesAppContext';

afterEach(cleanup);

test('renderiza o botão quando não se passa "index" como prop', () => {
  const { getByTestId } = render(
    <RecipesAppProvider>
      <FavoriteButton id="3" category="a" image="b" />
    </RecipesAppProvider>,
  );

  const button = getByTestId('favorite-btn');
  expect(button).toBeInTheDocument();
});

test('renderiza o botão quando se passa "index" como prop', () => {
  const { getByTestId } = render(
    <RecipesAppProvider>
      <FavoriteButton id="7" category="c" image="d" index={0} />
    </RecipesAppProvider>,
  );

  const button = getByTestId('0-horizontal-favorite-btn');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  let favoriteRecipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];
  let isFavorite = favoriteRecipes.some((item) => item.id === '7');
  expect(isFavorite).toBeTruthy();

  fireEvent.click(button);

  favoriteRecipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];
  isFavorite = favoriteRecipes.some((item) => item.id === '7');
  expect(isFavorite).toBeFalsy();
});
