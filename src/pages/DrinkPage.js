import React, { useContext, useEffect, useState } from 'react';

import { RecipesAppContext } from '../context/RecipesAppContext';
import {
  listDrinkCategories,
  fetchDrinkByCategories,
  fetchDrinkByAllCategories,
} from '../services/drinkPageApis';
import '../styles/DrinkPage.css';

const fetchsCategories = async (setRecipes, category) => {
  if (category === 'All') {
    // setRecipes[recipes] ||
    const callFetch = async () => {
      await fetchDrinkByAllCategories()
        .then(({ drinks }) => {
          setRecipes((prevState) => [...prevState, ...drinks]);
        });
    };
    for (let i = 0; i < 12; i += 1) {
      callFetch();
    }
  } else {
    await fetchDrinkByCategories(category)
      .then(({ drinks }) => setRecipes(drinks));
  }
};


const setToggleAndRecipes = (
  toggleCategoryContext, data, category,
) => {
  const [toggleCategory, setToggleCategory] = toggleCategoryContext;
  const [, setRecipes] = data;
  if (!toggleCategory.toggleCat) fetchsCategories(setRecipes, category);
  setToggleCategory({
    category: (!toggleCategory.toggleCat) ? category : '',
    toggleCat: !toggleCategory.toggleCat,
  });
};

const renderCategories = (categories, toggleCategory, data, disabled = false) => (
  <div className="categories-container">
    <button
      className="category-button"
      type="button"
      data-testid="all-category-filter"
      disabled={(toggleCategory[0].category === 'All') ? disabled : toggleCategory[0].toggleCat}
      onClick={() => setToggleAndRecipes(toggleCategory, data, 'All')}
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
        onClick={() => (setToggleAndRecipes(toggleCategory, data, strCategory))}
      >
        {strCategory}
      </button>
    ))}
  </div>
);

const fetchCategories = async (setIsLoading, setCategories) => {
  setIsLoading(true);
  await listDrinkCategories()
    .then(
      (({ drinks }) => {
        setCategories(drinks);
        setIsLoading(false);
      }),
      () => setIsLoading(false),
    );
};

const DrinkPage = () => {
  const [categories, setCategories] = useState([]);
  const {
    loading: [isLoading, setIsLoading],
    toggleCategory,
    data,
    headerTitle: [, setHeaderTitle],
    displaySearchBar: [displaySearchBar],
  } = useContext(RecipesAppContext);
  useEffect(() => {
    const setToggleCategory = toggleCategory[1];
    setToggleCategory({ category: '', toggleCat: false });
    setHeaderTitle('Bebidas');
    fetchCategories(setIsLoading, setCategories);
  }, [setIsLoading, setHeaderTitle]);
  return (
    <div>
      {(isLoading)
        ? <div>Loading...</div>
        : displaySearchBar || renderCategories(categories, toggleCategory, data)}
    </div>
  );
};

export default DrinkPage;
