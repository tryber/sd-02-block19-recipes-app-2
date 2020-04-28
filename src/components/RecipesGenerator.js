import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RecipesAppContext } from '../context/RecipesAppContext';
import { getRandomRecipe } from '../services/searchBarApi';
import '../styles/RecipesGenerator.css';

const RecipeCard = ({ recipe, recipeType, index }) => {
  const { strCategory } = recipe;
  const recipeTypeString = recipeType === 'Comidas' ? 'Meal' : 'Drink';
  const trimmedUrlString = recipeType.toLocaleLowerCase().substring(0, recipeType.length - 1);
  return (
    <div className="recipe-content" key={`str${recipeTypeString}`}>
      <Link to={`/receitas/${trimmedUrlString}/${recipe[`id${recipeTypeString}`]}`}>
        <span
          data-testid={`${index}-card-category`}
          className="recipe-category"
        >
          {strCategory}
        </span>
        <div>
          <img
            data-testid={`${index}-card-img`}
            className="recipe-thumbnail"
            src={recipe[`str${recipeTypeString}Thumb`]}
            alt={`Foto de ${recipe[`str${recipeTypeString}`]} `}
          />
        </div>
        <span
          data-testid={`${index}-card-name`}
          className="recipe-name"
        >
          {recipe[`str${recipeTypeString}`]}
        </span>
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
    isExploring: [isExploring, setIsExploring],
  } = useContext(RecipesAppContext);

  const typeQueryString = recipeType === 'Comidas' ? 'meals' : 'drinks';

  useEffect(() => {
    if (isSearching === false && isExploring === false) setRecipes([]);
    if (isExploring) setIsLoading(false);
  }, [setRecipes, isSearching, isExploring, setIsLoading]);

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
            throw new Error('Erro desconhecido.');
          },
        )
        .then(() => setIsLoading(false));
    }
    const isNotFilteringOrSearching = !toggleCat && !isFetching && !isSearching && !isFiltering;
    if (isNotFilteringOrSearching && !isExploring
      && recipes && recipes.length < 12) fetchRandomRecipes();
  }, [
    isFetching, recipeType, recipes, isSearching, setIsLoading,
    setRecipes, toggleCat, typeQueryString, isFiltering, isExploring,
  ]);

  return (
    <div>
      <div>
        {isExploring && (
        <button type="button" onClick={() => setIsExploring(false)}>
          Sair da exploração
        </button>
        )}
      </div>
      <div className="recipes-container">
        {!isLoading && recipes && recipes.length > 0 ? recipes.map((recipe, index) => (
          (index <= 11)
          && <RecipeCard key={`${index + 1}`} recipe={recipe} recipeType={recipeType} index={index} />
        )) : !isLoading && <span>Não foi encontrado nenhum resultado.</span>}
      </div>
    </div>
  );
}

RecipesGenerator.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  recipeType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
