import React from 'react';
import propTypes from 'prop-types';
import InProgressRecipe from '../components/InProgressRecipe';

const InProgressMeal = ({ match: { params: { id } } }) => (
  <InProgressRecipe id={id} typeFood="Meal" />
);

InProgressMeal.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default InProgressMeal;
