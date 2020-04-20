import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RecipesAppContext } from '../context/RecipesAppContext';
import RecipesGenerator from './RecipesGenerator';

export default function RenderRecipePage({ kindOfRecipe, fetchCategories, renderCategories }) {
  const [categories, setCategories] = useState([]);
  const {
    loading: [isLoading, setIsLoading],
    toggleCategory,
    toggleCategory: [, setToggleCategory],
    data: [, setRecipes],
    headerTitle: [, setHeaderTitle],
    fetchingStatus: [, setIsFetching],
    recipeType: [recipeType, setRecipeType],
    inputValue: [{ didFetch }, setInputValue],
  } = useContext(RecipesAppContext);

  if (recipeType !== kindOfRecipe) setRecipeType(kindOfRecipe);
  if (didFetch === true) setInputValue((prevState) => ({ ...prevState, didFetch: false }));

  useEffect(() => {
    setToggleCategory({ category: '', toggleCat: false });
    setHeaderTitle(kindOfRecipe);
    fetchCategories(setIsLoading, setCategories);
    return (() => {
      setToggleCategory({ category: '', toggleCat: false });
      setIsFetching(false);
    });
  }, [
    setIsLoading, setHeaderTitle, setIsFetching, setToggleCategory, fetchCategories, kindOfRecipe]);
  return (
    <div>
      <nav>
        {categories && renderCategories(categories, toggleCategory, setRecipes, setIsFetching)}
      </nav>
      {(isLoading) && <div>Loading...</div>}
      <RecipesGenerator recipeType={kindOfRecipe} />
    </div>
  );
}

RenderRecipePage.propTypes = {
  kindOfRecipe: PropTypes.string.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  renderCategories: PropTypes.func.isRequired,
};
