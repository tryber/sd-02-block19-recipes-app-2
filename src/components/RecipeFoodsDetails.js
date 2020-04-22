import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import YouTube from 'react-youtube';

import Carousel from 'react-multi-carousel';
import { searchMealDetailsById, searchDrinkDetailsById } from '../services/recipeDetailsApi';
import { fetchMealByAllCategories } from '../services/mealPageApis';
import { fetchDrinkByAllCategories } from '../services/drinkPageApis';
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
    if (cur[0].match(/strIngredient/i) && cur[1]) {
      return [...acc, cur[1]];
    }
    if (cur[0].match(/strMeasure/i) && cur[1]) {
      acc[indexMeasure] = [acc[indexMeasure], cur[1]];
      indexMeasure += 1;
      return [...acc];
    }
    return [...acc];
  }, []);
};

const renderIngredients = (foods) => (
  <div className="ingredients-content">
    <div className="ingredient-title">Ingredients:</div>
    <div className="ingredients-box">
      {
        allIngredients(foods).map((ingredients, index) => (
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
  (youtube) && (
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
  )
);

const fetchRecomendedRecipes = async (setCarousel, typeFood) => {
  switch (typeFood) {
    case 'Meal':
      await fetchDrinkByAllCategories()
        .then(
          (({ drinks }) => {
            setCarousel((prevState) => (
              {
                ...prevState,
                data: [...prevState.data, ...drinks],
              }));
          }),
          () => console.log('ERROR DETAILS'),
        );
      break;
    default:
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
  }
};

const createImageCarousel = (title, Category, Thumb, index) => (
  <div data-testid={`${index}-recomendation-card`} key={title}>
    <img className="image-carousel" src={Thumb} alt="Imagem" />
    <div>{Category}</div>
    <div>{title}</div>
  </div>
);

const renderCarousel = (carousel, setCarousel, typeFood) => {
  const tagCarousel = (typeFood === 'Drink') ? 'Meal' : 'Drink';
  if (carousel.data.length < 6) {
    fetchRecomendedRecipes(setCarousel, typeFood);
  }
  return (carousel.data.length === 6) && (
    <Carousel responsive={responsive}>
      {carousel.data.map((element, index) => (
        createImageCarousel(
          element[`str${tagCarousel}`], element.strCategory, element[`str${tagCarousel}Thumb`], index,
        )
      ))}
    </Carousel>
  );
};

const addIdLocalStorage = (id, history) => {
  const arrayId = JSON.parse(localStorage.getItem('in-progress')) || [];
  arrayId.push(id);
  localStorage.setItem('in-progress', JSON.stringify(arrayId));
  return history.push('/ddddd');
};

const renderStartRecipeButton = (inProgress, id, history) => (
  <div className="start-button-container">
    <button
      className="start-button"
      data-testid="start-recipe-btn"
      type="button"
      onClick={() => (
        (inProgress) ? history.push('/asdasdasd') : addIdLocalStorage(id, history)
      )}
    >
      {(inProgress) ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  </div>
);

const renderAllDetails = (foods, carousel, setCarousel, id, typeFood, history) => {
  const inProgress = (JSON.parse(localStorage.getItem('in-progress')) || [])
    .some((inProgressId) => inProgressId === Number(id));
  const renderFood = foods[0];
  return (
    <div>
      <img
        className="image-details"
        data-testid="recipe-photo"
        src={renderFood[`str${typeFood}Thumb`]}
        alt="imagem da receita"
      />
      <h2 className="title-details" data-testid="recipe-title">{renderFood[`str${typeFood}`]}</h2>
      <p className="category-details">
        {(typeFood === 'Drink')
          ? renderFood.strAlcoholic
          : renderFood.strCategory}
      </p>
      {renderIngredients(foods)}
      {renderInstructions(renderFood.strInstructions)}
      {renderVideo(renderFood.strYoutube)}
      {renderCarousel(carousel, setCarousel, typeFood)}
      {renderStartRecipeButton(inProgress, Number(id), history)}
    </div>
  );
};

const fetchFoodById = async (id, setDetailsRecipe, setIsLoading, typeFood) => {
  switch (typeFood) {
    case 'Meal':
      await searchMealDetailsById(id)
        .then(
          (({ meals }) => {
            setDetailsRecipe(meals);
            setIsLoading(false);
          }),
          () => console.log('error'),
        );
      break;
    default:
      await searchDrinkDetailsById(id)
        .then(
          (({ drinks }) => {
            setDetailsRecipe(drinks);
            setIsLoading(false);
          }),
          () => console.log('error'),
        );
  }
};

const RecipeFoodDetails = ({ id, typeFood }) => {
  const [detailsRecipe, setDetailsRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [carousel, setCarousel] = useState({ isLoading: false, data: [] });
  const {
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter],
  } = useContext(RecipesAppContext);
  const history = useHistory();
  // const typeFood = (headerTitle[0].match(/comidas/i)) ? 'Meal' : 'Drink';
  useEffect(() => {
    setDisplayHeader(false);
    setDisplayFooter(false);
    setIsLoading(true);
    fetchFoodById(id, setDetailsRecipe, setIsLoading, typeFood);
  }, [setIsLoading, setDetailsRecipe, id, setDisplayFooter, setDisplayHeader]);
  return (
    <div>
      {(isLoading)
        ? <div>Loading...</div>
        : detailsRecipe && renderAllDetails(
          detailsRecipe, carousel, setCarousel, id, typeFood, history,
        )}
    </div>
  );
};

RecipeFoodDetails.propTypes = {
  id: propTypes.string,
  typeFood: propTypes.string,
}.isRequired;

export default RecipeFoodDetails;
