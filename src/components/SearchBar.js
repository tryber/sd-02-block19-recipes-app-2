import React, { useState, useEffect } from 'react';

import './SearchBar.css';
import useDebounce from '../hooks/useDebounce';
import useFetchMeal from '../hooks/useFetchMeal';
import {
  searchMealByName,
} from '../services/searchBarApi';

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
  <label forhtml={type}>
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

const SearchBar = () => {
  const [inputValue, setInputValue] = useState({
    radio: '',
    text: '',
    canFecth: false,
  });

  const debouncedInputValue = useDebounce(inputValue.text, 600);
  const teste = useFetchMeal(inputValue.text, inputValue.radio, inputValue.canFecth);

  useEffect(() => {
    const fetchName = async () => {
      await searchMealByName('Arrabiata')
        .then(
          (data) => console.log('didMount :', data),
          (err) => console.log(err),
        );
    };
    fetchName();
  }, []);

  useEffect(() => {
    if (debouncedInputValue && inputValue.radio) {
      setInputValue((prevState) => (
        {
          ...prevState,
          canFecth: true,
        }
      ));
    }
  }, [debouncedInputValue, inputValue.radio]);

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
