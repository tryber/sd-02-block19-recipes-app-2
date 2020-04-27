import React from 'react';
import {
  cleanup,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import ExploreDrink from '../pages/ExploreDrink';

afterEach(cleanup);

describe('Explore Meal page tests', () => {
  test('if rendering', () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <ExploreDrink />
      </RecipesAppProvider>,
      { route: '/explorar/bebidas' },
    );

    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
