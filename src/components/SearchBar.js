import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { RecipesAppContext } from '../context/RecipesAppContext';
import {
  searchMealByName,
  searchAllMealsByFirstLetter,
  searchMealsByMainIngredient,
  searchDrinkByName,
  searchAllDrinksByFirstLetter,
  searchDrinksByMainIngredient,
} from '../services/searchBarApi';
import useDebounce from '../hooks/useDebounce';
import './SearchBar.css';

const selectMealFetch = (value, type) => {
  if (type === 'name') return searchMealByName(value);
  if (type === 'ingredient') {
    const newValue = value.split(' ').join('_').toLowerCase();
    return searchMealsByMainIngredient(newValue);
  }
  return searchAllMealsByFirstLetter(value);
};

const selectDrinkFetch = (value, type) => {
  if (type === 'name') return searchDrinkByName(value);
  if (type === 'ingredient') {
    const newValue = value.split(' ').join('_').toLowerCase();
    return searchDrinksByMainIngredient(newValue);
  }
  return searchAllDrinksByFirstLetter(value);
};

const renderInputText = (inputValue, setInputValue) => (
  <input
    className="search-input"
    type="text"
    data-testid="search-input"
    value={inputValue.text}
    onChange={({ target: { value } }) => setInputValue((prevState) => ({
      ...prevState,
      text: value,
    }))}
  />
);

const renderRadioButton = (radioValue, type, setInputValue) => (
  <label htmlFor={type}>
    <input
      data-testid={`${type}-search-radio`}
      type="radio"
      id={type}
      name="search"
      value={type}
      onClick={({ target: { value } }) => setInputValue((prevState) => ({
        ...prevState,
        radio: value,
      }))}
    />
    {radioValue}
  </label>
);

const redirectMealRecipes = (mealRecipes, didFetch, setInputValue) => {
  if ((mealRecipes === null || mealRecipes.length === 0) && didFetch) {
    setInputValue((prevState) => ({ ...prevState, didFetch: false }));
    alert('Não foi econtrado nenhum resultado de comida');
    return null;
  }
  if (mealRecipes.length === 1) return <Redirect to={`/receita/bebidas/${mealRecipes[0].idMeal}`} />;
  setInputValue((prevState) => ({ ...prevState, didFetch: false }));
  return null;
};

const redirectDrinkRecipes = (drinkRecipes, didFetch, setInputValue) => {
  if ((drinkRecipes === null || drinkRecipes.length === 0) && didFetch) {
    setInputValue((prevState) => ({ ...prevState, didFetch: false }));
    alert('Não foi econtrado nenhum resultado de bebida');
    return null;
  }
  if (drinkRecipes.length === 1) return <Redirect to={`/receita/bebidas/${drinkRecipes[0].idDrink}`} />;
  setInputValue((prevState) => ({ ...prevState, didFetch: false }));
  return null;
};

const callApi = (setIsLoading, setRecipes, setInputValue, text, radio, mealOrDrink) => {
  setIsLoading(true);
  if (mealOrDrink === 'Comidas') {
    return selectMealFetch(text, radio)
      .then(
        ({ meals }) => {
          console.log(meals);
          setRecipes(meals);
          setIsLoading(false);
        },
        () => {
          setRecipes([]);
          setIsLoading(false);
        },
      )
      .then(() => setInputValue((prevState) => ({ ...prevState, didFetch: true })));
  }

  return selectDrinkFetch(text, radio)
    .then(
      ({ drinks }) => {
        setRecipes(drinks);
        setIsLoading(false);
      },
      () => {
        setRecipes([]);
        setIsLoading(false);
      },
    )
    .then(() => setInputValue((prevState) => ({ ...prevState, didFetch: true })));
};

// const showRecipes = (recipes) => (
//   <div className="image-container">
//     {
//       (!recipes) ? null : recipes.map(({ strDrinkThumb, strDrink, strCategory }, index) => (
//         (index <= 11)
//           ? (
//             <div key={strDrink} className="recipe-content">
//               <img className="image-recipe" src={strDrinkThumb} alt="Foto" />
//               <h3 className="category-drink">{strCategory}</h3>
//               <p className="name-drink">{strDrink}</p>
//             </div>
//           )
//           : null
//       ))
//     }
//   </div>
// );

const SearchBar = () => {
  const [inputValue, setInputValue] = useState({ radio: '', text: '', didFetch: false });
  const {
    data: [recipes, setRecipes], loading: [, setIsLoading], recipeType: [recipeType],
  } = useContext(RecipesAppContext);
  const { text, radio } = useDebounce(inputValue.text, inputValue.radio, 600);

  useEffect(() => {
    if (text && radio) callApi(setIsLoading, setRecipes, setInputValue, text, radio, recipeType);
  }, [text, radio, setIsLoading, setRecipes, recipeType]);
  console.log('teste');
  if (inputValue.didFetch && recipeType === 'Comidas') {
    return redirectMealRecipes(recipes, inputValue.didFetch, setInputValue);
  }
  if (inputValue.didFetch && recipeType === 'Bebidas') {
    return redirectDrinkRecipes(recipes, inputValue.didFetch, setInputValue);
  }
  return (
    <div>
      <div className="search-bar-container">
        <div>
          {renderInputText(inputValue, setInputValue)}
        </div>
        <div className="input-radio-container">
          {renderRadioButton('Ingrediente', 'ingredient', setInputValue)}
          {renderRadioButton('Nome', 'name', setInputValue)}
          {renderRadioButton('Primeira Letra', 'first-letter', setInputValue)}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
