import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { RecipesAppContext } from '../context/RecipesAppContext';

const addIdLocalStorage = (id, inProgress, setCanRedirectProgress) => {
  if (!inProgress) {
    const arrayId = JSON.parse(localStorage.getItem('in-progress')) || [];
    arrayId.push(id);
    localStorage.setItem('in-progress', JSON.stringify(arrayId));
  }
  setCanRedirectProgress(true);
};

const addDoneRecipesLocalStorage = (recipe, type, typeFood) => {
  const recipeArray = JSON.parse(localStorage.getItem('done-recipes')) || [];
  const existArray = recipeArray.some(({ id }) => id === recipe[0][`id${typeFood}`]);
  const newDate = new Date();
  const details = {
    type,
    id: recipe[0][`id${typeFood}`],
    image: recipe[0][`str${typeFood}Thumb`],
    name: recipe[0][`str${typeFood}`],
    category: recipe[0].strCategory,
    area: recipe[0].strArea,
    alcoholicOrNot: recipe[0].strAlcoholic,
    doneDate: `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`,
    tags: (recipe[0].strTags) ? recipe[0].strTags.split(',').slice(0, 2) : null,
  };
  if (!existArray) localStorage.setItem('done-recipes', JSON.stringify([...recipeArray, details]));
};

const buttonName = (inProgress) => ((inProgress) ? 'Continuar Receita' : 'Iniciar Receita');

const endRecipe = (target, setCanRedirectDone, setCanRedirectProgress) => {
  if (target.innerHTML === 'Finalizar Receita') return setCanRedirectDone(true);
  return setCanRedirectProgress(true);
};

const CurrentDetailsButton = ({
  id, typeFood, renderInProgress, recipe,
}) => {
  const [canRedirectDone, setCanRedirectDone] = useState(false);
  const [canRedirectProgress, setCanRedirectProgress] = useState(false);
  const type = (typeFood === 'Meal') ? 'comida' : 'bebida';
  const recipeArray = JSON.parse(localStorage.getItem('done-recipes')) || [];
  const existArray = recipeArray.some((ele) => ele.id === recipe[0][`id${typeFood}`]);
  const inProgress = (JSON.parse(localStorage.getItem('in-progress')) || [])
    .some((inProgressId) => inProgressId === Number(id));
  const {
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter], disabled,
  } = useContext(RecipesAppContext);
  useEffect(() => {
    setDisplayHeader(false);
    setDisplayFooter(false);
  }, [setDisplayFooter, setDisplayHeader]);
  if (canRedirectDone) {
    addDoneRecipesLocalStorage(recipe, type, typeFood);
    return <Redirect to="/receitas-feitas" />;
  }
  if (canRedirectProgress) return <Redirect to={`/receitas/${type}/${id}/in-progress`} />;
  return (existArray) || (
    <div className="start-button-container">
      <button
        disabled={(renderInProgress) ? disabled[0] : false}
        className="start-button"
        data-testid="start-recipe-btn"
        type="button"
        onClick={({ target }) => (
          (inProgress)
            ? endRecipe(target, setCanRedirectDone, setCanRedirectProgress, recipe)
            : addIdLocalStorage(id, inProgress, setCanRedirectProgress))}
      >
        {(renderInProgress)
          ? 'Finalizar Receita'
          : buttonName(inProgress)}
      </button>
    </div>
  );
};

CurrentDetailsButton.propTypes = {
  id: propTypes.number.isRequired,
  typeFood: propTypes.string.isRequired,
  renderInProgress: propTypes.bool.isRequired,
  recipe: propTypes.instanceOf(Array),
};

CurrentDetailsButton.defaultProps = {
  recipe: [],
};

export default CurrentDetailsButton;
