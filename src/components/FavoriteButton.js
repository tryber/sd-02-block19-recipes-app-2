import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import { RecipesAppContext } from '../context/RecipesAppContext';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteButton.css';

const changeState = (
  isFavorite, setIsFavorite, id, category, image, area, name, alcoholicOrNot,
) => {
  let favoriteRecipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];

  setIsFavorite(!isFavorite);

  favoriteRecipes = (isFavorite)
    ? favoriteRecipes.filter((item) => item.id !== id)
    : [...favoriteRecipes, { id, category, image, area, name, alcoholicOrNot }];

  localStorage.setItem('favorite-recipes', JSON.stringify(favoriteRecipes));
};

const FavoriteButton = ({
  index, id, category, image, area, name, alcoholicOrNot,
}) => {
  const initialFavoriteRecipes = JSON.parse(localStorage.getItem('favorite-recipes')) || [];
  const initialState = initialFavoriteRecipes.some((item) => item.id === id);

  const { favoriteRecipes: [favoriteRecipes, setFavoriteRecipes] } = useContext(RecipesAppContext);
  const [isFavorite, setIsFavorite] = useState(initialState);

  return (
    <div className="favorite-button">
      <button
        type="button"
        onClick={() => (
          changeState(isFavorite, setIsFavorite, id, category, image, area, name, alcoholicOrNot)
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
