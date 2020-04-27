import React from 'react';
import {
  cleanup,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import ExploreMeal from '../pages/ExploreMeal';

afterEach(cleanup);

describe('Explore Meal page tests', () => {
  test('if rendering', () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <ExploreMeal />
      </RecipesAppProvider>,
      { route: '/explorar/comidas' },
    );

    expect(history.location.pathname).toBe('/explorar/comidas');
  });
});
