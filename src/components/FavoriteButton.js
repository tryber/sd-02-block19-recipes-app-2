import React, { useState } from 'react';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg'
import '../styles/FavoriteButton.css';

const FavoriteButton = ({ index, id, category, image }) => {
  const initialFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const initialState = initialFavoriteRecipes.some((item) => item.id === id);

  const [isFavorite, setIsFavorite] = useState(initialState);

  const changeIsFavorite = () => {
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

  return (
    <div className="favorite-button">
      <button
        onClick={changeIsFavorite}
        data-testid={index ? `${index}-horizontal-favorite-btn` : 'favorite-btn'}
      >
        <img
          alt=""
          src={isFavorite ? BlackHeartIcon : WhiteHeartIcon}
        //   className={isFavorite ? 'is-favorite' : 'is-not-favorite'}
        />
      </button>
    </div>
  );
};

export default FavoriteButton;
