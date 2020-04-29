const SEARCH_MEAL_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_ALL_MEALS_BY_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const SEARCH_MEAL_BY_MAIN_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const SEARCH_DRINK_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const SEARCH_ALL_DRINKS_BY_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const SEARCH_DRINK_BY_MAIN_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

export const searchMealByName = (mealName) => (
  fetch(`${SEARCH_MEAL_BY_NAME}${mealName}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const fetchFoodAreas = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((data) => data)
);

export const searchFoodByArea = (area) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((response) => response.json())
    .then((data) => data)
);

export const searchAllMealsByFirstLetter = (mealFirstLetter) => (
  fetch(`${SEARCH_ALL_MEALS_BY_FIRST_LETTER}${mealFirstLetter}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const searchMealsByMainIngredient = (mealIngredient) => (
  fetch(`${SEARCH_MEAL_BY_MAIN_INGREDIENT}${mealIngredient}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const searchDrinkByName = (drinkName) => (
  fetch(`${SEARCH_DRINK_BY_NAME}${drinkName}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const searchAllDrinksByFirstLetter = (drinkFirstLetter) => (
  fetch(`${SEARCH_ALL_DRINKS_BY_FIRST_LETTER}${drinkFirstLetter}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const searchDrinksByMainIngredient = (drinkIngredient) => (
  fetch(`${SEARCH_DRINK_BY_MAIN_INGREDIENT}${drinkIngredient}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const getRandomRecipe = (recipeType) => {
  const typeSubstring = recipeType === 'Comidas' ? 'meal' : recipeType === 'Bebidas' && 'cocktail';
  return fetch(`https://www.the${typeSubstring}db.com/api/json/v1/1/random.php`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
};
