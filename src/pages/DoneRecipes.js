import React from 'react';
import { Link } from 'react-router-dom'
import FilterBarFoodOrDrinks from '../components/FilterBarFoodOrDrinks'

const DoneRecipes = () => (
  <div>
    <h1>Done Recipes Page</h1>
    <FilterBarFoodOrDrinks />
    <Link to="/perfil">perfil</Link>
  </div>
);

export default DoneRecipes;
