import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const RecipesAppContext = createContext();

export default function RecipesAppProvider({ children }) {
  const [headerTitle, setHeaderTitle] = useState('Comidas');
  const [displayHeader, setDisplayHeader] = useState(false);
  const [displaySearchButton, setDisplaySearchButton] = useState(true);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [displayFooter, setDisplayFooter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [recipeType, setRecipeType] = useState('Comidas');
  const [inputValue, setInputValue] = useState({ radio: '', text: '', didFetch: false });
  const [isFetching, setIsFetching] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [toggleCategory, setToggleCategory] = useState({ category: '', toggleCat: false });
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterFoodOrDrinks, setFilterFoodOrDrinks] = useState('All');
  const [disabled, setDisabled] = useState(false);
  const initialFavoriteRecipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];
  const [favoriteRecipes, setFavoriteRecipes] = useState(initialFavoriteRecipes);
  const [recipeDetails, setRecipeDetails] = useState('');
  const [isExploring, setIsExploring] = useState(false);

  function toggleHeaderAndFooter() {
    setDisplayHeader(!displayHeader);
    setDisplayFooter(!displayFooter);
  }

  function setDisplay(bool1, bool2, bool3) {
    setDisplayHeader(bool1);
    setDisplayFooter(bool3);
    setDisplaySearchButton(bool2);
  }


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
    toggleHeaderAndFooter,
    filtering: [isFiltering, setIsFiltering],
    filterFoodOrDrinks: [filterFoodOrDrinks, setFilterFoodOrDrinks],
    disabled: [disabled, setDisabled],
    favoriteRecipes: [favoriteRecipes, setFavoriteRecipes],
    recipeDetails: [recipeDetails, setRecipeDetails],
    isExploring: [isExploring, setIsExploring],
    setDisplay,
  };

  return <RecipesAppContext.Provider value={store}>{children}</RecipesAppContext.Provider>;
}

RecipesAppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
