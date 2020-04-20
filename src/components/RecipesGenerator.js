import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RecipesAppContext } from '../context/RecipesAppContext';
import { getRandomRecipe } from '../services/searchBarApi';
import '../styles/RecipesGenerator.css';

const RecipeCard = ({ recipe, recipeType }) => {
  const { strCategory } = recipe;
  const recipeTypeString = recipeType === 'Comidas' ? 'Meal' : 'Drink';
  return (
    <div className="recipe-content" key={`str${recipeTypeString}`}>
      <span className="recipe-category">{strCategory}</span>
      <div>
        <img
          className="recipe-thumbnail"
          src={recipe[`str${recipeTypeString}Thumb`]}
          alt={`Foto de ${recipe[`str${recipeTypeString}`]} `}
        />
      </div>
      <span className="recipe-name">{recipe[`str${recipeTypeString}`]}</span>
    </div>
  );
};

export default function RecipesGenerator({ recipeType }) {
  const {
    data: [recipes, setRecipes],
    loading: [isLoading, setIsLoading],
    toggleCategory: [{ toggleCat }],
    fetchingStatus: [isFetching],
  } = useContext(RecipesAppContext);

  const typeQueryString = recipeType === 'Comidas' ? 'meals' : 'drinks';

  useEffect(() => {
    setRecipes([]);
  }, [setRecipes]);

  useEffect(() => {
    async function fetchRandomRecipes() {
      console.log('rendered one random recipe');
      setIsLoading(true);
      getRandomRecipe(recipeType)
        .then(
          (recipe) => setRecipes(
            (existingRecipes) => (
              existingRecipes ? [...existingRecipes, ...recipe[`${typeQueryString}`]] : []
            ),
          ),
          () => {
            setRecipes([]);
          },
        )
        .then(() => setIsLoading(false));
    }
    if (
      toggleCat === false
      && isFetching === false
      && recipes
      && recipes.length < 12
    ) fetchRandomRecipes();
  }, [isFetching, recipeType, recipes, setIsLoading, setRecipes, toggleCat, typeQueryString]);

  console.log('isFetching: ', isFetching, 'toggleCat: ', toggleCat, 'recipes length: ', recipes.length, 'recipes: ', !!recipes);



  return (
    <div className="recipes-container">
      {isLoading ? null : recipes.map((recipe, index) => (
        (index <= 11) && (
          <RecipeCard key={`${index + 1}`} recipe={recipe} recipeType={recipeType} />
        )
      ))}
    </div>
  );
}

RecipesGenerator.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  strCategory: PropTypes.string,
  recipeType: PropTypes.string,
};

RecipeCard.defaultProps = {
  strCategory: '',
  recipeType: '',
};
