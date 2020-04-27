import { useState, useEffect, useContext } from 'react';
import { searchFoodByArea } from '../services/searchBarApi';
import { RecipesAppContext } from '../context/RecipesAppContext';

export default function useFilterByOrigin(recipes, originFilter, setIsLoading) {
  const {
    filtering: [isFiltering],
  } = useContext(RecipesAppContext);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  console.log(originFilter);
  useEffect(() => {
    async function fetchFoodPerArea() {
      const recipesPerOriginFilter = await searchFoodByArea(originFilter)
        .then(({ meals }) => meals);
      setFilteredRecipes(recipesPerOriginFilter);
      setIsLoading(false);
    }
    console.log('is Filtering? ', isFiltering);
    if (originFilter !== 'All' && !isFiltering) fetchFoodPerArea();
  }, [originFilter, recipes, isFiltering]);

  console.log('receitas filtradas: ', filteredRecipes);

  return filteredRecipes;
}
