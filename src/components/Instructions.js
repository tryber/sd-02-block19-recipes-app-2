import React from 'react';
import propTypes from 'prop-types';

const Instructions = ({ instructions }) => (
  <div className="instructions-content">
    <div className="instructions-title">Instructions:</div>
    <p className="instructions-details" data-testid="instructions">{instructions}</p>
  </div>
);

Instructions.propTypes = {
  instructions: propTypes.string.isRequired,
};

export default Instructions;
