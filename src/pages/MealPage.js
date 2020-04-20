import React, { useContext, useEffect, useState } from 'react';

import { RecipesAppContext } from '../context/RecipesAppContext';
import {
  listMealCategories,
  fetchMealByCategories,
  fetchMealByAllCategories,
} from '../services/mealPageApis';
import '../styles/MealPage.css';
import RecipesGenerator from '../components/RecipesGenerator';

const fetchsCategories = async (setRecipes, category) => {
  if (category === 'All') {
    setRecipes([]);
    const callFetch = async () => {
      await fetchMealByAllCategories()
        .then(({ meals }) => {
          setRecipes((prevState) => [...prevState, ...meals]);
        });
    };
    for (let i = 0; i < 12; i += 1) {
      callFetch();
    }
  } else {
    await fetchMealByCategories(category)
      .then(({ meals }) => setRecipes(meals));
  }
};


const setToggleAndRecipes = (
  toggleCategoryContext, setRecipes, category, setIsFetching,
) => {
  const [toggleCategory, setToggleCategory] = toggleCategoryContext;
  if (!toggleCategory.toggleCat) fetchsCategories(setRecipes, category);
  setToggleCategory({
    category: (!toggleCategory.toggleCat) ? category : '',
    toggleCat: !toggleCategory.toggleCat,
  });
  setIsFetching(false);
  setRecipes([]);
};

const renderCategories = (
  categories, toggleCategory, setRecipes, setIsFetching, disabled = false,
) => (
  <div className="categories-container">
    <button
      className="category-button"
      type="button"
      data-testid="all-category-filter"
      disabled={(toggleCategory[0].category === 'All') ? disabled : toggleCategory[0].toggleCat}
      onClick={() => setToggleAndRecipes(toggleCategory, setRecipes, 'All', setIsFetching)}
    >
      All
    </button>
    {categories.slice(0, 5).map(({ strCategory }) => (
      <button
        className="category-button"
        key={strCategory}
        type="button"
        data-testid={`${strCategory}-category-filter`}
        disabled={
          (toggleCategory[0].category === strCategory) ? disabled : toggleCategory[0].toggleCat
        }
        onClick={() => (
          setToggleAndRecipes(toggleCategory, setRecipes, strCategory, setIsFetching))}
      >
        {strCategory}
      </button>
    ))}
  </div>
);

const fetchCategories = async (setIsLoading, setCategories) => {
  setIsLoading(true);
  await listMealCategories()
    .then(
      (({ meals }) => {
        setCategories(meals);
      }),
      (err) => console.log(err),
    );
};

const MealPage = () => {
  const [categories, setCategories] = useState([]);
  const {
    loading: [isLoading, setIsLoading],
    toggleCategory,
    toggleCategory: [, setToggleCategory],
    data: [, setRecipes],
    headerTitle: [, setHeaderTitle],
    fetchingStatus: [, setIsFetching],
    recipeType: [recipeType, setRecipeType],
  } = useContext(RecipesAppContext);

  if (recipeType !== 'Comidas') setRecipeType('Comidas');

  useEffect(() => {
    setToggleCategory({ category: '', toggleCat: false });
    setHeaderTitle('Comidas');
    fetchCategories(setIsLoading, setCategories);
    return (() => {
      setToggleCategory({ category: '', toggleCat: false });
      setIsFetching(false);
    });
  }, [setIsLoading, setHeaderTitle, setIsFetching, setToggleCategory]);
  return (
    <div>
      <nav>
        {categories && renderCategories(categories, toggleCategory, setRecipes, setIsFetching)}
      </nav>
      {(isLoading) && <div>Loading...</div>}
      <RecipesGenerator recipeType="Comidas" />
    </div>
  );
};

export default MealPage;
