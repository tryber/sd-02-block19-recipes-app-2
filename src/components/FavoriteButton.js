import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import { RecipesAppContext } from '../context/RecipesAppContext';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteButton.css';

const changeState = (
  isFavorite, setIsFavorite, favoriteRecipes, setFavoriteRecipes,
  id, category, image, area, name, alcoholicOrNot, type,
) => {
  const inFavoriteRecipes = document.URL.includes('receitas-favoritas');
  const newState = inFavoriteRecipes ? true : !isFavorite;

  const newFavoriteRecipes = (
    isFavorite ?
    favoriteRecipes.filter((item) => item.id !== id) :
    [...favoriteRecipes, { id, category, image, area, name, alcoholicOrNot, type }]
  );

  setIsFavorite(newState);
  setFavoriteRecipes(newFavoriteRecipes);

  localStorage.setItem('favorite-recipes', JSON.stringify(newFavoriteRecipes));
};

const FavoriteButton = ({
  index, id, category, image, area, name, alcoholicOrNot, type,
}) => {
  const { favoriteRecipes: [favoriteRecipes, setFavoriteRecipes] } = useContext(RecipesAppContext);

  const initialState = favoriteRecipes.some((item) => item.id === id);
  const [isFavorite, setIsFavorite] = useState(initialState);

  return (
    <div className="favorite-button">
      <button
        type="button"
        onClick={() => (
          changeState(
            isFavorite, setIsFavorite, favoriteRecipes, setFavoriteRecipes,
            id, category, image, area, name, alcoholicOrNot, type,
          )
        )}
        data-testid={(index !== null) ? `${index}-horizontal-favorite-btn` : 'favorite-btn'}
      >
        <img
          alt=""
          src={isFavorite ? BlackHeartIcon : WhiteHeartIcon}
        />
      </button>
    </div>
  );
};

FavoriteButton.propTypes = {
  id: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  type: propTypes.oneOf(['comida', 'bebida']).isRequired,
  index: propTypes.number,
  area: propTypes.string,
  alcoholicOrNot: propTypes.string,
};

FavoriteButton.defaultProps = {
  index: null,
  area: null,
  alcoholicOrNot: null,
};

export default FavoriteButton;
