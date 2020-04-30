
import React from 'react';
import {
  cleanup, wait,
} from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import NotFound from '../pages/NotFound';

beforeEach(() => {
  jest.resetModules();
});


afterEach(cleanup);

describe('tests NotFound page', () => {
  it('when app goes into unknown route, renders NotFound', async () => {
    const { getByText } = renderWithRouter(
      <RecipesAppProvider>
        <NotFound />
      </RecipesAppProvider>,
    );

    await wait(() => getByText('Not Found Page'));
    expect(getByText('Not Found Page')).toBeInTheDocument();
  }, 15000);
});
