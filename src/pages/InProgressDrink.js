import React from 'react';
import propTypes from 'prop-types';
import InProgressRecipe from '../components/InProgressRecipe';

const InProgressDrink = ({ match: { params: { id } } }) => (
  <InProgressRecipe id={id} typeFood="Drink" />
);

InProgressDrink.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default InProgressDrink;
