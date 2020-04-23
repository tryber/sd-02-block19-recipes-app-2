import React from 'react';
import {
  cleanup, fireEvent, wait,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import RecipeMealDetails from '../pages/RecipeMealDetails';
import {
  detailMeal,
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

const id = { params: { id: 52855 } };

afterEach(cleanup);

describe('Recipe Meal Detail', () => {
  test('if components rendering', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(detailMeal));
    const { queryByTestId, queryByText, history } = renderWithRouter(
      <RecipesAppProvider>
        <RecipeMealDetails match={id} />
      </RecipesAppProvider>,
      { route: '/receitas/comida/52855' },
    );

    expect(queryByText(/Loading/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/receitas/comida/52855');

    await wait();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52855');
  });
  test('if component rendering meal details', async () => {
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(detailMeal));
    const { queryByTestId, queryByText } = renderWithRouter(
      <RecipesAppProvider>
        <RecipeMealDetails match={id} />
      </RecipesAppProvider>,
      { route: '/receitas/comida/52855' },
    );

    expect(queryByText(/Loading/i)).toBeInTheDocument();

    await wait();

    const { meals } = detailMeal;

    let indexMeasure = 0;
    const allIngredients = Object.entries(meals[0]).reduce((acc, cur) => {
      if (cur[0].match(/strIngredient/i) && cur[1] !== '') {
        return [...acc, cur[1]];
      }
      if (cur[0].match(/strMeasure/i) && cur[1] !== '') {
        acc[indexMeasure] = [acc[indexMeasure], cur[1]];
        indexMeasure += 1;
        return [...acc];
      }
      return [...acc];
    }, []);

    expect(queryByTestId(/recipe-photo/i)).toBeInTheDocument();
    expect(queryByTestId(/recipe-photo/i).tagName).toBe('IMG');
    expect(queryByTestId(/recipe-photo/i).src).toBe(detailMeal.meals[0].strMealThumb);


    expect(queryByTestId(/recipe-title/i)).toBeInTheDocument();
    expect(queryByTestId(/recipe-title/i).tagName).toBe('H2');
    expect(queryByTestId(/recipe-title/i).innerHTML).toBe(detailMeal.meals[0].strMeal);


    expect(queryByTestId(/instructions/i)).toBeInTheDocument();
    expect(queryByTestId(/instructions/i).tagName).toBe('P');
    expect(queryByTestId(/instructions/i).innerHTML).toBe(detailMeal.meals[0].strInstructions);

    allIngredients.forEach((ingredients, index) => {
      expect(queryByTestId(`${index}-ingredient-name`)).toBeInTheDocument();
      expect(queryByTestId(`${index}-ingredient-name`).innerHTML).toBe(`- ${ingredients[0]} - `);
      expect(queryByTestId(`${index}-ingredient-measure`)).toBeInTheDocument();
      expect(queryByTestId(`${index}-ingredient-measure`).innerHTML).toBe(ingredients[1]);
    });

    expect(queryByTestId(/video/i)).toBeInTheDocument();
    expect(queryByTestId(/video/i).tagName).toBe('DIV');

    expect(queryByTestId(/start-recipe-btn/i)).toBeInTheDocument();
    expect(queryByTestId(/start-recipe-btn/i).tagName).toBe('BUTTON');
    expect(queryByTestId(/start-recipe-btn/i).value).toBe('INICIAR RECEITA');
  });
});
