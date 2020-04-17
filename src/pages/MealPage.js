import React, { useEffect, useContext } from 'react';
import RecipesGenerator from '../components/RecipesGenerator';
import { RecipesAppContext } from '../context/RecipesAppContext';

const MealPage = () => {
  const { recipeType: [, setRecipeType] } = useContext(RecipesAppContext);

  useEffect(() => setRecipeType('Comidas'), [setRecipeType]);

  return (
    <div>
      <h1>Meal Page</h1>
      <div>
        <RecipesGenerator />
      </div>
    </div>
  );
};

export default MealPage;
