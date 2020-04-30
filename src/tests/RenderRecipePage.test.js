import React from 'react';
import {
  cleanup, wait,
} from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import renderWithRouter from '../services/renderWithRouter';
import { RecipesAppContext } from '../context/RecipesAppContext';
import RenderRecipePage from '../components/RenderRecipePage';

const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
const [displayHeader, setDisplayHeader] = [false, jest.fn()];
let [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
const [displaySearchButton, setDisplaySearchButton] = [false, jest.fn()];
const [displayFooter, setDisplayFooter] = [true, jest.fn()];
const [isLoading, setIsLoading] = [true, jest.fn()];
const [recipes, setRecipes] = [[], jest.fn()];
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

describe('Complementary testing for RenderRecipesPage', () => {
  test('if displaySearchBar is false and inputs are blank, triggers cleanup', async () => {
    await wait();

    [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
    [inputValue, setInputValue] = [{ radio: 'test', text: 'test', didFetch: false }, jest.fn()];

    store = {
      ...store,
      displaySearchBar: [displaySearchBar, setDisplaySearchBar],
      inputValue: [inputValue, setInputValue],
    };


    renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <RenderRecipePage
          kindOfRecipe="Comidas"
          fetchCategories={jest.fn()}
          renderCategories={jest.fn()}
        />
      </RecipesAppContext.Provider>,
    );

    const { act } = TestRenderer;

    await act(async () => {
      await wait(() => expect(setInputValue).toHaveBeenCalledWith({ text: '', radio: '', didFetch: false }));
      await wait(() => expect(setIsSearching).toHaveBeenCalledWith(false));
      await wait(() => expect(setRecipes).toHaveBeenCalledWith([]));
    });
  }, 20000);

  test('if displaySearchBar is false and inputs are blank, triggers cleanup', async () => {
    await wait();

    [displaySearchBar, setDisplaySearchBar] = [true, jest.fn()];
    [inputValue, setInputValue] = [{ radio: 'test', text: 'test', didFetch: true }, jest.fn()];

    store = {
      ...store,
      displaySearchBar: [displaySearchBar, setDisplaySearchBar],
      inputValue: [inputValue, setInputValue],
    };


    renderWithRouter(
      <RecipesAppContext.Provider value={store}>
        <RenderRecipePage
          kindOfRecipe="Comidas"
          fetchCategories={jest.fn()}
          renderCategories={jest.fn()}
        />
      </RecipesAppContext.Provider>,
    );

    const { act } = TestRenderer;

    await act(async () => {
      await wait(() => expect(setInputValue)
        .toHaveBeenCalledWith(expect.any(Function)));
    });
  }, 20000);
});
