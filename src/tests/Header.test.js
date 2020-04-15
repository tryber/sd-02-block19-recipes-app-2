import React, { useContext } from 'react';
import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import renderWithRouter from '../services/renderWithRouter';
import RecipesAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';


afterEach(cleanup);

describe('Tests for Header component', () => {
  it('Component is rendered if displayHeader is true', () => {
    const { getByTestId } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const wrapper = ({ children }) => <RecipesAppProvider>{children}</RecipesAppProvider>;
    const { result: { current } } = renderHook(() => useContext(RecipesAppContext), { wrapper });
    const { displayHeader: [displayHeader] } = current;

    expect(displayHeader).toBeTruthy();

    const profileButton = getByTestId('profile-top-btn');
    const searchButton = getByTestId('search-top-btn');
    const pageTitle = getByTestId('page-title');

    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
});
