import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const RecipesAppContext = createContext();

export default function RecipesAppProvider({ children }) {
  const [headerTitle, setHeaderTitle] = useState('Receitas');
  const [displayHeader, setDisplayHeader] = useState(true);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const store = {
    headerTitle: [headerTitle, setHeaderTitle],
    displayHeader: [displayHeader, setDisplayHeader],
    loading: [isLoading, setIsLoading],
    data: [recipes, setRecipes],
    displaySearchBar: [displaySearchBar, setDisplaySearchBar],
  };

  return <RecipesAppContext.Provider value={store}>{children}</RecipesAppContext.Provider>;
}

RecipesAppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
