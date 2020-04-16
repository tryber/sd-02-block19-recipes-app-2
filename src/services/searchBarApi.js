const SEARCH_MEAL_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_ALL_MEALS_BY_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const SEARCH_MEAL_BY_MAIN_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

export const searchMealByName = (name) => (
  fetch(`${SEARCH_MEAL_BY_NAME}${name}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const searchAllMealsByFirstLetter = (firstLetter) => (
  fetch(`${SEARCH_ALL_MEALS_BY_FIRST_LETTER}${firstLetter}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const searchMealsByMainIngredient = (ingredient) => (
  fetch(`${SEARCH_MEAL_BY_MAIN_INGREDIENT}${ingredient}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
