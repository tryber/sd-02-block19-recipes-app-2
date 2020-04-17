import React, { useContext, useEffect } from 'react';
import RecipesGenerator from '../components/RecipesGenerator';
import { RecipesAppContext } from '../context/RecipesAppContext';

const DrinkPage = () => {
  const { recipeType: [, setRecipeType] } = useContext(RecipesAppContext);

  useEffect(() => setRecipeType('Bebidas'), [setRecipeType]);

  return (
    <div>
      <h1>Drinks Page</h1>
      <div>
        <RecipesGenerator />
      </div>
    </div>
  );
};

export default DrinkPage;
