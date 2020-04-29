import React from 'react';
import propTypes from 'prop-types';

const ImgCatTitleDetails = ({ foods, typeFood }) => (
  <div>
    <img
      className="image-details"
      data-testid="recipe-photo"
      src={foods[0][`str${typeFood}Thumb`]}
      alt="imagem da receita"
    />
    <h2 className="title-details" data-testid="recipe-title">{foods[0][`str${typeFood}`]}</h2>
    <p className="category-details">
      {(typeFood === 'Drink')
        ? foods[0].strAlcoholic
        : foods[0].strCategory}
    </p>
  </div>
);

ImgCatTitleDetails.propTypes = {
  foods: propTypes.instanceOf(Array).isRequired,
  typeFood: propTypes.string.isRequired,
};

export default ImgCatTitleDetails;
