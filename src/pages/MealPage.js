import React, { useContext, useEffect } from 'react';
import {
  listMealCategories,
  fetchMealByCategories,
  fetchMealByAllCategories,
} from '../services/mealPageApis';
import '../styles/MealPage.css';
import RenderRecipePage from '../components/RenderRecipePage';
import { RecipesAppContext } from '../context/RecipesAppContext';


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
  setRecipes([]);
  setIsFetching(false);
};

const renderCategories = (
  categories, toggleCategory, setRecipes, setIsFetching, setIsFiltering, disabled = false,
) => (
  <div className="categories-container">
    <button
      className="category-button"
      type="button"
      data-testid="all-category-filter"
      // disabled={(toggleCategory[0].category === 'All') ? disabled : toggleCategory[0].toggleCat}
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
  await listMealCategories()
    .then(
      (({ meals }) => {
        setCategories(meals);
      }),
      (err) => console.log(err),
    );
};

const MealPage = () => {
  const {
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter],
  } = useContext(RecipesAppContext);
  useEffect(() => {
    setDisplayHeader(true);
    setDisplayFooter(true);
  }, [setDisplayFooter, setDisplayHeader]);
  return (
    <RenderRecipePage
      kindOfRecipe="Comidas"
      fetchCategories={fetchCategories}
      renderCategories={renderCategories}
    />
  );
};

export default MealPage;
