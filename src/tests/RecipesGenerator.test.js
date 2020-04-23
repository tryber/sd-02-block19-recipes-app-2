import React from 'react';
import {
  cleanup, wait, fireEvent,
} from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';
import SearchBar from '../components/SearchBar';
import MealPage from '../pages/MealPage';
import { byName } from '../__mocks__/recipesMock';

const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
const [displayHeader, setDisplayHeader] = [true, jest.fn()];
const [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
const [displaySearchButton, setDisplaySearchButton] = [true, jest.fn()];
const [displayFooter, setDisplayFooter] = [true, jest.fn()];
const [isLoading, setIsLoading] = [true, jest.fn()];
let [recipes, setRecipes] = [[], jest.fn()];
const [recipeType, setRecipeType] = ['Comidas', jest.fn()];
const [inputValue, setInputValue] = [{ radio: '', text: '', didFetch: false }, jest.fn()];
const [isFetching, setIsFetching] = [false, jest.fn()];
let [isSearching, setIsSearching] = [false, jest.fn()];
const [toggleCategory, setToggleCategory] = [{ category: '', toggleCat: false }, jest.fn()];
const [isFiltering, setIsFiltering] = [false, jest.fn()];

const store = {
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
  toggleHeaderAndFooter: jest.fn(),
  filtering: [isFiltering, setIsFiltering],
};

beforeEach(() => jest.resetModules());

afterEach(cleanup);


describe('Complementary testing for RecipesGenerator', () => {
  it('if state array is null, then returns empty array', async () => {
    const recipe = byName;
    const typeQueryString = 'meals';
    const existingRecipes = null;

    setRecipes = jest.fn(() => (
      existingRecipes ? [...existingRecipes, ...recipe[`${typeQueryString}`]] : []
    ));

    renderWithRouter(
      <RecipesAppContext.Provider value={{ ...store, data: [recipes, setRecipes] }}>
        <MealPage />
      </RecipesAppContext.Provider>,
    );


    await wait(() => expect(setRecipes).toHaveBeenCalled());

    expect(setRecipes).toHaveBeenCalledWith([]);
  });

  it('if isSearching is false, setRecipes is called with empty array', async () => {
    const spyUseEffect = jest.spyOn(React, 'useEffect');

    const recipe = byName;
    const typeQueryString = 'meals';

    setRecipes = jest.fn(() => {
      const existingRecipes = null;
      return (
        existingRecipes ? [...existingRecipes, ...recipe[`${typeQueryString}`]] : []
      );
    });

    isSearching = false;

    const { getByTestId } = renderWithRouter(
      <RecipesAppContext.Provider
        value={
          { ...store, isSearching: [isSearching, setIsSearching], data: [recipes, setRecipes] }
          }
      >
        <App />
        <MealPage />
        <SearchBar />
      </RecipesAppContext.Provider>,
    );
    fireEvent.change(getByTestId('email-input'), 'mateus@test.com');
    fireEvent.change(getByTestId('password-input'), '45316854');
    fireEvent.click(getByTestId('login-submit-btn'));

    expect(getByTestId('search-input')).toBeInTheDocument();

    fireEvent.change(getByTestId('search-input'), 'beef');
    fireEvent.change(getByTestId('search-input'), '');

    await wait(() => expect(setIsSearching).toHaveBeenCalled());
    await wait(() => expect(spyUseEffect).toHaveBeenCalled());
    expect(setRecipes).toHaveBeenCalledWith([]);
  }, 20000);

  it('if isSearching is TRUE, setRecipes is called with empty array', async () => {
    const spyUseEffect = jest.spyOn(React, 'useEffect');

    const recipe = byName;
    const typeQueryString = 'meals';

    setRecipes = jest.fn(() => {
      const existingRecipes = null;
      return (
        existingRecipes ? [...existingRecipes, ...recipe[`${typeQueryString}`]] : []
      );
    });
    isSearching = true;

    const { getByTestId } = renderWithRouter(
      <RecipesAppContext.Provider
        value={
          { ...store, isSearching: [isSearching, setIsSearching], data: [recipes, setRecipes] }
        }
      >
        <MealPage />
        <SearchBar />
      </RecipesAppContext.Provider>,
    );

    expect(getByTestId('search-input')).toBeInTheDocument();

    fireEvent.change(getByTestId('search-input'), 'beef');

    await wait(() => expect(spyUseEffect).toHaveBeenCalled());
    expect(setRecipes).not.toHaveBeenCalledWith([]);
  }, 20000);

  it('tests if recipes are being added up by fetch function', async () => {
    const { getByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <MealPage />
      </RecipesAppProvider>,
    );

    await wait(() => getByTestId('0-card-category'));
    expect(getByTestId('0-card-category')).toBeInTheDocument();
    await wait(() => getByTestId('11-card-category'));
    expect(getByTestId('1-card-category')).toBeInTheDocument();
    expect(getByTestId('2-card-category')).toBeInTheDocument();
    expect(getByTestId('3-card-category')).toBeInTheDocument();
    expect(getByTestId('4-card-category')).toBeInTheDocument();
    expect(getByTestId('5-card-category')).toBeInTheDocument();
    expect(getByTestId('6-card-category')).toBeInTheDocument();
    expect(getByTestId('7-card-category')).toBeInTheDocument();
    expect(getByTestId('8-card-category')).toBeInTheDocument();
    expect(getByTestId('9-card-category')).toBeInTheDocument();
    expect(getByTestId('10-card-category')).toBeInTheDocument();
    expect(getByTestId('11-card-category')).toBeInTheDocument();
  });
});
