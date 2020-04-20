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
  const [recipesByCategory, setRecipesByCategory] = useState([]);
  const [toggleCategory, setToggleCategory] = useState({ category: '', toggleCat: false });


  const store = {
    headerTitle: [headerTitle, setHeaderTitle],
    displayHeader: [displayHeader, setDisplayHeader],
    displaySearchButton: [displaySearchButton, setDisplaySearchButton],
    displaySearchBar: [displaySearchBar, setDisplaySearchBar],
    displayFooter: [displayFooter, setDisplayFooter],
    loading: [isLoading, setIsLoading],
    data: [recipes, setRecipes],
    recipesByCategory: [recipesByCategory, setRecipesByCategory],
    toggleCategory: [toggleCategory, setToggleCategory],
  };

  return <RecipesAppContext.Provider value={store}>{children}</RecipesAppContext.Provider>;
}

RecipesAppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
