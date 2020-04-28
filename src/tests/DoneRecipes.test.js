import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
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
    doneDate: '01/04/2019',
    tags: ['uma tag', 'outra tag'],
  },
  {
    type: 'bebida',
    id: '2348',
    image: imagemTeste,
    name: 'outro nome',
    category: 'outra categoria',
    area: null,
    alcoholicOrNot: 'alcoólico',
    doneDate: '05/03/2020',
    tags: null,
  },
];

afterEach(cleanup);

test('renderiza a barra de filtros', () => {
  const { getByText } = render(
    <RecipesAppProvider>
      <DoneRecipes />
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
  localStorage.setItem('done-recipes', JSON.stringify(localStorageMock));

  const { getByText } = render(
    <RecipesAppProvider>
      <DoneRecipes />
    </RecipesAppProvider>,
  );

  expect(getByText('um nome')).toBeInTheDocument();
  expect(getByText('uma área - uma categoria')).toBeInTheDocument();

  expect(getByText('outro nome')).toBeInTheDocument();
  expect(getByText('alcoólico')).toBeInTheDocument();
});

test('renderiza os cards de acordo com o tipo escolhido, comida ou bebida', () => {
  localStorage.setItem('done-recipes', JSON.stringify(localStorageMock));

  const { getByText, queryByText } = render(
    <RecipesAppProvider>
      <DoneRecipes />
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
