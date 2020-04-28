import React, { useContext } from 'react';
import { RecipesAppContext } from '../context/RecipesAppContext';
import FilterBarFoodOrDrinks from '../components/FilterBarFoodOrDrinks';
import HorizontalCard from '../components/HorizontalCard';
// import imagemTeste from '../images/imagemTeste.svg';

const setPageElements = (
  setHeaderTitle,
  setDisplayHeader,
  setDisplaySearchButton,
  setDisplayFooter,
) => {
  setHeaderTitle('Receitas Feitas');
  setDisplayHeader(true);
  setDisplaySearchButton(false);
  setDisplayFooter(false);
};

const getDoneRecipes = (filterFoodOrDrinks) => {
  const doneRecipes = JSON.parse(localStorage.getItem('done-recipes')) || [];

  switch (filterFoodOrDrinks) {
    case 'Food':
      return doneRecipes.filter(({ type }) => type === 'comida');
    case 'Drinks':
      return doneRecipes.filter(({ type }) => type === 'bebida');
    default:
      return doneRecipes;
  }
};

const DoneRecipes = () => {
  const {
    headerTitle: [, setHeaderTitle],
    displayHeader: [, setDisplayHeader],
    displaySearchButton: [, setDisplaySearchButton],
    displayFooter: [, setDisplayFooter],
    filterFoodOrDrinks: [filterFoodOrDrinks],
  } = useContext(RecipesAppContext);

  setPageElements(setHeaderTitle, setDisplayHeader, setDisplaySearchButton, setDisplayFooter);

  const doneRecipes = getDoneRecipes(filterFoodOrDrinks);

  return (
    <div>
      <FilterBarFoodOrDrinks />
      {doneRecipes.map((
        { type, id, image, name, category, area, alcoholicOrNot, doneDate, tags },
        index,
      ) => (
        <HorizontalCard
          index={index} type={type} id={id} image={image} name={name}
          category={category} area={area} alcoholicOrNot={alcoholicOrNot}
          doneDate={doneDate} tags={tags} key={id}
        />
      ))}
    </div>
  );
};

export default DoneRecipes;
