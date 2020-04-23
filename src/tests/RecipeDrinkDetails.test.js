import React from 'react';
import {
  cleanup,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import RecipeDrinkDetails from '../pages/RecipeDrinkDetails';

const id = { params: { id: 52855 } };

afterEach(cleanup);

describe('Recipe Meal Detail', () => {
  test('if components rendering', async () => {
    const { findByText } = renderWithRouter(
      <RecipesAppProvider>
        <RecipeDrinkDetails match={id} />
      </RecipesAppProvider>,
      { route: '/receitas/bebida/52855' },
    );

    await findByText(/Loading/i);
  });
});
