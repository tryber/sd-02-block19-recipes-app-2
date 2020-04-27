import React from 'react';
import HorizontalCard from '../components/HorizontalCard';
import imagemTeste from '../images/imagemTeste.svg';
import FilterBarFoodOrDrinks from '../components/FilterBarFoodOrDrinks';

const DoneRecipes = () => (
  <div>
    <h1>Done Recipes Page</h1>
    <FilterBarFoodOrDrinks />
    <HorizontalCard
      index={1} type="comida" id="453"
      image={imagemTeste}
      name="Chelsea Buns" category="Dessert" area="British" alcoholicOrNot="Alcoholic Drink"
      doneDate="01/12/2019" tags={['bun', 'baking']}
    />
  </div>
);

export default DoneRecipes;
