import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { RecipesAppContext } from '../context/RecipesAppContext';

const renderExploreButtons = (type, testid) => (
  <Link to={`/explorar/${type.toLowerCase()}`}>
    <button
      className="button-explore"
      type="button"
      data-testid={`explore-${testid}`}
    >
      {`Explorar ${type}`}
    </button>
  </Link>
);

const Explore = () => {
  const { setDisplay, headerTitle: [, setHeadertitle] } = useContext(RecipesAppContext);

  useEffect(() => {
    setDisplay(true, true, true);
    setHeadertitle('Explorar');
  }, [setDisplay, setHeadertitle]);

  return (
    <div>
      {renderExploreButtons('Comidas', 'food')}
      {renderExploreButtons('Bebidas', 'drinks')}
    </div>
  );
};


export default Explore;
