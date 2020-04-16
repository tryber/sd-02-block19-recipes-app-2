import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import RecipesAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';


afterEach(cleanup);

describe('Tests for Footer component', () => {
  it('Component is rendered if displayFooter is true and dont if its false', async () => {
    const { getByTestId } = render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const wrapper = ({ children }) => <RecipesAppProvider>{children}</RecipesAppProvider>;
    const { result } = renderHook(() => useContext(RecipesAppContext), { wrapper });
    expect(result.current.displayFooter[0]).toBeTruthy();

    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });

  it('If displayFooter is false, it doesnt get displayed', () => {
    const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
    const [displayHeader, setDisplayHeader] = [false, jest.fn()];
    const [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
    const [displaySearchButton, setDisplaySearchButton] = [false, jest.fn()];
    const [displayFooter, setDisplayFooter] = [false, jest.fn()];

    const store = {
      headerTitle: [headerTitle, setHeaderTitle],
      displayHeader: [displayHeader, setDisplayHeader],
      displaySearchBar: [displaySearchBar, setDisplaySearchBar],
      displaySearchButton: [displaySearchButton, setDisplaySearchButton],
      displayFooter: [displayFooter, setDisplayFooter],
    };

    const { queryByTestId } = render(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    expect(queryByTestId('drinks-bottom-btn')).not.toBeInTheDocument();
    expect(queryByTestId('explore-bottom-btn')).not.toBeInTheDocument();
    expect(queryByTestId('food-bottom-btn')).not.toBeInTheDocument();
  });

  it('In clicking Explore button, user is taken to Explore page', () => {
    const { getByTestId, getByText } = render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const exploreButton = getByTestId('explore-bottom-btn');
    expect(exploreButton).toBeInTheDocument();

    fireEvent.click(exploreButton);

    expect(getByText(/explore/gi)).toBeInTheDocument();
  });

  it('In clicking Cocktails button, user is taken to Cocktail page', () => {
    const { getByTestId, getByText } = render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const cocktailButton = getByTestId('drinks-bottom-btn');
    expect(cocktailButton).toBeInTheDocument();

    fireEvent.click(cocktailButton);

    expect(getByText(/drink/gi)).toBeInTheDocument();
  });

  it('In clicking Meals button, user is taken to Meals page', () => {
    const { getByTestId, getByText } = render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const mealsButton = getByTestId('food-bottom-btn');
    expect(mealsButton).toBeInTheDocument();

    fireEvent.click(mealsButton);

    expect(getByText(/meal/gi)).toBeInTheDocument();
  });
});
