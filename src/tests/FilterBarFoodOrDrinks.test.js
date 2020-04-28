import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FilterBarFoodOrDrinks from '../components/FilterBarFoodOrDrinks';
import RecipesAppProvider from '../context/RecipesAppContext';

afterEach(cleanup);

test('renderiza todos os botões de filtro', () => {
  const { getByText } = render(
    <RecipesAppProvider>
      <FilterBarFoodOrDrinks />
    </RecipesAppProvider>,
  );

  const buttonAll = getByText('All');
  const buttonFood = getByText('Food');
  const buttonDrinks = getByText('Drinks');

  expect(buttonAll).toBeInTheDocument();
  expect(buttonFood).toBeInTheDocument();
  expect(buttonDrinks).toBeInTheDocument();
});

test('todos os botões estão habilitados para clique', () => {
  const { getByText } = render(
    <RecipesAppProvider>
      <FilterBarFoodOrDrinks />
    </RecipesAppProvider>,
  );

  const buttonAll = getByText('All');
  const buttonFood = getByText('Food');
  const buttonDrinks = getByText('Drinks');

  expect(buttonAll.disabled).toBeFalsy();
  expect(buttonFood.disabled).toBeFalsy();
  expect(buttonDrinks.disabled).toBeFalsy();
});

test('após o clique num dos botões, todos permanecem habilitados para clique', () => {
  const { getByText } = render(
    <RecipesAppProvider>
      <FilterBarFoodOrDrinks />
    </RecipesAppProvider>,
  );

  const buttonAll = getByText('All');
  const buttonFood = getByText('Food');
  const buttonDrinks = getByText('Drinks');

  fireEvent.click(buttonDrinks);

  expect(buttonAll.disabled).toBeFalsy();
  expect(buttonFood.disabled).toBeFalsy();
  expect(buttonDrinks.disabled).toBeFalsy();
});
