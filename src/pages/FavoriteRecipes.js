import React, { useContext } from 'react';
import { RecipesAppContext } from '../context/RecipesAppContext';
// import FilterBarFoodOrDrinks from '../components/FilterBarFoodOrDrinks';
// import HorizontalCard from '../components/HorizontalCard';

const setPageElements = (
  setHeaderTitle,
  setDisplayHeader,
  setDisplaySearchButton,
  setDisplayFooter,
) => {
  setHeaderTitle('Receitas Favoritas');
  setDisplayHeader(true);
  setDisplaySearchButton(false);
  setDisplayFooter(false);
};

const getFavoriteRecipes = (filterFoodOrDrinks) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  switch (filterFoodOrDrinks) {
    case 'Food':
      return favoriteRecipes.filter(({ type }) => type === 'comida');
    case 'Drinks':
      return favoriteRecipes.filter(({ type }) => type === 'bebida');
    default:
      return favoriteRecipes;
  }
};

const FavoriteRecipes = () => {
  const {
    headerTitle: [, setHeaderTitle],
    displayHeader: [, setDisplayHeader],
    displaySearchButton: [, setDisplaySearchButton],
    displayFooter: [, setDisplayFooter],
    filterFoodOrDrinks: [filterFoodOrDrinks],
  } = useContext(RecipesAppContext);

  setPageElements(setHeaderTitle, setDisplayHeader, setDisplaySearchButton, setDisplayFooter);

  const favoriteRecipes = getFavoriteRecipes(filterFoodOrDrinks);

  return (
    <div>
      {/* <FilterBarFoodOrDrinks /> */}
      {favoriteRecipes.map((
        { type, id, image, name, category, area, alcoholicOrNot, doneDate, tags },
        index,
      ) => (
        {/* <HorizontalCard
          index={1} type="comida" id="453"
          image={imagemTeste}
          name="Chelsea Buns" category="Dessert" area="British" alcoholicOrNot="Alcoholic Drink"
          doneDate="01/12/2019" tags={['bun', 'baking']}
        /> */}
      ))}
    </div>
  );
};

export default FavoriteRecipes;
