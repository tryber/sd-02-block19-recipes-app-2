import React, { useContext, useState, useEffect } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import RecipesGenerator from '../components/RecipesGenerator';
import { RecipesAppContext } from '../context/RecipesAppContext';
import useFilterByOrigin from '../hooks/useFilterByOrigin';
import { fetchFoodAreas } from '../services/searchBarApi';
import '../styles/ExploreByOrigin.css';

function originSelectionDropdown(setFilterByOrigin, foodAreas, setIsFiltering, setIsLoading) {
  return (
    <select
      data-testid="explore-by-area-dropdown"
      className="origin-selector-dropdown"
      onChange={(e) => {
        setFilterByOrigin(e.target.value);
        setIsFiltering(false);
        setIsLoading(true);
      }}
    >
      <option
        data-testid="all-option"
        value="All"
      >
        All
      </option>
      {foodAreas && foodAreas.length > 1 ? foodAreas.map((area, index) => (
        <option
          key={`${area}_${index + 1}`}
          data-testid={`${area}-option`}
          value={area}
        >
          {area}
        </option>
      )) : null}
    </select>
  );
}

function RenderComponentsOfExplorebyOriginPage({
  recipeType, setFilterByOrigin, foodAreas, setIsFiltering, setIsLoading, isLoading,
}) {
  return (
    recipeType === 'Bebidas' ? (
      <div>
        <p>Página não disponível para bebidas.</p>
      </div>
    )
      : (
        <div className="explore-by-origin-container">
          <div className="selector-container">
            {originSelectionDropdown(setFilterByOrigin, foodAreas, setIsFiltering, setIsLoading)}
          </div>
          {isLoading && <p>Loading...</p>}
          <div>
            <RecipesGenerator recipeType={recipeType} />
          </div>
        </div>
      )
  );
}


export default function ExploreByOrigin() {
  const {
    data: [recipes, setRecipes], recipeType: [recipeType], filtering: [, setIsFiltering],
    loading: [isLoading, setIsLoading], headerTitle: [, setHeaderTitle],
  } = useContext(RecipesAppContext);
  const [foodAreas, setFoodAreas] = useState([]);
  const [filterByOrigin, setFilterByOrigin] = useState('All');
  const filteredRecipes = useFilterByOrigin(recipes, filterByOrigin, setIsLoading);

  useEffect(() => {
    async function fetchAreas() {
      fetchFoodAreas()
        .then(({ meals }) => meals)
        .then((meals) => setFoodAreas(meals.map(({ strArea }) => strArea)));
    }
    setHeaderTitle('Explorar Origem');
    fetchAreas();
  }, [setHeaderTitle]);

  useEffect(() => {
    if (filterByOrigin === 'All') {
      setIsFiltering(false);
    } else {
      setRecipes(filteredRecipes);
      setIsFiltering(true);
    }
    return (() => setRecipes([]));
  }, [filteredRecipes, filterByOrigin, setIsFiltering, setRecipes]);

  return (
    <RenderComponentsOfExplorebyOriginPage
      recipeType={recipeType}
      setFilterByOrigin={setFilterByOrigin}
      foodAreas={foodAreas}
      setIsFiltering={setIsFiltering}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
    />
  );
}

RenderComponentsOfExplorebyOriginPage.propTypes = {
  recipeType: PropTypes.string.isRequired,
  setFilterByOrigin: PropTypes.func.isRequired,
  foodAreas: PropTypes.arrayOf(instanceOf(String)).isRequired,
  setIsFiltering: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
