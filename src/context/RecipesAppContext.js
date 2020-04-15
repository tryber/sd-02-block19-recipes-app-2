import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const RecipesAppContext = createContext();

export default function RecipesAppProvider({ children }) {
  const [displayHeader, setDisplayHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);


  const store = {
    displayHeader: [displayHeader, setDisplayHeader],
    loading: [isLoading, setIsLoading],
    data: [recipes, setRecipes],
  };

  return <RecipesAppContext.Provider value={store}>{children}</RecipesAppContext.Provider>;
}

RecipesAppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
