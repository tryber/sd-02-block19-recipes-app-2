import React, { useContext, useEffect, useState } from 'react';

import { RecipesAppContext } from '../context/RecipesAppContext';
import {
  listMealCategories,
  fetchMealByCategories,
  fetchMealByAllCategories,
} from '../services/mealPageApis';
import '../styles/MealPage.css';

const fetchsCategories = async (setRecipesByCategory, category) => {
  if (category === 'All') {
    // setRecipesByCategory[recipes] ||
    const callFetch = async () => {
      await fetchMealByAllCategories()
        .then(({ meals }) => {
          setRecipesByCategory((prevState) => [...prevState, ...meals]);
        });
    };
    for (let i = 0; i < 12; i += 1) {
      callFetch();
    }
  } else {
    await fetchMealByCategories(category)
      .then(({ meals }) => setRecipesByCategory(meals));
  }
};


const setToggleAndRecipes = (
  toggleCategoryContext, recipesByCategoryContext, category,
) => {
  const [toggleCategory, setToggleCategory] = toggleCategoryContext;
  const [, setRecipesByCategory] = recipesByCategoryContext;
  if (!toggleCategory.toggleCat) fetchsCategories(setRecipesByCategory, category);
  setToggleCategory({
    category: (!toggleCategory.toggleCat) ? category : '',
    toggleCat: !toggleCategory.toggleCat,
  });
};

const renderCategories = (categories, toggleCategory, recipesByCategory, disabled = false) => (
  <div className="categories-container">
    <button
      className="category-button"
      type="button"
      data-testid="all-category-filter"
      disabled={(toggleCategory[0].category === 'All') ? disabled : toggleCategory[0].toggleCat}
      onClick={() => setToggleAndRecipes(toggleCategory, recipesByCategory, 'All')}
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
        onClick={() => (setToggleAndRecipes(toggleCategory, recipesByCategory, strCategory))}
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
        setIsLoading(false);
      }),
      () => setIsLoading(false),
    );
};

const MealPage = () => {
  const [categories, setCategories] = useState([]);
  const {
    loading: [isLoading, setIsLoading],
    toggleCategory,
    recipesByCategory,
    recipeType: [, setRecipeType],
  } = useContext(RecipesAppContext);
  useEffect(() => {
    const setToggleCategory = toggleCategory[1];
    setToggleCategory({ category: '', toggleCat: false });
    setRecipeType('Comidas');
    fetchCategories(setIsLoading, setCategories);
  }, [setIsLoading, setRecipeType]);
  return (
    <div>
      {(isLoading)
        ? <div>Loading...</div>
        : renderCategories(categories, toggleCategory, recipesByCategory)}
    </div>
  );
};

export default MealPage;
