import React, { useContext, useEffect } from 'react';
import { RecipesAppContext } from '../context/RecipesAppContext';
import '../styles/FilterBarFoodOrDrinks.css';

const FilterBarFoodOrDrinks = () => {
  const { filterFoodOrDrinks: [, setFilterFoodOrDrinks] } = useContext(RecipesAppContext);

  useEffect(
    () => () => {
      setFilterFoodOrDrinks('All');
    },
    [setFilterFoodOrDrinks],
  );

  const changeFilter = ({ target }) => {
    const { innerHTML } = target;
    setFilterFoodOrDrinks(innerHTML);
  };

  const renderButtons = () => (
    <div className="filter-bar">
      <button onClick={changeFilter} data-testid="filter-by-all-btn">All</button>
      <button onClick={changeFilter} data-testid="filter-by-food-btn">Food</button>
      <button onClick={changeFilter} data-testid="filter-by-drink-btn">Drinks</button>
    </div>
  );

  return renderButtons();
};

export default FilterBarFoodOrDrinks;
