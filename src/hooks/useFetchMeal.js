import { useEffect, useContext } from 'react';
import { RecipesAppContext } from '../context/RecipesAppContext';
import {
  searchMealByName,
  searchAllMealsByFirstLetter,
  searchMealsByMainIngredient,
} from '../services/searchBarApi';

const selectFetch = (value, type) => {
  if (type === 'name') {
    searchMealByName(value)
      .then((data) => console.log(data));
  }
  if (type === 'ingredients') return searchMealsByMainIngredient(value);
  return searchAllMealsByFirstLetter(value);
};

const useFetchMeal = (value, type, canFetch) => {
  const {
    data: [recipes, setRecipes],
    loading: [, setIsLoading],
  } = useContext(RecipesAppContext);

  useEffect(() => {
    const fetchMeal = async () => {
      if (canFetch) {
        console.log(await selectFetch(value, type));

        setIsLoading(false);
      }
    };
    fetchMeal();
  }, [canFetch]);

  return recipes;
};

export default useFetchMeal;
