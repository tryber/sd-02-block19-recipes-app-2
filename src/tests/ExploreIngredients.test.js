import React from 'react';
import {
  cleanup, wait, fireEvent,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import ExploreIngredients from '../components/ExploreIngredients';
import { mealIngredients, drinkIngredients } from '../__mocks__/ingredientsMock';

const callMealIngredientsApi = ({ meals }) => {
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

const callDrinkIngredientsApi = ({ drinks }) => {
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


afterEach(cleanup);

describe('Explore ingredients tests', () => {
  describe('Explore ingredients by Meal', () => {
    test('if rendering', async () => {
      const { queryByText, history } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreIngredients type="Comidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/comidas/ingredients',
        },
      );
      expect(queryByText(/Loading.../i)).toBeInTheDocument();
      await wait(() => expect(queryByText(/Loading.../i)).toBeNull());
      expect(history.location.pathname).toBe('/explorar/comidas/ingredients');
    });
    test('if rendering meal ingredients', async () => {
      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callMealIngredientsApi(mealIngredients));
      const { findByTestId, queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreIngredients type="Comidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/comidas/ingredients',
        },
      );

      await (findByTestId(/Avocado-card-img/i));

      expect(global.fetch).toHaveBeenCalledTimes(1);

      mealIngredients.meals.slice(0, mealIngredients.meals[0].length / 2)
        .forEach(({ strIngredient }) => {
          expect(queryByTestId(`${strIngredient}-card-img`)).toBeInTheDocument();
          expect(queryByTestId(`${strIngredient}-card-img`).tagName).toBe('IMG');
          expect(queryByTestId(`${strIngredient}-card-name`)).toBeInTheDocument();
          expect(queryByTestId(`${strIngredient}-card-name`).tagName).toBe('DIV');
        });
    });
    test('when click at any ingredient', async () => {
      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callMealIngredientsApi(mealIngredients));
      const { findByTestId, queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreIngredients type="Comidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/comidas/ingredients',
        },
      );

      await (findByTestId(/Avocado-card-img/i));

      expect(global.fetch).toHaveBeenCalledTimes(1);

      fireEvent.click(queryByTestId(/Avocado-card-img/i));
      await wait(() => expect(history.location.pathname).toBe('/comidas'));
    });
  });
  describe('Explore ingredients by Drinks', () => {
    test('if rendering', async () => {
      const { queryByText, history } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreIngredients type="Bebidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/bebidas/ingredientes',
        },
      );
      expect(queryByText(/Loading.../i)).toBeInTheDocument();
      await wait(() => expect(queryByText(/Loading.../i)).toBeNull());
      expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
    });
    test('if rendering drink ingredients', async () => {
      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callDrinkIngredientsApi(drinkIngredients));
      const { findByTestId, queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreIngredients type="Bebidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/bebidas/ingredientes',
        },
      );

      await (findByTestId(/Gin-card-img/i));

      expect(global.fetch).toHaveBeenCalledTimes(1);

      drinkIngredients.drinks.slice(0, mealIngredients.meals[0].length / 2)
        .forEach(({ strIngredient }) => {
          expect(queryByTestId(`${strIngredient}-card-img`)).toBeInTheDocument();
          expect(queryByTestId(`${strIngredient}-card-img`).tagName).toBe('IMG');
          expect(queryByTestId(`${strIngredient}-card-name`)).toBeInTheDocument();
          expect(queryByTestId(`${strIngredient}-card-name`).tagName).toBe('DIV');
        });
    });
    test('when click at any ingredient', async () => {
      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callDrinkIngredientsApi(drinkIngredients));
      const { findByTestId, queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreIngredients type="Bebidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/bebidas/ingredientes',
        },
      );

      await (findByTestId(/Gin-card-img/i));

      expect(global.fetch).toHaveBeenCalledTimes(1);

      fireEvent.click(queryByTestId(/Gin-card-img/i));
      await wait(() => expect(history.location.pathname).toBe('/bebidas'));
    });
  });
});
