import React from 'react';
import propTypes from 'prop-types';

import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

const RenderShareFavorite = ({ typeFood, id, detailsRecipe }) => {
  if (typeFood === 'Meal') {
    return (
      <div className="share-favorite-container">
        <ShareButton id={id} type="comida" />
        <FavoriteButton
          id={id}
          category={detailsRecipe[0].strCategory}
          image={detailsRecipe[0].strMealThumb}
          area={detailsRecipe[0].strArea}
          alcoholicOrNot={null}
          name={detailsRecipe[0].strMeal}
          type="comida"
        />
      </div>
    );
  }
  return (
    <div className="share-favorite-container">
      <ShareButton id={id} type="bebida" />
      <FavoriteButton
        id={id}
        category={detailsRecipe[0].strCategory}
        image={detailsRecipe[0].strDrinkThumb}
        area={null}
        alcoholicOrNot={detailsRecipe[0].strAlcoholic}
        name={detailsRecipe[0].strDrink}
        type="bebida"
      />
    </div>
  );
};

RenderShareFavorite.propTypes = {
  typeFood: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  detailsRecipe: propTypes.instanceOf(Array).isRequired,
};

export default RenderShareFavorite;
