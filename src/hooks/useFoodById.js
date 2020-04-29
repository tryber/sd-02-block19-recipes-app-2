import { useEffect, useContext } from 'react';
import { searchMealDetailsById, searchDrinkDetailsById } from '../services/recipeDetailsApi';
import { RecipesAppContext } from '../context/RecipesAppContext';

const useFoodById = (id, typeFood) => {
  const { recipeDetails: [recipeDetails, setDetailsRecipe] } = useContext(RecipesAppContext);

  useEffect(() => {
    const fetchFoodById = async () => {
      switch (typeFood) {
        case 'Meal':
          return searchMealDetailsById(id)
            .then(
              (({ meals }) => {
                setDetailsRecipe(meals);
              }),
              () => console.log('error'),
            );
        default:
          return searchDrinkDetailsById(id)
            .then(
              (({ drinks }) => {
                setDetailsRecipe(drinks);
              }),
              () => console.log('error'),
            );
      }
    };
    fetchFoodById();
  }, [typeFood, id, setDetailsRecipe]);

  return recipeDetails;
};

export default useFoodById;
