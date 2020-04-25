import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import ExploreByOrigin from '../pages/ExploreByOrigin';
import RecipesAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import foodRecipesMock from '../__mocks__/foodRecipesMock';

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

describe('ExploreByOrigin page tests', () => {
  it('if recipeType is "Bebidas", then the page be displayed with message', () => {
    [recipeType, setRecipeType] = ['Bebidas', jest.fn()];
    const { getByTestId, queryByTestId, getByText } = renderWithRouter(
      <RecipesAppContext.Provider value={{ ...store, recipeType: [recipeType, setRecipeType] }}>
        <ExploreByOrigin />
      </RecipesAppContext.Provider>,
    );
    expect(queryByTestId('explore-by-area-dropdown')).not.toBeInTheDocument();
    expect(getByText('Página não disponível para bebidas.')).toBeInTheDocument();
  });

  it('if recipeType is "Bebidas", then the page be displayed with message', async () => {
    const { getByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <ExploreByOrigin />
      </RecipesAppProvider>,
    );

    await wait(() => getByTestId('American-option'));
    await wait(() => getByTestId('11-card-name'));

    expect(getByTestId('explore-by-area-dropdown')).toBeInTheDocument();
    foodRecipesMock.meals.forEach(({ strArea }, index) => {
      expect(getByTestId('all-option')).toBeInTheDocument();
      expect(getByTestId(`${strArea}-option`)).toBeInTheDocument();
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
      expect(getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(getByTestId(`${index}-card-category`)).toBeInTheDocument();
    });
  }, 15000);
});
