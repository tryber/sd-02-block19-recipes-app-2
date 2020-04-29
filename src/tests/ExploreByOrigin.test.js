import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import ExploreByOrigin from '../pages/ExploreByOrigin';
import RecipesAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import foodRecipesMock from '../__mocks__/foodRecipesMock';

const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
const [displayHeader, setDisplayHeader] = [false, jest.fn()];
const [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
const [displaySearchButton, setDisplaySearchButton] = [false, jest.fn()];
const [displayFooter, setDisplayFooter] = [true, jest.fn()];
const [isLoading, setIsLoading] = [true, jest.fn()];
const [recipes, setRecipes] = [[], jest.fn()];
let [recipeType, setRecipeType] = ['Comidas', jest.fn()];
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

describe('ExploreByOrigin page tests', () => {
  it('if recipeType is "Bebidas", then the page be displayed with message', () => {
    [recipeType, setRecipeType] = ['Bebidas', jest.fn()];
    store = { ...store, recipeType: [recipeType, setRecipeType] };

    const { queryByTestId, getByText } = renderWithRouter(
      <RecipesAppContext.Provider value={store}>
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

  it('tests if functions work properly after region is selected', async () => {
    const { getByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <ExploreByOrigin />
      </RecipesAppProvider>,
    );

    await wait(() => getByTestId('explore-by-area-dropdown'));
    await wait(() => getByTestId('American-option'));
    const areaDropdown = getByTestId('explore-by-area-dropdown');
    const americanOption = getByTestId('American-option');

    expect(areaDropdown).toBeInTheDocument();
    expect(americanOption).toBeInTheDocument();
    const fetchMock = jest.spyOn(global, 'fetch');

    fireEvent.change(areaDropdown, { target: { value: 'American' } });
    await wait();

    expect(fetchMock).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');
    expect(setIsFiltering).toHaveBeenLastCalledWith(false);

    await wait(() => getByTestId('11-card-name'));
    const eleventhRecipe = getByTestId('11-card-name');

    expect(eleventhRecipe).toBeInTheDocument();
  }, 15000);
});
