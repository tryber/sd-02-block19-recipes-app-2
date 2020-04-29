import React from 'react';
import propTypes from 'prop-types';

export const allIngredients = (meals) => {
  const ingredients = Object.entries(meals[0])
    .filter((el) => el[0].match(/strIngredient/i));
  const measures = Object.entries(meals[0])
    .filter((el) => el[0].match(/strMeasure/i));
  return ingredients.reduce((acc, cur, index) => {
    if (cur[1]) {
      return [...acc, [cur[1], measures[index][1]]];
    }
    return [...acc];
  }, []);
};

const Ingredients = ({ foods }) => (
  <div className="ingredients-content">
    <div className="ingredient-title">Ingredients:</div>
    <div className="ingredients-box">
      {allIngredients(foods).map((ingredients, index) => (
        <div className="ingredients-container" key={`-${ingredients[0]}-${ingredients[1]}`}>
          <div data-testid={`${index}-ingredient-name`}>{`- ${ingredients[0]} -`}</div>
          <div data-testid={`${index}-ingredient-measure`}>{` - ${ingredients[1]}`}</div>
        </div>
      ))}
    </div>
  </div>
);

Ingredients.propTypes = {
  foods: propTypes.instanceOf(Array).isRequired,
};

export default Ingredients;
