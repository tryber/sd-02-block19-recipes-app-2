import React from 'react';
import {
  cleanup, wait, fireEvent,
} from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';
import SearchBar from '../components/SearchBar';
import RenderRecipePage from '../components/RenderRecipePage';
import Header from '../components/Header';
import { byName } from '../__mocks__/recipesMock';
import { instanceOf } from 'prop-types';

const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
const [displayHeader, setDisplayHeader] = [true, jest.fn()];
const [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
const [displaySearchButton, setDisplaySearchButton] = [true, jest.fn()];
const [displayFooter, setDisplayFooter] = [true, jest.fn()];
const [isLoading, setIsLoading] = [true, jest.fn()];
let [recipes, setRecipes] = [[], jest.fn()];
const [recipeType, setRecipeType] = ['Comidas', jest.fn()];
let [inputValue, setInputValue] = [{ radio: '', text: '', didFetch: false }, jest.fn()];
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


describe('RenderRecipesPage test', () => {
  it('cleanup functions are not called if input conditions are not met', async () => {
    const { getByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <RenderRecipePage
          kindOfRecipe="Comidas"
          fetchCategories={jest.fn()}
          renderCategories={jest.fn()}
        />
      </RecipesAppProvider>,
    );

    await wait(() => expect(setInputValue).not.toHaveBeenCalledWith(expect.any(Function)));
    expect(setIsSearching).not.toHaveBeenCalledWith(false);
    expect(setRecipes).not.toHaveBeenCalledWith([]);
  });

  it('cleanup functions execute according to searchBar status', async () => {
    inputValue = { radio: 'test', text: 'test', didFetch: false };

    const { getByTestId } = renderWithRouter(
      <RecipesAppContext.Provider value={{ ...store, inputValue: [inputValue, setInputValue] }}>
        <RenderRecipePage
          kindOfRecipe="Comidas"
          fetchCategories={jest.fn()}
          renderCategories={jest.fn()}
        />
      </RecipesAppContext.Provider>,
    );

    await wait(() => expect(setInputValue).toHaveBeenCalledWith(expect.any(Function)));
    expect(setIsSearching).toHaveBeenCalledWith(false);
    expect(setRecipes).toHaveBeenCalledWith([]);
  });
});
