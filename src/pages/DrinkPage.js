import React, { useContext } from 'react';
import RecipesGenerator from '../components/RecipesGenerator';
import { RecipesAppContext } from '../context/RecipesAppContext';

const DrinkPage = () => {
  const { recipeType: [recipeType, setRecipeType] } = useContext(RecipesAppContext);
  if (recipeType !== 'Bebidas') setRecipeType('Bebidas');

  return (
    <div>
      <h1>Drink Page</h1>
      <div>
        {recipeType === 'Bebidas' && <RecipesGenerator />}
      </div>
    </div>
  );
};

export default DrinkPage;
