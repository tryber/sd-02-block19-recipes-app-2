import React from 'react';
import {
  cleanup, wait, fireEvent,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import MealPage from '../pages/MealPage';
import { byName } from '../__mocks__/recipesMock';

const callCategoriesApi = ({ meals }) => {
  const mockSuccessResponse = {
    meals,
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    status: 200,
    ok: true,
    json: () => mockJsonPromise,
  });
  return mockFetchPromise;
};

const callRandomMealApi = ({ meals }) => {
  const mockSuccessResponse = {
    meals,
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
  meals: [
    {
      strCategory: 'COCO',
    },
    {
      strCategory: 'Breakfast',
    },
    {
      strCategory: 'Chicken',
    },
    {
      strCategory: 'Dessert',
    },
    {
      strCategory: 'Goat',
    },
  ],
};

const testCategoryByName = async (queryByTestId, category) => {
  fireEvent.click(queryByTestId(`${category}-category-filter`));
  await wait();
  catMock.meals.forEach(({ strCategory }) => {
    if (strCategory === category) {
      expect(queryByTestId(`${strCategory}-category-filter`).disabled).toBeFalsy();
    } else {
      expect(queryByTestId(`${strCategory}-category-filter`).disabled).toBeTruthy();
    }
  });
  fireEvent.click(queryByTestId(`${category}-category-filter`));
  catMock.meals.forEach(({ strCategory }) => {
    expect(queryByTestId(`${strCategory}-category-filter`).disabled).toBeFalsy();
  });
};

afterEach(cleanup);

describe('Meal Page tests', () => {
  test('if component rendering', () => {
    const { queryByText, history } = renderWithRouter(
      <RecipesAppProvider>
        <MealPage />
      </RecipesAppProvider>,
      {
        route: '/comidas',
      },
    );
    expect(queryByText(/Loading/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/comidas');
  });
  test('if inputsCategory is rendering', async () => {
    await wait();
    jest.spyOn(global, 'fetch').mockImplementation(() => callCategoriesApi(catMock));

    const { queryByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <MealPage />
      </RecipesAppProvider>,
    );

    await wait(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

    expect(queryByTestId(/all-category-filter/i)).toBeInTheDocument();
    catMock.meals.forEach(({ strCategory }, index) => {
      if (index < 5) {
        expect(queryByTestId(`${strCategory}-category-filter`)).toBeInTheDocument();
      }
    });
  });
  test('if buttons without toggled is working with disable and enable button', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callCategoriesApi(catMock));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { queryByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <MealPage />
      </RecipesAppProvider>,
    );

    await wait();

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byName));
    await testCategoryByName(queryByTestId, 'all');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byName));
    await testCategoryByName(queryByTestId, 'COCO');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=COCO');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byName));
    await testCategoryByName(queryByTestId, 'Breakfast');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byName));
    await testCategoryByName(queryByTestId, 'Chicken');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byName));
    await testCategoryByName(queryByTestId, 'Dessert');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');

    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callRandomMealApi(byName));
    await testCategoryByName(queryByTestId, 'Goat');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat');
  });
});
