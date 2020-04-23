import React, { useContext, useEffect } from 'react';

import {
  listDrinkCategories,
  fetchDrinkByCategories,
  fetchDrinkByAllCategories,
} from '../services/drinkPageApis';
import RenderRecipePage from '../components/RenderRecipePage';
import '../styles/DrinkPage.css';
import { RecipesAppContext } from '../context/RecipesAppContext';

const fetchsCategories = async (setRecipes, category) => {
  if (category === 'All') {
    setRecipes([]);
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
  toggleCategoryContext, setRecipes, category, setIsFetching,
) => {
  const [toggleCategory, setToggleCategory] = toggleCategoryContext;
  if (!toggleCategory.toggleCat) fetchsCategories(setRecipes, category);
  setToggleCategory({
    category: (!toggleCategory.toggleCat) ? category : '',
    toggleCat: !toggleCategory.toggleCat,
  });
  setIsFetching(false);
  //setRecipes([]);
};

const renderCategories = (
  categories, toggleCategory, setRecipes, setIsFetching, setIsFiltering, disabled = false,
) => (
  <div className="categories-container">
    <button
      className="category-button"
      type="button"
      data-testid="all-category-filter"
      disabled={(toggleCategory[0].category === 'All') ? disabled : toggleCategory[0].toggleCat}
      onClick={() => {
        setToggleAndRecipes(toggleCategory, setRecipes, 'All', setIsFetching);
        setIsFiltering((prevState) => (!prevState));
      }}
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
        onClick={() => {
          setToggleAndRecipes(toggleCategory, setRecipes, strCategory, setIsFetching);
          setIsFiltering((prevState) => (!prevState));
        }}
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
      }),
      (err) => console.log(err),
    );
};

const DrinkPage = () => {
  const {
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter],
  } = useContext(RecipesAppContext);
  useEffect(() => {
    setDisplayHeader(true);
    setDisplayFooter(true);
  }, [setDisplayFooter, setDisplayHeader]);
  return (
    <RenderRecipePage
      kindOfRecipe="Bebidas"
      fetchCategories={fetchCategories}
      renderCategories={renderCategories}
    />
  );
};

export default DrinkPage;
