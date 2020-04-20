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
    loading: [, setIsLoading],
    toggleCategory: [{ toggleCat }],
    fetchingStatus: [isFetching, setIsFetching],
  } = useContext(RecipesAppContext);

  const typeQueryString = recipeType === 'Comidas' ? 'meals' : 'drinks';

  useEffect(() => {
    setRecipes([]);
  }, [setRecipes]);

  async function fetchRandomRecipes() {
    setIsLoading(true);
    setIsFetching(true);

    for (let i = 0; i < 12; i += 1) {
      console.log(recipeType);
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
  }

  if (!toggleCat && !isFetching && (recipes !== undefined || recipes === [])) fetchRandomRecipes();

  return (
    <div className="recipes-container">
      {recipes === [] ? null : recipes.map((recipe, index) => (
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
