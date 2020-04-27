import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { RecipesAppContext } from '../context/RecipesAppContext';

import { listDrinkIngredients, listMealIngredients } from '../services/ingredientsApis';

const IMAGE_URL_MEAL = 'https://www.themealdb.com/images/ingredients/';
const IMAGE_URL_DRINK = 'https://www.thecocktaildb.com/images/ingredients/';


const fetchIngredients = async (type, setIngredients, setIsLocalLoading) => {
  if (type === 'Comidas') {
    return listMealIngredients()
      .then(
        ({ meals }) => {
          setIngredients(meals);
          setIsLocalLoading(false);
        },
        () => console.log('ERROR ingredients'),
      );
  }
  return listDrinkIngredients()
    .then(
      ({ drinks }) => {
        setIngredients(drinks);
        setIsLocalLoading(false);
      },
      () => console.log('ERROR ingredients'),
    );
};

const renderIngredients = (ingredients, imageUrl) => {
  const newIngredients = ingredients.slice(0, (ingredients.length / 3));
  return (
    <div>
      {newIngredients.map((ele) => (
        <div key={ele.strIngredient || ele.strIngredient1}>
          <img
            src={
              `${imageUrl}${ele.strIngredient || ele.strIngredient1}-Small.png`
            }
            alt={`${ele.strIngredient || ele.strIngredient1}`}
          />
          <div>{ele.strIngredient || ele.strIngredient1}</div>
        </div>
      ))}
    </div>
  );
};

const ExploreIngredients = ({ type }) => {
  const imageURL = (type === 'Comidas') ? IMAGE_URL_MEAL : IMAGE_URL_DRINK;
  const [ingredients, setIngredients] = useState([]);
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const {
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter],
  } = useContext(RecipesAppContext);

  useEffect(() => {
    fetchIngredients(type, setIngredients, setIsLocalLoading);
    setDisplayHeader(true);
    setDisplayFooter(true);
  }, [setDisplayFooter, setDisplayHeader]);

  if (isLocalLoading) return <div>Loading...</div>;
  return (
    <div>
      {renderIngredients(ingredients, imageURL)}
    </div>
  );
};

ExploreIngredients.propTypes = {
  type: propTypes.string.isRequired,
};

export default ExploreIngredients;
