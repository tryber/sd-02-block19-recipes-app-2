import React, { useContext, useEffect } from 'react';
import { RecipesAppContext } from '../context/RecipesAppContext';
import { getRandomRecipe } from '../services/searchBarApi';
import '../styles/RecipesGenerator.css';

const RecipeCard = ({ recipe }) => {
  console.log(recipe);
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
    inputValue: [inputValue],
  } = useContext(RecipesAppContext);

  useEffect(() => {
    console.log('recipes length: ', recipes.length, 'recipes: ', recipes, 'inputValue: ', inputValue);
    console.log('recipe Types:', recipeType);
    if (recipes.length < 11 && !inputValue.didFetch) {
      getRandomRecipe(recipeType)
        .then(
          (recipe) => {
            setIsLoading(false);
            return recipe.meals ? setRecipes((existingRecipes) => [...existingRecipes, ...recipe.meals])
              : setRecipes((existingRecipes) => [...existingRecipes, ...recipe.drinks]);
          },
          () => {
            setRecipes([]);
            setIsLoading(false);
          },
        );
    }
  }, [recipes, recipeType, setRecipes, setIsLoading]);

  return (
    <div className="recipes-container">
      {(!recipes) ? null : recipes.map((recipe, index) => (
        (index <= 11) && (
          <RecipeCard recipe={recipe} />
        )
      ))}
    </div>
  );
}
