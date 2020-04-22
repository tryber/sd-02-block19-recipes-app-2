import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RecipesAppContext } from '../context/RecipesAppContext';
import { getRandomRecipe } from '../services/searchBarApi';
import '../styles/RecipesGenerator.css';

const RecipeCard = ({ recipe, recipeType }) => {
  const { strCategory } = recipe;
  const recipeTypeString = recipeType === 'Comidas' ? 'Meal' : 'Drink';
  const trimmedUrlString = recipeType.toLocaleLowerCase().substring(0, recipeType.length - 1);
  return (
    <div className="recipe-content" key={`str${recipeTypeString}`}>
      <Link to={`/receita/${trimmedUrlString}/${recipe[`id${recipeTypeString}`]}`}>
        <span className="recipe-category">{strCategory}</span>
        <div>
          <img
            className="recipe-thumbnail"
            src={recipe[`str${recipeTypeString}Thumb`]}
            alt={`Foto de ${recipe[`str${recipeTypeString}`]} `}
          />
        </div>
        <span className="recipe-name">{recipe[`str${recipeTypeString}`]}</span>
      </Link>
    </div>
  );
};

export default function RecipesGenerator({ recipeType }) {
  const {
    data: [recipes, setRecipes],
    loading: [isLoading, setIsLoading],
    toggleCategory: [{ toggleCat }],
    fetchingStatus: [isFetching],
    isSearching: [isSearching],
    filtering: [isFiltering],
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
      !toggleCat && !isFetching && !isSearching
      && !isFiltering && recipes && recipes.length < 12
    ) fetchRandomRecipes();
  }, [
    isFetching, recipeType, recipes, isSearching, setIsLoading,
    setRecipes, toggleCat, typeQueryString,
  ]);

  return (
    <div className="recipes-container">
      {!isLoading && recipes && recipes.length > 0 ? recipes.map((recipe, index) => (
        (index <= 11)
        && <RecipeCard key={`${index + 1}`} recipe={recipe} recipeType={recipeType} />
      )) : (!isLoading) && <span>Não foi encontrado nenhum resultado.</span>}
    </div>
  );
}

RecipesGenerator.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  recipeType: PropTypes.string,
};

RecipeCard.defaultProps = {
  recipeType: '',
};
