import React, { useContext } from 'react';
import {
  cleanup, wait, fireEvent,
} from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import renderWithRouter from '../services/renderWithRouter';
import RecipeAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';
import RecipesGenerator from '../components/RecipesGenerator';

const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
let [displayHeader, setDisplayHeader] = [false, jest.fn()];
const [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
let [displaySearchButton, setDisplaySearchButton] = [false, jest.fn()];
const [displayFooter, setDisplayFooter] = [true, jest.fn()];
const [isLoading, setIsLoading] = [true, jest.fn()];
const [recipes, setRecipes] = [[], jest.fn()];
let [recipeType, setRecipeType] = ['Comidas', jest.fn()];
const [inputValue, setInputValue] = [{ radio: '', text: '', didFetch: false }, jest.fn()];
const [isFetching, setIsFetching] = [false, jest.fn()];
const [isSearching, setIsSearching] = [false, jest.fn()];
const [toggleCategory, setToggleCategory] = [{ category: '', toggleCat: false }, jest.fn()];
const [isFiltering, setIsFiltering] = [false, jest.fn()];
let [isExploring, setIsExploring] = [false, jest.fn()];
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

describe('Complementary testing for RecipesGenerator', () => {
  test('if inputsCategory is rendering', async () => {
    await wait();

    const { queryByTestId, getByTestId } = renderWithRouter(
      <RecipeAppProvider>
        <App />
      </RecipeAppProvider>,
    );

    const { act } = TestRenderer;

    const wrapper = ({ children }) => <RecipeAppProvider>{children}</RecipeAppProvider>;
    const { result } = renderHook(() => useContext(RecipesAppContext), { wrapper });

    await act(async () => {
      result.current.displaySearchBar[1]();
      fireEvent.change(queryByTestId(/email-input/i), { target: { value: 'test@test.com' } });
      fireEvent.change(queryByTestId(/password-input/i), { target: { value: 'ChickenBreast' } });
      fireEvent.click(queryByTestId(/login-submit-btn/i));
      await wait(() => getByTestId(/search-top-btn/i));

      fireEvent.click(queryByTestId(/search-top-btn/i));

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'fasdasfas' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('fasdasfas');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');
    });
  }, 20000);

  test('if getRandomRecipe fails, it triggers cleanup', async () => {
    await wait();

    [displayHeader, setDisplayHeader] = [true, jest.fn()];
    [displaySearchButton, setDisplaySearchButton] = [true, jest.fn()];
    [recipeType, setRecipeType] = ['non-existant', jest.fn()];

    store = {
      ...store,
      displayHeader: [displayHeader, setDisplayHeader],
      displaySearchButton: [displaySearchButton, setDisplaySearchButton],
      recipeType: [recipeType, setRecipeType],
    };

    const fetchMock = jest.spyOn(global, 'fetch');

    renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <RecipesGenerator />
      </RecipesAppContext.Provider>,
    );


    const { act } = TestRenderer;

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      await wait(() => expect(fetchMock).toHaveBeenCalledWith('https://www.thefalsedb.com/api/json/v1/1/random.php'));
      await wait(() => expect(setRecipes).toHaveBeenLastCalledWith([]));
      await wait(() => expect(window.alert).toHaveBeenCalled());
      expect(window.alert).toHaveBeenLastCalledWith('Ocorreu um erro em sua busca.');
    });
  }, 20000);

  test('button is clicked setIsExplore is set to false', async () => {
    await wait();

    [isExploring, setIsExploring] = [true, jest.fn()];

    store = {
      ...store,
      isExploring: [isExploring, setIsExploring],
    };

    const { getByText } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <RecipesGenerator />
      </RecipesAppContext.Provider>,
    );

    const { act } = TestRenderer;

    await act(async () => {
      fireEvent.click(getByText('Sair da exploração'));
      await wait(() => expect(setIsExploring).toHaveBeenCalledWith(false));
    });

    [isExploring, setIsExploring] = [false, jest.fn()];
  }, 20000);
});
