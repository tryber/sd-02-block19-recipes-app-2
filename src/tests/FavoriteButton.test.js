import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FavoriteButton from '../components/FavoriteButton';

afterEach(cleanup);

test('renderiza o botão quando não se passa "index" como prop', () => {
  const { getByTestId } = render(<FavoriteButton id="3" category="a" image="b" />);

  const button = getByTestId('favorite-btn');
  expect(button).toBeInTheDocument();
});

test('renderiza o botão quando se passa "index" como prop', () => {
  const { getByTestId } = render(<FavoriteButton id="7" category="c" image="d" index={0} />);

  const button = getByTestId('0-horizontal-favorite-btn');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let isFavorite = favoriteRecipes.some((item) => item.id === '7');
  expect(isFavorite).toBeTruthy();

  fireEvent.click(button);

  favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  isFavorite = favoriteRecipes.some((item) => item.id === '7');
  expect(isFavorite).toBeFalsy();
});
