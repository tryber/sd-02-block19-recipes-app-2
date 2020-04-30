import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import { fetchDrinkByAllCategories } from '../services/drinkPageApis';
import { fetchMealByAllCategories } from '../services/mealPageApis';
import { RecipesAppContext } from '../context/RecipesAppContext';

import '../styles/ExploreFoods.css';

const fetchByRandomMeal = async (type, setIsLoadingLocal, setIdFood) => {
  if (type === 'Comidas') {
    return fetchMealByAllCategories()
      .then(
        (({ meals }) => {
          setIdFood(meals[0].idMeal);
          setIsLoadingLocal(false);
        }),
        () => console.log('error explore meal'),
      );
  }
  return fetchDrinkByAllCategories()
    .then(
      (({ drinks }) => {
        setIdFood(drinks[0].idDrink);
        setIsLoadingLocal(false);
      }),
      () => console.log('error explore drink'),
    );
};

const renderByIngredients = (type) => (
  <Link className="link-origin" to={`/explorar/${type.toLowerCase()}/ingredientes`}>
    <button
      className="link-button"
      type="button"
      data-testid="explore-by-ingredient"
    >
      Por Ingredientes
    </button>
  </Link>
);

const renderByOrigin = (type) => (
  <Link className="link-origin" to={`/explorar/${type.toLowerCase()}/area`}>
    <button
      className="link-button"
      type="button"
      data-testid="explore-by-area"
      disabled={(type === 'Bebidas')}
    >
      Por Local de Origem
    </button>
  </Link>
);

const renderBySuprise = (type, setIsLoadingLocal, setIdFood) => (
  <button
    className="button-explore"
    type="button"
    data-testid="explore-surprise"
    onClick={() => fetchByRandomMeal(type, setIsLoadingLocal, setIdFood)}
  >
    Me Supreenda!!!
  </button>
);

const ExploreFoods = ({ type }) => {
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const [idFood, setIdFood] = useState('');
  const {
    setDisplay, headerTitle: [, setHeaderTitle], recipeType: [, setRecipeType],
  } = useContext(RecipesAppContext);

  useEffect(() => {
    setDisplay(true, true, true);
    setHeaderTitle(`Explorar - ${type}`);
    setRecipeType(type);
  }, [setDisplay, setHeaderTitle, type, setRecipeType]);

  if (!isLoadingLocal) {
    return (
      <Redirect
        to={`/receitas/${type.toLowerCase().substring(0, type.length - 1)}/${idFood}`}
      />
    );
  }

  return (
    <div className="explore-buttons-container">
      {renderByIngredients(type)}
      {renderByOrigin(type)}
      {renderBySuprise(type, setIsLoadingLocal, setIdFood)}
    </div>
  );
};

ExploreFoods.propTypes = {
  type: propTypes.string.isRequired,
};

export default ExploreFoods;
