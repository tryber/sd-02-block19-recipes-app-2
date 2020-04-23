import React from 'react';
import {
  cleanup,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import RecipeMealDetails from '../pages/RecipeMealDetails';

const id = { params: { id: 52855 } };

afterEach(cleanup);

describe('Recipe Meal Detail', () => {
  test('if components rendering', async () => {
    const { findByText } = renderWithRouter(
      <RecipesAppProvider>
        <RecipeMealDetails match={id} />
      </RecipesAppProvider>,
      { route: '/receitas/comida/52855' },
    );

    await findByText(/Loading/i);
  });
});
