import React, { useContext } from 'react';
import {
  cleanup, wait, fireEvent,
} from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import renderWithRouter from '../services/renderWithRouter';
import RecipeAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import RecipesGenerator from '../components/RecipesGenerator';
import App from '../App';
import { byName } from '../__mocks__/recipesMock';


let [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
let [displayHeader, setDisplayHeader] = [true, jest.fn()];
let [displaySearchBar, setDisplaySearchBar] = [true, jest.fn()];
let [displaySearchButton, setDisplaySearchButton] = [true, jest.fn()];
let [displayFooter, setDisplayFooter] = [true, jest.fn()];
let [isLoading, setIsLoading] = [false, jest.fn()];
let [recipes, setRecipes] = [...byName.meals, jest.fn()];
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

const callError = () => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    status: 200,
    ok: false,
    json: () => mockJsonPromise,
  });
  return mockFetchPromise;
};

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
});
