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
import ExploreMealArea from './pages/ExploreMealArea';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { RecipesAppContext } from './context/RecipesAppContext';

function App() {
  const { displaySearchBar: [displaySearchBar] } = useContext(RecipesAppContext);
  return (
    <div className="App">
      <BrowserRouter>
        {<Header />}
        {displaySearchBar && <SearchBar />}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/comidas" component={MealPage} />
          <Route exact path="/bebidas" component={DrinkPage} />
          <Route exact path="/perfil" component={Profile} />
          <Route exact path="/explorar" component={Explore} />
          <Route exact path="/receitas/comida/:id-da-receita" component={RecipeMealDetails} />
          <Route exact path="/receitas/bebidas/:id-da-receita" component={RecipeDrinkDetails} />
          <Route exact path="/receitas-feitas" component={DoneRecipes} />
          <Route exact path="/receitas-favoritas" component={FavoriteRecipes} />
          <Route exact path="/explorar/comidas" component={ExploreMeal} />
          <Route exact path="/explorar/bebidas" component={ExploreDrink} />
          <Route exact path="/explorar/comidas/ingredients" component={ExploreMealIngredients} />
          <Route exact path="/explorar/bebidas/ingredients" component={ExploreDrinksIngrendients} />
          <Route exact path="/explorar/comidas/area" component={ExploreMealArea} />
          <Route component={NotFound} />
        </Switch>
        {<Footer />}
      </BrowserRouter>
    </div>

  );
}

export default App;
