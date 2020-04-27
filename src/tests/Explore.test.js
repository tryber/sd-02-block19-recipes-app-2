import React from 'react';
import {
  cleanup, fireEvent,
} from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider from '../context/RecipesAppContext';
import Explore from '../pages/Explore';

afterEach(cleanup);

describe('tests explore page', () => {
  test('if explore page rendering', () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <Explore />
      </RecipesAppProvider>,
      { route: '/explorar' },
    );
    expect(history.location.pathname).toBe('/explorar');
  });
  test('if rendering "explorar comidas" and "explorar bebidas"', () => {
    const { queryByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <Explore />
      </RecipesAppProvider>,
      { route: '/explorar' },
    );
    expect(queryByTestId(/explore-food/i)).toBeInTheDocument();
    expect(queryByTestId(/explore-food/i).tagName).toBe('BUTTON');

    expect(queryByTestId(/explore-drinks/i)).toBeInTheDocument();
    expect(queryByTestId(/explore-drinks/i).tagName).toBe('BUTTON');
  });
  test('if buttons comida change route to /explorar/comidas', () => {
    const { queryByTestId, history } = renderWithRouter(
      <RecipesAppProvider>
        <Explore />
      </RecipesAppProvider>,
      { route: '/explorar' },
    );

    fireEvent.click(queryByTestId(/explore-food/i));
    expect(history.location.pathname).toBe('/explorar/comidas');
  });
  test('if buttons bebidas change route to /explorar/bebidas', () => {
    const { queryByTestId, history } = renderWithRouter(
      <RecipesAppProvider>
        <Explore />
      </RecipesAppProvider>,
      { route: '/explorar' },
    );

    fireEvent.click(queryByTestId(/explore-drinks/i));
    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
