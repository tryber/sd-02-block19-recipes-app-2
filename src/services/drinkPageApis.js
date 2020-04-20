const LIST_ALL_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const DRINKS_BY_ALLCATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';


export const listDrinkCategories = () => (
  fetch(`${LIST_ALL_CATEGORIES}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const fetchDrinkByCategories = (category) => (
  fetch(`${DRINKS_BY_CATEGORY}${category}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const fetchDrinkByAllCategories = () => (
  fetch(`${DRINKS_BY_ALLCATEGORY}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
