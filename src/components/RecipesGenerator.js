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
    fetchingStatus: [isFetching],
    isSearching: [isSearching],

  } = useContext(RecipesAppContext);

  const typeQueryString = recipeType === 'Comidas' ? 'meals' : 'drinks';

  useEffect(() => {
    if (isSearching === false) setRecipes([]);
  }, [setRecipes, isSearching]);

  useEffect(() => {
    async function fetchRandomRecipes() {
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
      && isSearching === false
      && recipes
      && recipes.length < 12
    ) fetchRandomRecipes();
  }, [
    isFetching, recipeType, recipes, isSearching, setIsLoading,
    setRecipes, toggleCat, typeQueryString,
  ]);

  return (
    <div className="recipes-container">
      {recipes && recipes.length > 0 ? recipes.map((recipe, index) => {
        if (index <= 11) {
          return <RecipeCard key={`${index + 1}`} recipe={recipe} recipeType={recipeType} />;
        }
        return setIsLoading(false);
      }) : <span>Não foi encontrado nenhum resultado.</span>}
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
