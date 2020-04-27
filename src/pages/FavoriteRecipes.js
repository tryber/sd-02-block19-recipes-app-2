import React, { useContext } from 'react';
import { RecipesAppContext } from '../context/RecipesAppContext';
import FilterBarFoodOrDrinks from '../components/FilterBarFoodOrDrinks';
import HorizontalCard from '../components/HorizontalCard';
// import imagemTeste from '../images/imagemTeste.svg'

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

const filterFavoriteRecipes = (favoriteRecipes, filterFoodOrDrinks) => {
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
    favoriteRecipes: [favoriteRecipes],
  } = useContext(RecipesAppContext);

  setPageElements(setHeaderTitle, setDisplayHeader, setDisplaySearchButton, setDisplayFooter);

  const filteredFavoriteRecipes = filterFavoriteRecipes(favoriteRecipes, filterFoodOrDrinks);

  return (
    <div>
      <FilterBarFoodOrDrinks />
      {filteredFavoriteRecipes.map((
        { type, id, image, name, category, area, alcoholicOrNot, doneDate, tags },
        index,
      ) => (
        <HorizontalCard
          index={index} type={type} id={id}
          image={image}
          name={name} category={category} area={area} alcoholicOrNot={alcoholicOrNot}
          doneDate={doneDate} tags={tags}
        />
      ))}
      {/* <HorizontalCard
          index={7} type={'comida'} id={'oooiiii'}
          image={imagemTeste}
          name={'ooooiii'} category={'ooiiii'} area={'aaaiiii'} alcoholicOrNot={'eeiiii'}
          doneDate={null} tags={['cachaça', 'bebida']}
        />
        <HorizontalCard
          index={3} type={'bebida'} id={'nada'}
          image={imagemTeste}
          name={'nada'} category={'nada'} area={'nenhum lugar'} alcoholicOrNot={'beber é bom'}
          doneDate={undefined} tags={null}
        /> */
      }
    </div>
  );
};

export default FavoriteRecipes;
