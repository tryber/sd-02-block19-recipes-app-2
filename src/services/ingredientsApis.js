const MEAL_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINK_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';


export const listMealIngredients = () => (
  fetch(`${MEAL_INGREDIENTS}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const listDrinkIngredients = () => (
  fetch(`${DRINK_INGREDIENTS}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
