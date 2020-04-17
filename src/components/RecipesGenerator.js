import React, { useContext, useEffect } from 'react';
import { RecipesAppContext } from '../context/RecipesAppContext';
import { getRandomRecipe } from '../services/searchBarApi';
import '../styles/RecipesGenerator.css';

const RecipeCard = ({ recipe }) => {
  const { recipeType: [recipeType] } = useContext(RecipesAppContext);
  const stringRecipeType = recipeType === 'Comidas' ? 'Meal' : 'Drink';
  return (
    <div className="recipe-content" key={recipe.strDrink}>
      <span className="recipe-category">{recipe.strCategory}</span>
      <img className="recipe-thumbnail" src={recipe[`str${stringRecipeType}Thumb`]} alt={`Foto de ${recipe[`str${stringRecipeType}`]} `} />
      <span className="recipe-name">{recipe[`str${stringRecipeType}`]}</span>
    </div>
  );
};

export default function RecipesGenerator() {
  const {
    data: [recipes, setRecipes],
    recipeType: [recipeType],
    loading: [, setIsLoading],
    isSearching: [isSearching],
  } = useContext(RecipesAppContext);

  const typeQueryString = recipeType === 'Comidas' ? 'meals' : 'drinks';

  useEffect(() => {
    getRandomRecipe(recipeType)
      .then(
        (recipe) => {
          setIsLoading(false);
          return setRecipes(
            (existingRecipes) => (existingRecipes ? [...existingRecipes, ...recipe[`${typeQueryString}`]] : []),
          );
        },
        () => {
          setRecipes([]);
          setIsLoading(false);
        },
      );
  }, [typeQueryString, setRecipes, setIsLoading, recipeType]);

  if (recipes && !isSearching && recipes.length < 12) {
    getRandomRecipe(recipeType)
      .then(
        (recipe) => {
          setIsLoading(false);
          return setRecipes(
            (existingRecipes) => (existingRecipes ? [...existingRecipes, ...recipe[`${typeQueryString}`]] : []),
          );
        },
        () => {
          setRecipes([]);
          setIsLoading(false);
        },
      );
  }

  useEffect(() => setRecipes([]), [setRecipes]);

  return (
    <div className="recipes-container">
      {(!recipes) ? null : recipes.map((recipe, index) => (
        (index <= 11) && (
          <RecipeCard key={`${index + 1}`} recipe={recipe} />
        )
      ))}
    </div>
  );
}
