import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CocktailIcon from '../images/cocktailIcon.svg';
import ExplorerIcon from '../images/explorerIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import { RecipesAppContext } from '../context/RecipesAppContext';
import '../styles/Footer.css';

export default function Footer() {
  const {
    displayFooter: [displayFooter],
  } = useContext(RecipesAppContext);

  return displayFooter ? (
    <div className="footer-container">
      <nav>
        <div>
          <Link to="/bebidas">
            <img data-testid="drinks-bottom-btn" src={CocktailIcon} alt="Ícone de Bebidas" />
          </Link>
        </div>
        <div>
          <Link to="/explorar">
            <img data-testid="explore-bottom-btn" src={ExplorerIcon} alt="Ícone do Explorador" />
          </Link>
        </div>
        <div>
          <Link to="/comidas">
            <img data-testid="food-bottom-btn" src={MealIcon} alt="Ícone de Comidas" />
          </Link>
        </div>
      </nav>
    </div>
  ) : null;
}
