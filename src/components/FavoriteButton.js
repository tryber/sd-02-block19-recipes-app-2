import React, { useState } from 'react';
import propTypes from 'prop-types';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteButton.css';

const changeState = (isFavorite, setIsFavorite, id, category, image) => {
  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  if (isFavorite) {
    setIsFavorite(false);
    favoriteRecipes = favoriteRecipes.reduce((acc, item) => (
      (item.id === id) ? acc : [...acc, item]
    ), []);
  } else {
    setIsFavorite(true);
    favoriteRecipes = [...favoriteRecipes, { id, category, image }];
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

const FavoriteButton = ({ index, id, category, image }) => {
  const initialFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const initialState = initialFavoriteRecipes.some((item) => item.id === id);

  const [isFavorite, setIsFavorite] = useState(initialState);

  return (
    <div className="favorite-button">
      <button
        onClick={() => changeState(isFavorite, setIsFavorite, id, category, image)}
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
