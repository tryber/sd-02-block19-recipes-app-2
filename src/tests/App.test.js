import React from 'react';
import { cleanup, render } from '@testing-library/react';

import RecipesAppProvider from '../context/RecipesAppContext';
import App from '../App';


afterEach(cleanup);

describe('Tests for App component', () => {
  it('To be tested', () => {
    const { queryByTestId } = render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    expect(true).toBeTruthy();
  });
});
