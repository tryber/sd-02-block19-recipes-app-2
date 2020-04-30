import React from 'react';
import {
  cleanup, wait, fireEvent,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import ExploreFoods from '../components/ExploreFoods';
import { detailMeal, detailDrink } from '../__mocks__/recipeDetailsMock';

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

afterEach(cleanup);

describe('Explore foods tests', () => {
  describe('Meals Tests', () => {
    test('if component rendering', () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreFoods type="Comidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/comidas',
        },
      );

      expect(queryByTestId(/explore-by-ingredient/i)).toBeInTheDocument();
      expect(queryByTestId(/explore-by-ingredient/i).tagName).toBe('BUTTON');

      expect(queryByTestId(/explore-by-area/i)).toBeInTheDocument();
      expect(queryByTestId(/explore-by-area/i).tagName).toBe('BUTTON');

      expect(queryByTestId(/explore-surprise/i)).toBeInTheDocument();
      expect(queryByTestId(/explore-surprise/i).tagName).toBe('BUTTON');
    });
    test('if "explore-ingredients" is clicked', () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreFoods type="Comidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/comidas',
        },
      );

      fireEvent.click(queryByTestId(/explore-by-ingredient/i));
      expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
    });
    test('if "explore-area" is clicked', () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreFoods type="Comidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/comidas',
        },
      );
      fireEvent.click(queryByTestId(/explore-by-area/i));
      // expect(history.location.pathname).toBe();
    });
    test('if "explore-surprise" is clicked', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreFoods type="Comidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/comidas',
        },
      );
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callOneMealFood(detailMeal));

      fireEvent.click(queryByTestId(/explore-surprise/i));
      await wait(() => (
        expect(history.location.pathname).toBe(`/receitas/comida/${detailMeal.meals[0].idMeal}`)
      ));
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
  describe('Drinks Tests', () => {
    test('if component rendering', () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreFoods type="Bebidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/bebidas',
        },
      );

      expect(queryByTestId(/explore-by-ingredient/i)).toBeInTheDocument();
      expect(queryByTestId(/explore-by-ingredient/i).tagName).toBe('BUTTON');

      expect(queryByTestId(/explore-by-area/i)).toBeInTheDocument();
      expect(queryByTestId(/explore-by-area/i).tagName).toBe('BUTTON');
      expect(queryByTestId(/explore-by-area/i).disabled).toBeTruthy();

      expect(queryByTestId(/explore-surprise/i)).toBeInTheDocument();
      expect(queryByTestId(/explore-surprise/i).tagName).toBe('BUTTON');
    });
    test('if "explore-ingredients" is clicked', () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreFoods type="Bebidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/bebidas',
        },
      );

      fireEvent.click(queryByTestId(/explore-by-ingredient/i));
      expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
    });
    test('if "explore-surprise" is clicked', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <ExploreFoods type="Bebidas" />
        </RecipesAppProvider>,
        {
          route: '/explorar/bebidas',
        },
      );
      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callOneDrinkFood(detailDrink));

      fireEvent.click(queryByTestId(/explore-surprise/i));
      await wait(() => (
        expect(history.location.pathname).toBe(`/receitas/bebida/${detailDrink.drinks[0].idDrink}`)
      ));
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
