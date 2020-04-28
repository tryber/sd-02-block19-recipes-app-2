import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipesAppProvider from '../context/RecipesAppContext';
import imagemTeste from '../images/imagemTeste.svg';

const localStorageMock = [
  {
    type: 'comida',
    id: '3453',
    image: imagemTeste,
    name: 'um nome',
    category: 'uma categoria',
    area: 'uma área',
    alcoholicOrNot: null,
    doneDate: null,
    tags: null,
  },
  {
    type: 'bebida',
    id: '2348',
    image: imagemTeste,
    name: 'outro nome',
    category: 'outra categoria',
    area: null,
    alcoholicOrNot: 'alcoólico',
    doneDate: null,
    tags: null,
  },
];

afterEach(cleanup);

test('renderiza a barra de filtros', () => {
  const { getByText } = render(
    <RecipesAppProvider>
      <FavoriteRecipes />
    </RecipesAppProvider>,
  );

  const buttonAll = getByText('All');
  const buttonFood = getByText('Food');
  const buttonDrinks = getByText('Drinks');

  expect(buttonAll).toBeInTheDocument();
  expect(buttonFood).toBeInTheDocument();
  expect(buttonDrinks).toBeInTheDocument();
});

test('renderiza os cards', () => {
  localStorage.setItem('favorite-recipes', JSON.stringify(localStorageMock));

  const { getByText } = render(
    <RecipesAppProvider>
      <FavoriteRecipes />
    </RecipesAppProvider>,
  );

  expect(getByText('um nome')).toBeInTheDocument();
  expect(getByText('uma área - uma categoria')).toBeInTheDocument();

  expect(getByText('outro nome')).toBeInTheDocument();
  expect(getByText('alcoólico')).toBeInTheDocument();
});

test('renderiza os cards de acordo com o tipo escolhido, comida ou bebida', () => {
  localStorage.setItem('favorite-recipes', JSON.stringify(localStorageMock));

  const { getByText, queryByText } = render(
    <RecipesAppProvider>
      <FavoriteRecipes />
    </RecipesAppProvider>,
  );

  const buttonFood = getByText('Food');
  const buttonDrinks = getByText('Drinks');

  fireEvent.click(buttonFood);

  expect(queryByText('um nome')).toBeInTheDocument();
  expect(queryByText('uma área - uma categoria')).toBeInTheDocument();

  expect(queryByText('outro nome')).toBeNull();
  expect(queryByText('alcoólico')).toBeNull();

  fireEvent.click(buttonDrinks);

  expect(queryByText('um nome')).toBeNull();
  expect(queryByText('uma área - uma categoria')).toBeNull();

  expect(queryByText('outro nome')).toBeInTheDocument();
  expect(queryByText('alcoólico')).toBeInTheDocument();
});
