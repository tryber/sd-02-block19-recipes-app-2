import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { RecipesAppContext } from '../context/RecipesAppContext';
import {
  searchMealByName,
  searchAllMealsByFirstLetter,
  searchMealsByMainIngredient,
} from '../services/searchBarApi';
import useDebounce from '../hooks/useDebounce';
import './SearchBar.css';

const selectFetch = (value, type) => {
  if (type === 'name') return searchMealByName(value);
  if (type === 'ingredient') {
    const newValue = value.split(' ').join('_').toLowerCase();
    return searchMealsByMainIngredient(newValue);
  }
  return searchAllMealsByFirstLetter(value);
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

const renderByRecipes = (recipes, didFetch, setInputValue) => {
  if ((recipes.length === 0) && didFetch) {
    setInputValue((prevState) => ({ ...prevState, didFetch: false }));
    return alert('Não foi econtrado nenhum resultado');
  }
  if (recipes.length === 1) return <Redirect to={`/receita/comida/${recipes[0].idMeal}`} />;
  return recipes;
};

const SearchBar = () => {
  const [inputValue, setInputValue] = useState({ radio: '', text: '', didFetch: false });
  const { data: [recipes, setRecipes], loading: [, setIsLoading] } = useContext(RecipesAppContext);
  const { text, radio } = useDebounce(inputValue.text, inputValue.radio, 600);
  useEffect(() => {
    if (text && radio) {
      setIsLoading(true);
      selectFetch(text, radio)
        .then(({ meals }) => {
          setRecipes(meals || []);
          setIsLoading(false);
          setInputValue((prevState) => ({ ...prevState, didFetch: true }));
        });
    }
  }, [text, radio]);
  console.log(recipes);
  if (recipes.length <= 1 && inputValue.didFetch) {
    return renderByRecipes(recipes, inputValue.didFetch, setInputValue);
  }
  return (
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
  );
};

export default SearchBar;
