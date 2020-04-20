import React from 'react';
import {
  cleanup, wait, fireEvent,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import DrinkPage from '../pages/DrinkPage';
import { byDrinkName } from '../__mocks__/recipesDrinksMock';

const callCategoriesApi = ({ drinks }) => {
  const mockSuccessResponse = {
    drinks,
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    status: 200,
    ok: true,
    json: () => mockJsonPromise,
  });
  return mockFetchPromise;
};

const callRandomMealApi = ({ drinks }) => {
  const mockSuccessResponse = {
    drinks,
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    status: 200,
    ok: true,
    json: () => mockJsonPromise,
  });
  return mockFetchPromise;
};

const catMock = {
  drinks: [
    {
      strCategory: 'Ordinary Drink',
    },
    {
      strCategory: 'Cocktail',
    },
    {
      strCategory: 'Milk Shake',
    },
    {
      strCategory: 'Other',
    },
    {
      strCategory: 'Cocoa',
    },
  ],
};

const testCategoryByName = async (queryByTestId, category) => {
  fireEvent.click(queryByTestId(`${category}-category-filter`));
  await wait();
  catMock.drinks.forEach(({ strCategory }) => {
    if (strCategory === category) {
      expect(queryByTestId(`${strCategory}-category-filter`).disabled).toBeFalsy();
    } else {
      expect(queryByTestId(`${strCategory}-category-filter`).disabled).toBeTruthy();
    }
  });
  fireEvent.click(queryByTestId(`${category}-category-filter`));
  catMock.drinks.forEach(({ strCategory }) => {
    expect(queryByTestId(`${strCategory}-category-filter`).disabled).toBeFalsy();
  });
};

afterEach(cleanup);

describe('Drink page tests', () => {
  test('if component rendering', async () => {
    const { queryByText, history } = renderWithRouter(
      <RecipesAppProvider>
        <DrinkPage />
      </RecipesAppProvider>,
      {
        route: '/bebidas',
      },
    );
    expect(queryByText(/Loading/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/bebidas');
  });
  test('if inputsCategory is rendering', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => callCategoriesApi(catMock));

    const { queryByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <DrinkPage />
      </RecipesAppProvider>,
    );

    await wait(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

    expect(queryByTestId(/all-category-filter/i)).toBeInTheDocument();
    catMock.drinks.forEach(({ strCategory }, index) => {
      if (index < 5) {
        expect(queryByTestId(`${strCategory}-category-filter`)).toBeInTheDocument();
      }
    });
  });
  test('if buttons without toggled is working with disable and enable button', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callCategoriesApi(catMock));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { queryByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <DrinkPage />
      </RecipesAppProvider>,
    );

    await wait();

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byDrinkName));
    await testCategoryByName(queryByTestId, 'all');
    expect(global.fetch).toHaveBeenCalledTimes(12);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byDrinkName));
    await testCategoryByName(queryByTestId, 'Ordinary Drink');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byDrinkName));
    await testCategoryByName(queryByTestId, 'Cocktail');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byDrinkName));
    await testCategoryByName(queryByTestId, 'Milk Shake');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk Shake');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byDrinkName));
    await testCategoryByName(queryByTestId, 'Other');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byDrinkName));
    await testCategoryByName(queryByTestId, 'Cocoa');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa');
  });
});
