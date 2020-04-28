import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import YouTube from 'react-youtube';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { searchMealDetailsById, searchDrinkDetailsById } from '../services/recipeDetailsApi';
import { fetchMealByAllCategories } from '../services/mealPageApis';
import { fetchDrinkByAllCategories } from '../services/drinkPageApis';
import '../styles/RecipeMealDetails.css';
import { RecipesAppContext } from '../context/RecipesAppContext';
import CheckBox from './CheckBox';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import Ingredients, { allIngredients } from './Ingredients';

import '../styles/RecipeFoodsDetails.css';

const responsive = {
  superLargeDesktop: {
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

const renderCheckBox = (foods, typeFood) => (
  <CheckBox foods={foods} allIngredients={allIngredients} typeFood={typeFood} />
);

const renderIngredients = (foods) => (
  <Ingredients foods={foods} />
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
          <YouTube className="video-youtube" videoId={youtube.split('=')[1]} />
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

const createImageCarousel = (title, category, Thumb, index) => (
  <div data-testid={`${index}-recomendation-card`} key={title}>
    <img className="image-carousel" src={Thumb} alt="Imagem" />
    <div>{category}</div>
    <div>{title}</div>
  </div>
);

const renderCarousel = (carousel, setCarousel, typeFood) => {
  const tagCarousel = (typeFood === 'Drink') ? 'Meal' : 'Drink';
  if (carousel.data.length < 6) {
    fetchRecomendedRecipes(setCarousel, typeFood);
    return <div>Waiting...</div>;
  }
  return (
    <Carousel responsive={responsive}>
      {carousel.data.map((element, index) => (
        createImageCarousel(
          element[`str${tagCarousel}`], element.strCategory, element[`str${tagCarousel}Thumb`], index,
        )))}
    </Carousel>
  );
};

const addIdLocalStorage = (id, inProgress, setRenderInProgress) => {
  if (!inProgress) {
    const arrayId = JSON.parse(localStorage.getItem('in-progress')) || [];
    arrayId.push(id);
    localStorage.setItem('in-progress', JSON.stringify(arrayId));
  }
  setRenderInProgress(true);
};

const buttonName = (inProgress) => ((inProgress) ? 'Continuar Receita' : 'Iniciar Receita');

const endRecipe = (target, setRenderInProgress, setCanRedirect) => {
  if (target.innerHTML === 'Finalizar Receita') setCanRedirect(true);
  setRenderInProgress(true);
};

const renderStartRecipeButton = (
  inProgress, id, renderInProgress, setRenderInProgress, disabled, setCanRedirect,
) => (
    <div className="start-button-container">
      <button
        disabled={(renderInProgress) ? disabled : false}
        className="start-button"
        data-testid="start-recipe-btn"
        type="button"
        onClick={({ target }) => (
          (inProgress)
            ? endRecipe(target, setRenderInProgress, setCanRedirect)
            : addIdLocalStorage(id, inProgress, setRenderInProgress))}
      >
        {(renderInProgress)
          ? 'Finalizar Receita'
          : buttonName(inProgress)}
      </button>
    </div>
  );

const renderAllDetails = (
  foods, carousel, setCarousel, id, typeFood, renderInProgress,
  setRenderInProgress, disabled, setCanRedirect,
) => {
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
      {(!renderInProgress) ? renderIngredients(foods)
        : renderCheckBox(foods, typeFood)}
      {renderInstructions(renderFood.strInstructions)}
      {(!renderInProgress) && renderVideo(renderFood.strYoutube)}
      {(!renderInProgress) && renderCarousel(carousel, setCarousel, typeFood)}
      {renderStartRecipeButton(
        inProgress, Number(id), renderInProgress, setRenderInProgress, disabled, setCanRedirect,
      )}
    </div>
  );
};

const fetchFoodById = async (id, setDetailsRecipe, setIsLoading, typeFood) => {
  switch (typeFood) {
    case 'Meal':
      return searchMealDetailsById(id)
        .then(
          (({ meals }) => {
            setDetailsRecipe(meals);
          }),
          () => console.log('error'),
        );
    default:
      return searchDrinkDetailsById(id)
        .then(
          (({ drinks }) => {
            setDetailsRecipe(drinks);
          }),
          () => console.log('error'),
        );
  }
};

const renderShareFavorite = (id, typeFood, detailsRecipe) => {
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

const mainRender = (
  canRedirect, isLoading, detailsRecipe, carousel, setCarousel, id, typeFood,
  renderInProgress, setRenderInProgress, disabled, setCanRedirect,
) => {
  if (canRedirect) return <Redirect to="/asdasdasd" />;
  return (
    <div>
      {(isLoading) ? <div>Loading...</div> : detailsRecipe && renderAllDetails(
        detailsRecipe,
        carousel,
        setCarousel,
        id,
        typeFood,
        renderInProgress,
        setRenderInProgress,
        disabled[0],
        setCanRedirect,
      )}
      {(!isLoading) && (renderShareFavorite(id, typeFood, detailsRecipe))}
    </div>
  );
}

const RecipeFoodDetails = ({ id, typeFood }) => {
  const [detailsRecipe, setDetailsRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [carousel, setCarousel] = useState({ isLoading: false, data: [] });
  const [renderInProgress, setRenderInProgress] = useState(false);
  const [canRedirect, setCanRedirect] = useState(false);
  const {
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter], disabled,
  } = useContext(RecipesAppContext);
  useEffect(() => {
    setDisplayHeader(false);
    setDisplayFooter(false);
    fetchFoodById(id, setDetailsRecipe, setIsLoading, typeFood)
      .then(() => setIsLoading(false));
  }, [setIsLoading, setDetailsRecipe, id, setDisplayFooter, setDisplayHeader, typeFood]);
  return mainRender(
    canRedirect, isLoading, detailsRecipe, carousel, setCarousel, id, typeFood,
    renderInProgress, setRenderInProgress, disabled, setCanRedirect,
  );
};

RecipeFoodDetails.propTypes = {
  id: propTypes.string,
  typeFood: propTypes.string,
}.isRequired;

export default RecipeFoodDetails;
