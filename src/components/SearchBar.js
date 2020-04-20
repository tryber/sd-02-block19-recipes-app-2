import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import '../styles/SearchBar.css';

const fetchRecipes = (recipeType, searchString, searchType) => {
  const newValue = searchString.split(' ').join('_').toLowerCase();
  if (recipeType === 'Comidas') {
    switch (searchType) {
      case 'name':
        return searchMealByName(searchString);
      case 'ingredient':
        return searchMealsByMainIngredient(newValue);
      default:
        return searchAllMealsByFirstLetter(searchString);
    }
  }
  switch (searchType) {
    case 'name':
      return searchDrinkByName(searchString);
    case 'ingredient':
      return searchDrinksByMainIngredient(newValue);
    default:
      return searchAllDrinksByFirstLetter(searchString);
  }
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

const redirectMealRecipes = (mealRecipes, setInputValue) => {
  setInputValue((prevState) => ({ ...prevState, didFetch: false }));
  if ((mealRecipes === null || mealRecipes === undefined)) {
    return alert('Não foi encontrado nenhum resultado de comida');
  }
  if (mealRecipes.length === 1) return <Redirect to={`/receita/comidas/${mealRecipes[0].idMeal}`} />;
  return <Redirect to="/comidas" />;
};

const redirectDrinkRecipes = (drinkRecipes, setInputValue) => {
  setInputValue((prevState) => ({ ...prevState, didFetch: false }));
  if ((drinkRecipes === null || drinkRecipes.length === 0)) {
    return alert('Não foi encontrado nenhum resultado de bebida');
  }
  if (drinkRecipes.length === 1) return <Redirect to={`/receita/bebidas/${drinkRecipes[0].idDrink}`} />;
  return <Redirect to="/bebidas" />;
};

const RenderInputItems = ({ inputValue, setInputValue }) => (
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

const SearchBar = () => {
  const {
    data: [recipes, setRecipes],
    loading: [, setIsLoading],
    recipeType: [recipeType],
    isSearching: [, setIsSearching],
    inputValue: [inputValue, setInputValue],
    // headerTitle: [headerTitle],
  } = useContext(RecipesAppContext);

  const { text, radio } = useDebounce(inputValue.text, inputValue.radio, 600);
  const { didFetch } = inputValue;

  if (didFetch && recipeType === 'Comidas') {
    redirectMealRecipes(recipes, setInputValue);
  }
  if (didFetch && recipeType === 'Bebidas') {
    redirectDrinkRecipes(recipes, setInputValue);
  }

  if ((text === '' || radio === '') && !didFetch) setIsSearching(false);

  useEffect(() => {
    const callApi = async () => {
      setIsLoading(true);
      setIsSearching(true);
      return fetchRecipes(recipeType, text, radio)
        .then((recipe) => {
          setIsLoading(false);
          return recipe.meals ? setRecipes(recipe.meals) : setRecipes(recipe.drinks);
        }, () => {
          setRecipes([]);
          setIsLoading(false);
        })
        .then(() => setInputValue((prevState) => ({ ...prevState, didFetch: true })));
    };
    if (text && radio && !didFetch) callApi();
    return (() => setInputValue((prevState) => ({ ...prevState, didFetch: false })));
  }, [text, radio, setIsLoading, setIsSearching, setRecipes, recipeType, setInputValue, didFetch]);

  return <RenderInputItems inputValue={inputValue} setInputValue={setInputValue} />;
};

export default SearchBar;

RenderInputItems.propTypes = {
  inputValue: PropTypes.shape({
    text: PropTypes.string.isRequired,
    radio: PropTypes.string.isRequired,
    didFetch: PropTypes.bool.isRequired,
  }).isRequired,
  setInputValue: PropTypes.func.isRequired,
};
