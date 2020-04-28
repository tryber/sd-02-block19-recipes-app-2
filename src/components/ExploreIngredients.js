import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { RecipesAppContext } from '../context/RecipesAppContext';
import { listDrinkIngredients, listMealIngredients } from '../services/ingredientsApis';
import { searchMealsByMainIngredient, searchDrinksByMainIngredient } from '../services/searchBarApi';

import '../styles/ExploreIngredients.css';

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

const fetchByIngredient = async (
  ingredient, type, setRecipes, setCanRedirect,
) => {
  if (type === 'Comidas') {
    return searchMealsByMainIngredient(ingredient)
      .then(
        (({ meals }) => {
          setRecipes(meals);
          setCanRedirect(true);
        }),
        (err) => {
          console.log('ERRO EXPLORE INGREDIENTS');
          console.log(err);
        },
      );
  }
  return searchDrinksByMainIngredient(ingredient)
    .then(
      (({ drinks }) => {
        setRecipes(drinks);
        setCanRedirect(true);
      }),
      (err) => {
        console.log('ERRO EXPLORE INGREDIENTS');
        console.log(err);
      },
    );
};

const renderIngredients = (
  ingredients, imageUrl, type, setRecipes, setCanRedirect,
) => {
  const newIngredients = ingredients.slice(0, (ingredients.length / 2));
  return (
    <div className="ingredients-container">
      {newIngredients.map((ele) => (
        <div className="ingredients-content" key={ele.strIngredient || ele.strIngredient1}>
          <button
            className="button-explore-ingredients"
            type="button"
            onClick={() => fetchByIngredient(
              (ele.strIngredient || ele.strIngredient1), type, setRecipes,
              setCanRedirect,
            )}
          >
            <img
              data-testid={`${ele.strIngredient || ele.strIngredient1}-card-img`}
              src={
                `${imageUrl}${ele.strIngredient || ele.strIngredient1}-Small.png`
              }
              alt={`${ele.strIngredient || ele.strIngredient1}`}
            />
            <div
              data-testid={`${ele.strIngredient || ele.strIngredient1}-card-name`}
            >
              {ele.strIngredient || ele.strIngredient1}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

const ExploreIngredients = ({ type }) => {
  const imageURL = (type === 'Comidas') ? IMAGE_URL_MEAL : IMAGE_URL_DRINK;
  const [ingredients, setIngredients] = useState([]);
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [canRedirect, setCanRedirect] = useState(false);
  const {
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter], data,
    headerTitle: [, setHeaderTitle], isExploring: [, setIsExploring],
    loading: [, setIsLoading],
  } = useContext(RecipesAppContext);

  useEffect(() => {
    setDisplayHeader(true);
    setDisplayFooter(true);
    setHeaderTitle('Explorar Ingredientes');
  }, [setDisplayFooter, setDisplayHeader, setHeaderTitle]);

  useEffect(() => {
    fetchIngredients(type, setIngredients, setIsLocalLoading);
  }, [type]);
  if (canRedirect) {
    setIsExploring(true);
    setIsLoading(false);
  }
  if (canRedirect) return (type === 'Comidas' ? <Redirect to="/comidas" /> : <Redirect to="/bebidas" />);

  return (
    <div>
      {isLocalLoading && <div>Loading...</div>}
      {renderIngredients(ingredients, imageURL, type, data[1], setCanRedirect)}
    </div>
  );
};

ExploreIngredients.propTypes = {
  type: propTypes.string.isRequired,
};

export default ExploreIngredients;
