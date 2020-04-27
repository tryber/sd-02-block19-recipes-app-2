import React, { useState } from 'react';
import propTypes from 'prop-types';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteButton.css';

const changeState = (
  isFavorite, setIsFavorite, id, category, image, area, name, alcoholicOrNot,
) => {
  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  setIsFavorite(!isFavorite);

  favoriteRecipes = (isFavorite)
    ? favoriteRecipes.filter((item) => item.id !== id)
    : [...favoriteRecipes, { id, category, image, area, name, alcoholicOrNot }];

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

const FavoriteButton = ({
  index, id, category, image, area, name, alcoholicOrNot,
}) => {
  const initialFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const initialState = initialFavoriteRecipes.some((item) => item.id === id);

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
  index: propTypes.number,
  id: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
};

FavoriteButton.defaultProps = {
  index: null,
};

export default FavoriteButton;
