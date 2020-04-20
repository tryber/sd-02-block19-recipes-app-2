const LIST_ALL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const MEALS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const MEALS_BY_ALLCATEGORY = 'https://www.themealdb.com/api/json/v1/1/random.php';


export const listMealCategories = () => (
  fetch(`${LIST_ALL_CATEGORIES}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const fetchMealByCategories = (category) => (
  fetch(`${MEALS_BY_CATEGORY}${category}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const fetchMealByAllCategories = () => (
  fetch(`${MEALS_BY_ALLCATEGORY}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
