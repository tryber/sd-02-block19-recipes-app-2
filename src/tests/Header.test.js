import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';

let [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
let [displayHeader, setDisplayHeader] = [false, jest.fn()];
const [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
let [displaySearchButton, setDisplaySearchButton] = [false, jest.fn()];
const [displayFooter, setDisplayFooter] = [true, jest.fn()];
const [isLoading, setIsLoading] = [true, jest.fn()];
const [recipes, setRecipes] = [[], jest.fn()];
const [recipeType, setRecipeType] = ['Comidas', jest.fn()];
const [inputValue, setInputValue] = [{ radio: '', text: '', didFetch: false }, jest.fn()];
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

describe('Tests for Header component', () => {
  it('Component is rendered if displayHeader is true and dont if its false', async () => {
    [displayHeader, setDisplayHeader] = [true, jest.fn()];
    [displaySearchButton, setDisplaySearchButton] = [true, jest.fn()];

    store = {
      ...store,
      displayHeader: [displayHeader, setDisplayHeader],
      displaySearchButton: [displaySearchButton, setDisplaySearchButton],
    };
    const { getByTestId } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
  });

  it('If displayHeader is false, it doesnt get displayed', () => {
    [displayHeader, setDisplayHeader] = [false, jest.fn()];
    store = {
      ...store,
      displayHeader: [displayHeader, setDisplayHeader],
    };

    const { queryByTestId } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    expect(queryByTestId('profile-top-btn')).not.toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(queryByTestId('page-title')).not.toBeInTheDocument();
  });

  it('In clicking profile button, user is taken to profile page', () => {
    [displayHeader, setDisplayHeader] = [true, jest.fn()];
    store = { ...store, displayHeader: [displayHeader, setDisplayHeader] };

    const { getByTestId, getByText } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();

    fireEvent.click(profileButton);

    expect(getByText('Sair')).toBeInTheDocument();
  });

  it('displaySearchButton state is false, its not displayed', () => {
    [displaySearchButton, setDisplaySearchButton] = [false, jest.fn()];

    store = {
      ...store,
      displaySearchButton: [displaySearchButton, setDisplaySearchButton],
    };

    const { queryByTestId } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    const searchButton = queryByTestId('search-top-btn');
    expect(searchButton).not.toBeInTheDocument();
  });

  it('By clicking Search icon, SearchBar is displayed', async () => {
    [displaySearchButton, setDisplaySearchButton] = [true, jest.fn()];

    store = {
      ...store,
      displaySearchButton: [displaySearchButton, setDisplaySearchButton],
    };

    const { queryByTestId } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    fireEvent.click(queryByTestId('search-top-btn'));
    await wait();
    expect(queryByTestId('search-input'));
  });

  it('Header title displays headerTitle Context state content', () => {
    [headerTitle, setHeaderTitle] = ['Receitas teste', jest.fn()];
    store = {
      ...store,
      headerTitle: [headerTitle, setHeaderTitle],
    };

    const { queryByTestId } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    const pageTitle = queryByTestId('page-title');
    expect(pageTitle.innerHTML).toBe('Receitas teste');
  });
});
