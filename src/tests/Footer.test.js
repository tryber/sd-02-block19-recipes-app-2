import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';

const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
const [displayHeader, setDisplayHeader] = [false, jest.fn()];
const [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
const [displaySearchButton, setDisplaySearchButton] = [false, jest.fn()];
let [displayFooter, setDisplayFooter] = [true, jest.fn()];
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

describe('Tests for Footer component', () => {
  it('Component is rendered if displayFooter is true and dont if its false', async () => {
    const { getByTestId } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });

  it('If displayFooter is false, it doesnt get displayed', () => {
    [displayFooter, setDisplayFooter] = [false, jest.fn()];
    store = { ...store, displayFooter: [displayFooter, setDisplayFooter] };

    const { queryByTestId } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    expect(queryByTestId('drinks-bottom-btn')).not.toBeInTheDocument();
    expect(queryByTestId('explore-bottom-btn')).not.toBeInTheDocument();
    expect(queryByTestId('food-bottom-btn')).not.toBeInTheDocument();
  });

  it('In clicking Explore button, user is taken to Explore page', () => {
    [displayFooter, setDisplayFooter] = [true, jest.fn()];
    store = { ...store, displayFooter: [displayFooter, setDisplayFooter] };

    const { getByTestId } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    const exploreButton = getByTestId('explore-bottom-btn');
    expect(exploreButton).toBeInTheDocument();

    fireEvent.click(exploreButton);

    expect(getByTestId('explore-food')).toBeInTheDocument();
  });

  it('In clicking Cocktails button, user is taken to Cocktail page', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    const cocktailButton = getByTestId('drinks-bottom-btn');
    expect(cocktailButton).toBeInTheDocument();

    fireEvent.click(cocktailButton);

    expect(getByText(/Loading.../gi)).toBeInTheDocument();
  });

  it('In clicking Meals button, user is taken to Meals page', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    const mealsButton = getByTestId('food-bottom-btn');
    expect(mealsButton).toBeInTheDocument();

    fireEvent.click(mealsButton);

    expect(getByText(/Loading.../gi)).toBeInTheDocument();
  });
});
