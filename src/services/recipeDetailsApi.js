const RECIPE_MEAL_DETAILS_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const RECIPE_DRINK_DETAILS_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const searchMealDetailsById = (mealId) => (
  fetch(`${RECIPE_MEAL_DETAILS_BY_ID}${mealId}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const searchDrinkDetailsById = (drinkId) => (
  fetch(`${RECIPE_DRINK_DETAILS_BY_ID}${drinkId}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
