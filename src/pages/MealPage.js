import React, { useContext } from 'react';
import RecipesGenerator from '../components/RecipesGenerator';
import { RecipesAppContext } from '../context/RecipesAppContext';

const MealPage = () => {
  const { recipeType: [recipeType, setRecipeType] } = useContext(RecipesAppContext);

  return (
    <div>
      <h1>Meal Page</h1>
      <div>
        {recipeType === 'Comidas' ? <RecipesGenerator /> : setRecipeType('Comidas')}
      </div>
    </div>
  );
};

export default MealPage;
