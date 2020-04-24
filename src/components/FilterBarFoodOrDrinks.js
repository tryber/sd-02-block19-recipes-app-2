import React, { useContext, useEffect } from 'react';
import { RecipesAppContext } from '../context/RecipesAppContext';
import '../styles/FilterBarFoodOrDrinks.css';

const FilterBarFoodOrDrinks = () => {
  const filters = ['All', 'Food', 'Drinks'];
  const { filterFoodOrDrinks: [, setFilterFoodOrDrinks] } = useContext(RecipesAppContext);

  useEffect(
    () => () => {
      setFilterFoodOrDrinks('All');
    },
    [setFilterFoodOrDrinks],
  );

  const changeFilter = ({ target }) => {
    const { innerText } = target;
    setFilterFoodOrDrinks(innerText);
  };

  const renderButtons = () => (
    <div className="filter-bar">
      {filters.map((item) => <button key={item} onClick={changeFilter}>{item}</button>)}
    </div>
  );

  return renderButtons();
};

export default FilterBarFoodOrDrinks;
