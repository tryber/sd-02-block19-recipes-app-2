import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { RecipesAppContext } from '../context/RecipesAppContext';

const renderExploreButtons = (type, testid) => (
  <Link to={`/explorar/${type.toLowerCase()}`}>
    <button
      type="button"
      data-testid={`explore-${testid}`}
    >
      {`Explorar ${type}`}
    </button>
  </Link>
);

const Explore = () => {
  const {
    displayHeader: [, setDisplayHeader], displayFooter: [, setDisplayFooter],
  } = useContext(RecipesAppContext);

  useEffect(() => {
    setDisplayHeader(true);
    setDisplayFooter(true);
  }, [setDisplayFooter, setDisplayHeader]);

  return (
    <div>
      {renderExploreButtons('Comidas', 'food')}
      {renderExploreButtons('Bebidas', 'drinks')}
    </div>
  );
};


export default Explore;
