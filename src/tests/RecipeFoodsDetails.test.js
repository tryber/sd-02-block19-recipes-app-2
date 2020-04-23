import React from 'react';
import {
  cleanup, wait,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import RecipeFoodsDetails from '../components/RecipeFoodsDetails';
import {
  detailMeal, detailDrink,
} from '../__mocks__/recipeDetailsMock';

const callApi = ({ meals }) => {
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

const callDrinkApi = ({ drinks }) => {
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

const allIngredients = ({ meals }) => {
  const ingredients = Object.entries(meals[0])
    .filter((el) => el[0].match(/strIngredient/i));
  const measures = Object.entries(meals[0])
    .filter((el) => el[0].match(/strMeasure/i));
  return ingredients.reduce((acc, cur, index) => {
    if (cur[1]) {
      return [...acc, [cur[1], measures[index][1]]];
    }
    return [...acc];
  }, []);
};

afterEach(cleanup);

describe('Recipe Meal Details', () => {
  test('if components rendering', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(detailMeal));
    const { queryByText, history } = renderWithRouter(
      <RecipesAppProvider>
        <RecipeFoodsDetails id="52855" typeFood="Meal" />
      </RecipesAppProvider>,
      { route: '/receitas/comida/52855' },
    );

    expect(queryByText(/Loading/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/receitas/comida/52855');

    await wait();

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52855');
  });
  test('if components rendering all details', async () => {
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => callApi(detailMeal))
      .mockImplementation(() => callDrinkApi(detailDrink));

    const { queryByTestId, history, findByText } = renderWithRouter(
      <RecipesAppProvider>
        <RecipeFoodsDetails id="52855" typeFood="Meal" />
      </RecipesAppProvider>,
      { route: '/receitas/comida/52855' },
    );

    await findByText(/Loading.../i);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52855');
    expect(history.location.pathname).toBe('/receitas/comida/52855');
    await wait(() => expect(global.fetch).toHaveBeenCalledTimes(7));
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');


    expect(queryByTestId(/recipe-photo/i)).toBeInTheDocument();
    expect(queryByTestId(/recipe-title/i)).toBeInTheDocument();
    allIngredients(detailMeal).forEach((element, index) => {
      expect(queryByTestId(`${index}-ingredient-name`)).toBeInTheDocument();
      expect(queryByTestId(`${index}-ingredient-name`).innerHTML).toMatch(element[0]);
      expect(queryByTestId(`${index}-ingredient-measure`)).toBeInTheDocument();
      expect(queryByTestId(`${index}-ingredient-measure`).innerHTML).toMatch(element[1]);
    });
    expect(queryByTestId(/instructions/i)).toBeInTheDocument();
    expect(queryByTestId(/video/i)).toBeInTheDocument();
    expect(queryByTestId(/start-recipe-btn/i)).toBeInTheDocument();
  });
});

describe('Recipe Drink Details', () => {
  test('if components rendering', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(detailDrink));
    const { queryByText, history } = renderWithRouter(
      <RecipesAppProvider>
        <RecipeFoodsDetails id="52855" typeFood="Drink" />
      </RecipesAppProvider>,
      { route: '/receitas/bebida/52855' },
    );

    expect(queryByText(/Loading/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/receitas/bebida/52855');

    await wait();

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=52855');
  });
  test('if components rendering all details', async () => {
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => callDrinkApi(detailDrink))
      .mockImplementation(() => callApi(detailMeal));

    const { queryByTestId, history, findByText } = renderWithRouter(
      <RecipesAppProvider>
        <RecipeFoodsDetails id="52855" typeFood="Drink" />
      </RecipesAppProvider>,
      { route: '/receitas/bebida/52855' },
    );

    await findByText(/Loading.../i);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=52855');
    expect(history.location.pathname).toBe('/receitas/bebida/52855');
    await wait(() => expect(global.fetch).toHaveBeenCalledTimes(7));
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');


    expect(queryByTestId(/recipe-photo/i)).toBeInTheDocument();
    expect(queryByTestId(/recipe-title/i)).toBeInTheDocument();
    allIngredients(detailMeal).forEach((element, index) => {
      expect(queryByTestId(`${index}-ingredient-name`)).toBeInTheDocument();
      expect(queryByTestId(`${index}-ingredient-name`).innerHTML).toMatch(element[0]);
      expect(queryByTestId(`${index}-ingredient-measure`)).toBeInTheDocument();
      expect(queryByTestId(`${index}-ingredient-measure`).innerHTML).toMatch(element[1]);
    });
    expect(queryByTestId(/instructions/i)).toBeInTheDocument();
    expect(queryByTestId(/video/i)).toBeInTheDocument();
    expect(queryByTestId(/start-recipe-btn/i)).toBeInTheDocument();
  });
});
