import React, { useEffect, useState, useContext } from 'react';
import YouTube from 'react-youtube';
import propTypes from 'prop-types';

import Carousel from 'react-multi-carousel';
import { searchMealDetailsById } from '../services/recipeDetailsApi';
import { fetchMealByAllCategories } from '../services/mealPageApis';
import '../styles/RecipeMealDetails.css';
import 'react-multi-carousel/lib/styles.css';
import { RecipesAppContext } from '../context/RecipesAppContext';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

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

const fetchRecomendedRecipes = async (setCarousel) => {
  await fetchMealByAllCategories()
    .then(
      (({ meals }) => {
        setCarousel((prevState) => (
          {
            ...prevState,
            data: [...prevState.data, ...meals],
          }));
      }),
      () => console.log('ERROR DETAILS'),
    );
};

const createImageCarousel = (strMeal, strCategory, strMealThumb, index) => (
  <div data-testid={`${index}-recomendation-card`} key={strMeal}>
    <img className="image-carousel" src={strMealThumb} alt="Imagem" />
    <div>{strCategory}</div>
    <div>{strMeal}</div>
  </div>
);

const renderCarousel = (carousel, setCarousel) => {
  if (carousel.data.length < 6) {
    fetchRecomendedRecipes(setCarousel);
  }
  return (carousel.data.length === 6) && (
    <Carousel responsive={responsive}>
      {carousel.data.map(({ strMeal, strCategory, strMealThumb }, index) => (
        createImageCarousel(strMeal, strCategory, strMealThumb, index)
      ))}
    </Carousel>
  );
};

const renderStartRecipeButton = () => (
  <div className="start-button-container">
    <button
      className="start-button"
      data-testid="start-recipe-btn"
      type="button"
      onClick={() => alert('Voce Clicou')}
    >
      Iniciar receita
    </button>
  </div>
);

const renderAllDetails = (meals, carousel, setCarousel) => {
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
      {renderCarousel(carousel, setCarousel)}
      {renderStartRecipeButton()}
    </div>
  );
};

const fetchMealById = async (id, setDetailsRecipe, setIsLoading) => {
  await searchMealDetailsById(id)
    .then(
      (({ meals }) => {
        setDetailsRecipe(meals);
        setIsLoading(false);
      }),
      () => console.log('error'),
    );
};

const RecipeMealDetails = ({ match: { params: { id } } }) => {
  const [detailsRecipe, setDetailsRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [carousel, setCarousel] = useState({ isLoading: false, data: [] });
  const {
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter],
  } = useContext(RecipesAppContext);
  useEffect(() => {
    setDisplayHeader(false);
    setDisplayFooter(false);
    setIsLoading(true);
    fetchMealById(id, setDetailsRecipe, setIsLoading);
  }, [setIsLoading, setDetailsRecipe, id, setDisplayFooter, setDisplayHeader]);
  return (
    <div>
      {(isLoading)
        ? <div>Loading...</div>
        : detailsRecipe && renderAllDetails(detailsRecipe, carousel, setCarousel)}
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
