import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import { fetchDrinkByAllCategories } from '../services/drinkPageApis';
import { fetchMealByAllCategories } from '../services/mealPageApis';
import { RecipesAppContext } from '../context/RecipesAppContext';

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
  <Link to={`/explorar/${type.toLowerCase()}/ingredients`}>
    <button type="button" data-testid="explore-by-ingredient">
      Por Ingredientes
    </button>
  </Link>
);

const renderByOrigin = (type) => (
  <Link to={`/explorar/${type.toLowerCase()}/area`}>
    <button
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
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter],
  } = useContext(RecipesAppContext);

  useEffect(() => {
    setDisplayHeader(true);
    setDisplayFooter(true);
  }, [setDisplayFooter, setDisplayHeader]);

  if (!isLoadingLocal) {
    return (
      <Redirect
        to={`/receitas/${type.toLowerCase().substring(0, type.length - 1)}/${idFood}`}
      />
    );
  }

  return (
    <div>
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
