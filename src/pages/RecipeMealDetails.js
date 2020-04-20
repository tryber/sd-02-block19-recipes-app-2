import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import propTypes from 'prop-types';

import { searchMealDetailsById } from '../services/recipeDetailsApi';
import '../styles/RecipeMealDetails.css';

const allIngredients = (meals) => {
  let indexMeasure = 0;
  return Object.entries(meals[0]).reduce((acc, cur) => {
    if (cur[0].match(/strIngredient/i) && cur[1] !== '') {
      return [...acc, cur[1]];
    }
    if (cur[0].match(/strMeasure/i) && cur[1] !== '') {
      acc[indexMeasure] = [acc[indexMeasure], cur[1]];
      indexMeasure += 1;
      return [...acc];
    }
    return [...acc];
  }, []);
};

const renderIngredients = (meals) => (
  <div className="ingredients-content">
    <div className="ingredient-title">Ingredients:</div>
    <div className="ingredients-box">
      {
        allIngredients(meals).map((ingredients, index) => (
          <div className="ingredients-container" key={ingredients[0]}>
            <div data-testid={`${index}-ingredient-name`}>
              {`- ${ingredients[0]} - `}
            </div>
            <div data-testid={`${index}-ingredient-measure`}>{ingredients[1]}</div>
          </div>
        ))
      }
    </div>
  </div>
);

const renderInstructions = (instructions) => (
  <div className="instructions-content">
    <div className="instructions-title">Instructions:</div>
    <p className="instructions-details" data-testid="instructions">{instructions}</p>
  </div>
);

const renderVideo = (youtube) => (
  <div className="video-content">
    <div className="video-title">Video:</div>
    <div>
      <div className="video-details" data-testid="video">
        <YouTube
          className="video-youtube"
          videoId={youtube.split('=')[1]}
        />
      </div>
    </div>
  </div>
);

const renderCarousel = () => {
  console.log('Aqui vai o carousel');
};

const renderAllDetails = (meals) => {
  const {
    strMeal, strCategory, strInstructions, strMealThumb, strYoutube,
  } = meals[0];
  return (
    <div>
      <img
        className="image-details"
        data-testid="recipe-photo"
        src={strMealThumb}
        alt="imagem da receita"
      />
      <h2 className="title-details" data-testid="recipe-title">{strMeal}</h2>
      <p className="category-details">{strCategory}</p>
      {renderIngredients(meals)}
      {renderInstructions(strInstructions)}
      {renderVideo(strYoutube)}
      {renderCarousel()}
    </div>
  );
};

const RecipeMealDetails = ({ match: { params: { id } } }) => {
  const [detailsRecipe, setDetailsRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchMealById = async () => {
      await searchMealDetailsById(id)
        .then(
          (({ meals }) => {
            setDetailsRecipe(meals);
            setIsLoading(false);
          }),
          () => console.log('error'),
        );
    };
    fetchMealById();
  }, [setIsLoading, setDetailsRecipe, id]);
  return (
    <div>
      {(isLoading) ? <div>Loading...</div> : detailsRecipe && renderAllDetails(detailsRecipe)}
    </div>
  );
};

RecipeMealDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default RecipeMealDetails;
