import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';

let [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
let [displayHeader, setDisplayHeader] = [false, jest.fn()];
let [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
let [displaySearchButton, setDisplaySearchButton] = [false, jest.fn()];
let [displayFooter, setDisplayFooter] = [true, jest.fn()];
let [isLoading, setIsLoading] = [true, jest.fn()];
let [recipes, setRecipes] = [[], jest.fn()];
let [recipeType, setRecipeType] = ['Comidas', jest.fn()];
let [inputValue, setInputValue] = [{ radio: '', text: '', didFetch: false }, jest.fn()];
let [isFetching, setIsFetching] = [false, jest.fn()];
let [isSearching, setIsSearching] = [false, jest.fn()];
let [toggleCategory, setToggleCategory] = [{ category: '', toggleCat: false }, jest.fn()];
let [isFiltering, setIsFiltering] = [false, jest.fn()];

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
  toggleHeaderAndFooter: jest.fn(),
  filtering: [isFiltering, setIsFiltering],
};

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

    const { getByTestId, getByText } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    const exploreButton = getByTestId('explore-bottom-btn');
    expect(exploreButton).toBeInTheDocument();

    fireEvent.click(exploreButton);

    expect(getByText(/explorar comidas/gi)).toBeInTheDocument();
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
