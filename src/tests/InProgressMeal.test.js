import React from 'react';
import {
  cleanup,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import InProgressMeal from '../pages/InProgressMeal';
import { detailMeal } from '../__mocks__/recipeDetailsMock';

const callOneMealFood = ({ meals }) => {
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

const allIngredients = (meals) => {
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

const id = { params: { id: '52855' } };

afterEach(cleanup);

describe('InProgressMeal tests', () => {
  test('test if rendering and loading is in the document', async () => {
    const { queryByText, history, findByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <InProgressMeal match={id} />
      </RecipesAppProvider>,
      { route: '/receitas/comida/52855/in-progress' },
    );

    expect(history.location.pathname).toBe('/receitas/comida/52855/in-progress');
    expect(queryByText(/Loading.../i)).toBeInTheDocument();
    await findByTestId(/recipe-photo/i);
  });
  test('test if all infos is in the document', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callOneMealFood(detailMeal));
    const { queryByTestId, findByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <InProgressMeal match={id} />
      </RecipesAppProvider>,
      { route: '/receitas/comida/52855/in-progress' },
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const ingredients = allIngredients(detailMeal.meals);
    await findByTestId(`- ${ingredients[0][0]} - ${ingredients[0][1]} - ingredients`);
    expect(queryByTestId(/recipe-title/i)).toBeInTheDocument();
    ingredients.forEach((el, index) => {
      if (index !== 4) {
        expect(queryByTestId(`- ${el[0]} - ${el[1]} - ingredients`)).toBeInTheDocument();
        expect(queryByTestId(`- ${el[0]} - ${el[1]} - ingredients`).type).toBe('checkbox');
      } else {
        expect(queryByTestId('- Oil - 1 tsp - ingredients')).toBeInTheDocument();
        expect(queryByTestId('- Oil - 1 tsp - ingredients').type).toBe('checkbox');
      }
    });
    expect(queryByTestId(/instructions/i)).toBeInTheDocument();
    expect(queryByTestId(/start-recipe-btn/i)).toBeInTheDocument();
  });
});
