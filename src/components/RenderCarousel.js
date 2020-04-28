import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { fetchMealByAllCategories } from '../services/mealPageApis';
import { fetchDrinkByAllCategories } from '../services/drinkPageApis';

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

const RenderCarousel = ({ carousel, setCarousel, typeFood }) => {
  const tagCarousel = (typeFood === 'Drink') ? 'Meal' : 'Drink';
  const type = (typeFood === 'Drink') ? 'comida' : 'bebida';
  if (carousel.data.length < 6) {
    fetchRecomendedRecipes(setCarousel, typeFood);
    return <div>Waiting...</div>;
  }
  return (
    <Carousel responsive={responsive}>
      {carousel.data.map((element, index) => (
        <Link to={`/receitas/${type}/${element[`id${tagCarousel}`]}`}>
          {createImageCarousel(
            element[`str${tagCarousel}`], element.strCategory, element[`str${tagCarousel}Thumb`], index,
          )}
        </Link>
      ))}
    </Carousel>
  );
};

RenderCarousel.propTypes = {
  carousel: propTypes.instanceOf(Array).isRequired,
  setCarousel: propTypes.func.isRequired,
  typeFood: propTypes.string.isRequired,
};

export default RenderCarousel;
