import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MealPage from './pages/MealPage';
import DrinkPage from './pages/DrinkPage';
import RecipeMealDetails from './pages/RecipeMealDetails';
import RecipeDrinkDetails from './pages/RecipeDrinkDetails';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreMeal from './pages/ExploreMeal';
import ExploreDrink from './pages/ExploreDrink';
import ExploreMealIngredients from './pages/ExploreMealIngredients';
import ExploreDrinksIngrendients from './pages/ExploreDrinksIngrendients';
import ExploreByOrigin from './pages/ExploreByOrigin';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import InProgressMeal from './pages/InProgressMeal';
import InProgressDrink from './pages/InProgressDrink';
import { RecipesAppContext } from './context/RecipesAppContext';

const renderSwitch = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/comidas" component={MealPage} />
    <Route exact path="/bebidas" component={DrinkPage} />
    <Route exact path="/perfil" component={Profile} />
    <Route exact path="/explorar" component={Explore} />
    <Route exact path="/receitas/comida/:id" component={RecipeMealDetails} />
    <Route exact path="/receitas/bebida/:id" component={RecipeDrinkDetails} />
    <Route exact path="/receitas/comida/:id/in-progress" component={InProgressMeal} />
    <Route exact path="/receitas/bebida/:id/in-progress" component={InProgressDrink} />
    <Route exact path="/receitas-feitas" component={DoneRecipes} />
    <Route exact path="/receitas-favoritas" component={FavoriteRecipes} />
    <Route exact path="/explorar/comidas" component={ExploreMeal} />
    <Route exact path="/explorar/bebidas" component={ExploreDrink} />
    <Route exact path="/explorar/comidas/ingredientes" component={ExploreMealIngredients} />
    <Route exact path="/explorar/bebidas/ingredientes" component={ExploreDrinksIngrendients} />
    <Route exact path="/explorar/comidas/area" component={ExploreByOrigin} />
    <Route component={NotFound} />
  </Switch>
);

function App() {
  const { displaySearchBar: [displaySearchBar], recipeType } = useContext(RecipesAppContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {displaySearchBar && <SearchBar recipeType={recipeType[0]} />}
        {renderSwitch()}
        <Footer />
      </BrowserRouter>
    </div>

  );
}

export default App;
