import React from 'react';
import propTypes from 'prop-types';
import RecipeFoodsDetails from '../components/RecipeFoodsDetails';

const RecipeMealDetails = ({ match: { params: { id } } }) => (
  <RecipeFoodsDetails id={id} typeFood="Meal" />
);

RecipeMealDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};


export default RecipeMealDetails;
