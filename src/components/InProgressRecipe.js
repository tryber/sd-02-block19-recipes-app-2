import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import { allIngredients } from './Ingredients';
import ImgCatTitleDetails from './ImgCatTitleDetails';
import CheckBox from './CheckBox';
import Instructions from './Instructions';
import useFoodById from '../hooks/useFoodById';
import CurrentDetailsButton from './CurrentDetailsButton';
import RenderShareFavorite from './RenderShareFavorite';

const InProgressRecipe = ({ typeFood, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const recipeDetails = useFoodById(id, typeFood);
  const renderInProgress = true;

  useEffect(() => {
    if (recipeDetails.length > 0) setIsLoading(false);
  }, [recipeDetails, setIsLoading]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="details-container">
      <ImgCatTitleDetails foods={recipeDetails} typeFood={typeFood} />
      <CheckBox foods={recipeDetails} typeFood={typeFood} allIngredients={allIngredients} />
      <Instructions instructions={recipeDetails[0].strInstructions} />
      <CurrentDetailsButton
        id={Number(id)}
        typeFood={typeFood}
        renderInProgress={renderInProgress}
        recipe={recipeDetails}
      />
      <RenderShareFavorite id={id} typeFood={typeFood} detailsRecipe={recipeDetails} />
    </div>
  );
};

InProgressRecipe.propTypes = {
  typeFood: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
};

export default InProgressRecipe;
