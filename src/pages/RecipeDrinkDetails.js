import React from 'react';
import propTypes from 'prop-types';
import RecipeFoodsDetails from '../components/RecipeFoodsDetails';

const RecipeDrinkDetails = ({ match: { params: { id } } }) => (
  <RecipeFoodsDetails id={id} typeFood="Drink" />
);

RecipeDrinkDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};


export default RecipeDrinkDetails;
