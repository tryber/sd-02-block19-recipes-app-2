import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const RecipesAppContext = createContext();

export default function RecipesAppProvider({ children }) {
  const [headerTitle, setHeaderTitle] = useState('Comidas');
  const [displayHeader, setDisplayHeader] = useState(true);
  const [displaySearchButton, setDisplaySearchButton] = useState(true);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [displayFooter, setDisplayFooter] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [recipeType, setRecipeType] = useState('Comidas');
  const [inputValue, setInputValue] = useState({ radio: '', text: '', didFetch: false });
  const [isFetching, setIsFetching] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [toggleCategory, setToggleCategory] = useState({ category: '', toggleCat: false });

  function toggleHeaderAndFooter() {
    setDisplayHeader(!displayHeader);
    setDisplayFooter(!displayFooter);
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
  };

  return <RecipesAppContext.Provider value={store}>{children}</RecipesAppContext.Provider>;
}

RecipesAppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
