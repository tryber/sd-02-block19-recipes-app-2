import React from 'react';
import {
  cleanup,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import InProgressDrink from '../pages/InProgressDrink';
import { detailDrink } from '../__mocks__/recipeDetailsMock';

const callOneDrinkFood = ({ drinks }) => {
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

const allIngredients = (drinks) => {
  const ingredients = Object.entries(drinks[0])
    .filter((el) => el[0].match(/strIngredient/i));
  const measures = Object.entries(drinks[0])
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

describe('InProgressDrink tests', () => {
  test('test if rendering and loading is in the document', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callOneDrinkFood(detailDrink));
    const { queryByText, history, findByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <InProgressDrink match={id} />
      </RecipesAppProvider>,
      { route: '/receitas/bebida/52855/in-progress' },
    );

    expect(history.location.pathname).toBe('/receitas/bebida/52855/in-progress');
    expect(queryByText(/Loading.../i)).toBeInTheDocument();
    await findByTestId(/recipe-photo/i);
  });
  test('test if all infos is in the document', async () => {
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callOneDrinkFood(detailDrink));
    const { queryByTestId, findByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <InProgressDrink match={id} />
      </RecipesAppProvider>,
      { route: '/receitas/bebida/52855/in-progress' },
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const ingredients = allIngredients(detailDrink.drinks);
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
