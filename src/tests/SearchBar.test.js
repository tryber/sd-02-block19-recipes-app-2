import React from 'react';
import {
  cleanup, fireEvent, wait,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import SearchBar from '../components/SearchBar';
import {
  byName,
  byFirstLetter,
  byIngredients,
  mealNull,
  // byDrinkName,
  // byDrinkIngredients,
  // byDrinkFirstLetter,
  // drinksNull,
} from '../__mocks__/recipesMock';

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

// const callDrinkApi = ({ drinks }) => {
//   const mockSuccessResponse = {
//     drinks,
//   };
//   const mockJsonPromise = Promise.resolve(mockSuccessResponse);
//   const mockFetchPromise = Promise.resolve({
//     status: 200,
//     ok: true,
//     json: () => mockJsonPromise,
//   });
//   return mockFetchPromise;
// };

afterEach(cleanup);

describe('SearchBar tests', () => {
  test('if inputs fields exist', () => {
    const { queryByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <SearchBar />
      </RecipesAppProvider>,
    );

    expect(queryByTestId(/search-input/i)).toBeInTheDocument();
    expect(queryByTestId(/search-input/i).tagName).toBe('INPUT');
    expect(queryByTestId(/search-input/i).type).toBe('text');

    expect(queryByTestId(/ingredient-search-radio/i)).toBeInTheDocument();
    expect(queryByTestId(/ingredient-search-radio/i).tagName).toBe('INPUT');
    expect(queryByTestId(/ingredient-search-radio/i).type).toBe('radio');

    expect(queryByTestId(/name-search-radio/i)).toBeInTheDocument();
    expect(queryByTestId(/name-search-radio/i).tagName).toBe('INPUT');
    expect(queryByTestId(/name-search-radio/i).type).toBe('radio');

    expect(queryByTestId(/first-letter-search-radio/i)).toBeInTheDocument();
    expect(queryByTestId(/first-letter-search-radio/i).tagName).toBe('INPUT');
    expect(queryByTestId(/first-letter-search-radio/i).type).toBe('radio');
  });

  describe('tests with meals', () => {
    test('if search with Chicken Breast and radio ingrediente working and change route to /comidas', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar />
        </RecipesAppProvider>,
      );

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Chicken Breast' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Chicken Breast');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

      jest.spyOn(global, 'fetch').mockImplementation(() => callApi(byIngredients));

      await wait(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
      expect(history.location.pathname).toBe('/comidas');
    });
    test('if search with Orange and radio name working and change route to /receita/comidas/:id-da-receita', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar />
        </RecipesAppProvider>,
      );

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Orange' } });
      fireEvent.click(queryByTestId(/name-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Orange');
      expect(queryByTestId(/name-search-radio/i).value).toBe('name');

      jest.spyOn(global, 'fetch').mockImplementation(() => callApi(byName));

      await wait(() => expect(global.fetch).toHaveBeenCalledTimes(2));
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Orange');
      expect(history.location.pathname).toBe('/receita/comidas/52970');
    });

    test('if search with "a" and radio first letter working and change route to /comidas', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar />
        </RecipesAppProvider>,
      );

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'a' } });
      fireEvent.click(queryByTestId(/first-letter-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('a');
      expect(queryByTestId(/first-letter-search-radio/i).value).toBe('first-letter');

      jest.spyOn(global, 'fetch').mockImplementation(() => callApi(byFirstLetter));

      await wait(() => expect(global.fetch).toHaveBeenCalledTimes(3));
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
      expect(history.location.pathname).toBe('/comidas');
    });
    test('if search with Cake and radio ingredients working and change route to /receita/comidas/:id-da-receita', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar />
        </RecipesAppProvider>,
      );

      window.alert = jest.fn().mockImplementation(() => true);

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Cake' } });
      fireEvent.click(queryByTestId(/name-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Cake');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

      jest.spyOn(global, 'fetch').mockImplementation(() => callApi(mealNull));

      await wait(() => expect(global.fetch).toHaveBeenCalledTimes(4));
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('Não foi encontrado nenhum resultado de comida');
    });
  });
  describe('tests with drinks', () => {
    test('if search with Chicken Breast and radio ingrediente working and change route to /comidas', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar />
        </RecipesAppProvider>,
      );

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Chicken Breast' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Chicken Breast');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

      // jest.spyOn(global, 'fetch').mockImplementation(() => callDrinkApi(byDrinkIngredients));

      // await wait(() => expect(global.fetch).toHaveBeenCalledTimes(5));
      // expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=chicken_breast');
      // expect(history.location.pathname).toBe('/bebidas');
    });
  });
});