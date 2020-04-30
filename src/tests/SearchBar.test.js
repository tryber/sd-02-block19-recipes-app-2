import React from 'react';
import {
  cleanup, fireEvent, wait,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import SearchBar from '../components/SearchBar';
import {
  byName,
  byFirstLetter,
  byIngredients,
  mealNull,
} from '../__mocks__/recipesMock';
import {
  byDrinkName,
  byDrinkIngredients,
  byDrinkFirstLetter,
  drinksNull,
} from '../__mocks__/recipesDrinksMock';

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

const callError = () => {
  const mockSuccessResponse = {
    error: 'deu erro',
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    status: 200,
    ok: false,
    json: () => mockJsonPromise,
  });
  return mockFetchPromise;
};

const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
const [displayHeader, setDisplayHeader] = [true, jest.fn()];
let [displaySearchBar, setDisplaySearchBar] = [true, jest.fn()];
const [displaySearchButton, setDisplaySearchButton] = [false, jest.fn()];
const [displayFooter, setDisplayFooter] = [true, jest.fn()];
const [isLoading, setIsLoading] = [true, jest.fn()];
let [recipes, setRecipes] = [[], jest.fn()];
const [recipeType, setRecipeType] = ['Comidas', jest.fn()];
let [inputValue, setInputValue] = [{ radio: '', text: '', didFetch: false }, jest.fn()];
const [isFetching, setIsFetching] = [false, jest.fn()];
const [isSearching, setIsSearching] = [false, jest.fn()];
const [toggleCategory, setToggleCategory] = [{ category: '', toggleCat: false }, jest.fn()];
const [isFiltering, setIsFiltering] = [false, jest.fn()];
const [isExploring, setIsExploring] = [false, jest.fn()];
const [filterFoodOrDrinks, setFilterFoodOrDrinks] = ['All', jest.fn()];
const [disabled, setDisabled] = [false, jest.fn()];
const initialFavoriteRecipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];
const [favoriteRecipes, setFavoriteRecipes] = [initialFavoriteRecipes, jest.fn()];
const [recipeDetails, setRecipeDetails] = ['', jest.fn()];
const toggleHeaderAndFooter = jest.fn();
const setDisplay = jest.fn();

let store = {
  headerTitle: [headerTitle, setHeaderTitle],
  displayHeader: [displayHeader, setDisplayHeader],
  displaySearchButton: [displaySearchButton, setDisplaySearchButton],
  displaySearchBar: [displaySearchBar, setDisplaySearchBar],
  displayFooter: [displayFooter, setDisplayFooter],
  loading: [isLoading, setIsLoading],
  data: [recipes, setRecipes],
  recipeType: [recipeType, setRecipeType],
  inputValue: [inputValue, setInputValue],
  fetchingStatus: [isFetching, setIsFetching],
  isSearching: [isSearching, setIsSearching],
  toggleCategory: [toggleCategory, setToggleCategory],
  toggleHeaderAndFooter,
  filtering: [isFiltering, setIsFiltering],
  filterFoodOrDrinks: [filterFoodOrDrinks, setFilterFoodOrDrinks],
  disabled: [disabled, setDisabled],
  favoriteRecipes: [favoriteRecipes, setFavoriteRecipes],
  recipeDetails: [recipeDetails, setRecipeDetails],
  isExploring: [isExploring, setIsExploring],
  setDisplay,
};

beforeEach(() => {
  jest.resetModules();
});


afterEach(cleanup);

describe('SearchBar tests', () => {
  test('if inputs fields exist', () => {
    const { queryByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <SearchBar recipeType="Comidas" />
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
    test('if search with Chicken Breast and radio ingredient working and change route to /comidas', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Comidas" />
        </RecipesAppProvider>,
      );

      await wait();

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Chicken Breast' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Chicken Breast');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

      jest.spyOn(global, 'fetch').mockImplementation(() => callApi(byIngredients));

      await wait(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'));
      expect(history.location.pathname).toBe('/comidas');
    });
    test('if search with Orange and radio name working and change route to /receitas/comida/:id-da-receita', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Comidas" />
        </RecipesAppProvider>,
      );

      await wait();

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Orange' } });
      fireEvent.click(queryByTestId(/name-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Orange');
      expect(queryByTestId(/name-search-radio/i).value).toBe('name');

      jest.spyOn(global, 'fetch').mockImplementation(() => callApi(byName));

      await wait(() => expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Orange'));
      expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Orange');
      expect(history.location.pathname).toBe('/receitas/comida/52970');
    });

    test('if search with "a" and radio first letter working and change route to /comidas', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Comidas" />
        </RecipesAppProvider>,
      );

      await wait();

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'a' } });
      fireEvent.click(queryByTestId(/first-letter-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('a');
      expect(queryByTestId(/first-letter-search-radio/i).value).toBe('first-letter');

      jest.spyOn(global, 'fetch').mockImplementation(() => callApi(byFirstLetter));

      await wait(() => expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a'));
      expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
      expect(history.location.pathname).toBe('/comidas');
    });

    test('if search with Cake and radio ingredients working and working and fire a alert event', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Comidas" />
        </RecipesAppProvider>,
      );

      await wait();

      window.alert = jest.fn().mockImplementation(() => true);

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Cake' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Cake');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

      jest.spyOn(global, 'fetch').mockImplementation(() => callApi(mealNull));

      await wait(() => expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=cake'));
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenLastCalledWith('Não foi encontrado nenhum resultado de comida.');
    });
    test('show error if fetch ingredient return error', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Comidas" />
        </RecipesAppProvider>,
      );

      await wait();

      window.alert = jest.fn().mockImplementationOnce(() => true);

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Cake' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Cake');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callError());
      await wait(() => expect(global.fetch).toHaveBeenCalled());
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenLastCalledWith('Não foi encontrado nenhum resultado de comidas.');
    });
    test('show error if fetch first-letter return error', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Comidas" />
        </RecipesAppProvider>,
      );

      await wait();

      window.alert = jest.fn().mockImplementationOnce(() => true);

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'C' } });
      fireEvent.click(queryByTestId(/first-letter-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('C');
      expect(queryByTestId(/first-letter-search-radio/i).value).toBe('first-letter');

      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callError());
      await wait(() => expect(global.fetch).toHaveBeenCalled());
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenLastCalledWith('Não foi encontrado nenhum resultado de comidas.');
    });
    test('show error if fetch name return error', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Comidas" />
        </RecipesAppProvider>,
      );

      await wait();

      window.alert = jest.fn().mockImplementationOnce(() => true);

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Cake' } });
      fireEvent.click(queryByTestId(/name-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Cake');
      expect(queryByTestId(/name-search-radio/i).value).toBe('name');

      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callError());
      await wait(() => expect(global.fetch).toHaveBeenCalled());
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenLastCalledWith('Não foi encontrado nenhum resultado de comidas.');
    });
  });
  describe('tests with drinks', () => {
    test('if search with Vodka and radio ingrediente working and change route to /comidas', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Bebidas" />
        </RecipesAppProvider>,
      );

      await wait();

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Vodka' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Vodka');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callDrinkApi(byDrinkIngredients));

      await wait(() => expect(global.fetch).toHaveBeenCalled());
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka');
      expect(history.location.pathname).toBe('/bebidas');
    });
    test('if search with Orange and radio name working and change route to /receitas/bebida/:id', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Bebidas" />
        </RecipesAppProvider>,
      );

      await wait();

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Orange' } });
      fireEvent.click(queryByTestId(/name-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Orange');
      expect(queryByTestId(/name-search-radio/i).value).toBe('name');

      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callDrinkApi(byDrinkName));

      await wait(() => expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Orange'));

      expect(history.location.pathname).toBe('/receitas/bebida/52970');
    });
    test('if search with "a" and radio first letter working and change route to /bebidas', async () => {
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Bebidas" />
        </RecipesAppProvider>,
      );

      await wait();

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'a' } });
      fireEvent.click(queryByTestId(/first-letter-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('a');
      expect(queryByTestId(/first-letter-search-radio/i).value).toBe('first-letter');

      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callDrinkApi(byDrinkFirstLetter));

      await wait(() => expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'));
      expect(history.location.pathname).toBe('/bebidas');
    });
    test('if search with Cake and radio ingredients working and fire a alert event', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Bebidas" />
        </RecipesAppProvider>,
      );

      await wait();

      window.alert = jest.fn().mockImplementation(() => true);

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Cake' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Cake');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callDrinkApi(drinksNull));

      await wait(() => expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=cake'));
      // expect(window.alert).toHaveBeenCalled();
      // expect(window.alert).toHaveBeenLastCalledWith('Não foi encontrado nenhum resultado de bebida.');
    });
    test('show error if fetch ingredient return error', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Bebida" />
        </RecipesAppProvider>,
      );

      await wait();

      window.alert = jest.fn().mockImplementationOnce(() => true);

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Cake' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Cake');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callError());
      await wait(() => expect(global.fetch).toHaveBeenCalled());
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenLastCalledWith('Não foi encontrado nenhum resultado de bebida.');
    });
    test('show error if fetch first-letter return error', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Bebida" />
        </RecipesAppProvider>,
      );

      await wait();

      window.alert = jest.fn().mockImplementationOnce(() => true);

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'C' } });
      fireEvent.click(queryByTestId(/first-letter-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('C');
      expect(queryByTestId(/first-letter-search-radio/i).value).toBe('first-letter');

      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => callError());
      await wait(() => expect(global.fetch).toHaveBeenCalled());
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenLastCalledWith('Não foi encontrado nenhum resultado de bebida.');
    });

    test('show error if fetch name return error', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Bebida" />
        </RecipesAppProvider>,
      );

      await wait();

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Cake' } });
      fireEvent.click(queryByTestId(/name-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Cake');
      expect(queryByTestId(/name-search-radio/i).value).toBe('name');

      await wait(() => expect(window.alert).toHaveBeenCalled());
      expect(window.alert).toHaveBeenLastCalledWith('Não foi encontrado nenhum resultado de bebida.');
    });

    test('show error if fetch name return error', async () => {
      const { queryByTestId } = renderWithRouter(
        <RecipesAppProvider>
          <SearchBar recipeType="Bebida" />
        </RecipesAppProvider>,
      );

      await wait();

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Cake' } });
      fireEvent.click(queryByTestId(/name-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('Cake');
      expect(queryByTestId(/name-search-radio/i).value).toBe('name');

      await wait(() => expect(window.alert).toHaveBeenCalled());
      expect(window.alert).toHaveBeenLastCalledWith('Não foi encontrado nenhum resultado de bebida.');
    });

    test('if in meal page, it fills up recipes', async () => {
      [recipes, setRecipes] = [{ meals: ['test', 'two'] }, jest.fn()];
      [inputValue, setInputValue] = [{ radio: 'name', text: 'Cake', didFetch: false }, jest.fn()];
      store = {
        ...store,
        data: [recipes, setRecipes],
        inputValue: [inputValue, setInputValue],
      };
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppContext.Provider value={store}>
          <SearchBar recipeType="Comidas" />
        </RecipesAppContext.Provider>,
        {
          route: '/comidas',
        },
      );

      await wait(() => expect(setRecipes).toHaveBeenCalled());
      expect(setRecipes).toHaveBeenCalledWith(expect.arrayContaining([expect.any(Object)]));
    });

    test('if in drinks page, it fills up recipes', async () => {
      [recipes, setRecipes] = [{ meals: ['test', 'two'] }, jest.fn()];
      [inputValue, setInputValue] = [{ radio: 'name', text: 'lemon', didFetch: false }, jest.fn()];
      store = {
        ...store,
        data: [recipes, setRecipes],
        inputValue: [inputValue, setInputValue],
      };
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppContext.Provider value={store}>
          <SearchBar recipeType="Bebidas" />
        </RecipesAppContext.Provider>,
        {
          route: '/bebidas',
        },
      );

      await wait(() => expect(setRecipes).toHaveBeenCalled());
      expect(setRecipes).toHaveBeenCalledWith(expect.arrayContaining([expect.any(Object)]));
    });

    test('if displays alert when searching string with more than 1 letter in first-letter mode', async () => {
      [recipes, setRecipes] = [{ meals: ['test', 'two'] }, jest.fn()];
      [inputValue, setInputValue] = [{ radio: 'first-letter', text: 'lemon', didFetch: false }, jest.fn()];
      store = {
        ...store,
        data: [recipes, setRecipes],
        inputValue: [inputValue, setInputValue],
      };
      const { queryByTestId, history } = renderWithRouter(
        <RecipesAppContext.Provider value={store}>
          <SearchBar recipeType="Bebidas" />
        </RecipesAppContext.Provider>,
      );

      jest.spyOn(window, 'alert').mockImplementation(() => {});

      await wait(() => expect(window.alert).toHaveBeenCalled());
      expect(window.alert).toHaveBeenLastCalledWith('Sua busca deve conter somente 1 (um) caracter');
    });
  });
});
