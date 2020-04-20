import React, { useState } from 'react';
import HeartIcon from '../images/heartIcon.svg';
import '../styles/FavoriteButton.css';

const FavoriteButton = ({ index, recipeId, category, image }) => {
  const initialFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const initialState = initialFavoriteRecipes.some(({ id }) => id === recipeId);

  const [isFavorite, setIsFavorite] = useState(initialState);

  const changeIsFavorite = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (isFavorite) {
      setIsFavorite(false);
      favoriteRecipes = favoriteRecipes.reduce((acc, item) => (
        (item.id === recipeId) ? acc : [...acc, item]
      ));
    } else {
      setIsFavorite(true);
      favoriteRecipes = [...favoriteRecipes, { id: recipeId, category, image }];
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  return (
    <div className="favorite-button">
      <button
        onClick={changeIsFavorite}
        data-testid={index ? `${index}-horizontal-favorite-btn` : 'favorite-btn'}
      >
        <img alt="" src={HeartIcon} className={isFavorite ? 'is-favorite' : 'is-not-favorite'} />
      </button>
    </div>
  );
};

export default FavoriteButton;
