import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import RecipesAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';


afterEach(cleanup);

describe('Tests for Header component', () => {
  it('Component is rendered if displayHeader is true and dont if its false', async () => {
    const { getByTestId } = render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const wrapper = ({ children }) => <RecipesAppProvider>{children}</RecipesAppProvider>;
    const { result } = renderHook(() => useContext(RecipesAppContext), { wrapper });
    expect(result.current.displayHeader[0]).toBeTruthy();

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
  });

  it('If displayHeader is false, it doesnt get displayed', () => {
    const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
    const [displayHeader, setDisplayHeader] = [false, jest.fn()];
    const [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
    const [displayProfileButton, setDisplayProfileButton] = [false, jest.fn()];
    const [displayFooter, setDisplayFooter] = [false, jest.fn()];

    const store = {
      headerTitle: [headerTitle, setHeaderTitle],
      displayHeader: [displayHeader, setDisplayHeader],
      displaySearchBar: [displaySearchBar, setDisplaySearchBar],
      displayProfileButton: [displayProfileButton, setDisplayProfileButton],
      displayFooter: [displayFooter, setDisplayFooter],
    };

    const { queryByTestId } = render(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    expect(queryByTestId('profile-top-btn')).not.toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(queryByTestId('page-title')).not.toBeInTheDocument();
  });

  it('In clicking profile button, user is taken to profile page', () => {
    const { getByTestId, getByText } = render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();

    fireEvent.click(profileButton);

    expect(getByText('Profile Page')).toBeInTheDocument();
  });

  it('displayProfileButton state is false, its not displayed', () => {
    const [headerTitle, setHeaderTitle] = ['Receitas', jest.fn()];
    const [displayHeader, setDisplayHeader] = [false, jest.fn()];
    const [displaySearchBar, setDisplaySearchBar] = [false, jest.fn()];
    const [displayProfileButton, setDisplayProfileButton] = [false, jest.fn()];
    const [displayFooter, setDisplayFooter] = [false, jest.fn()];

    const store = {
      headerTitle: [headerTitle, setHeaderTitle],
      displayHeader: [displayHeader, setDisplayHeader],
      displaySearchBar: [displaySearchBar, setDisplaySearchBar],
      displayProfileButton: [displayProfileButton, setDisplayProfileButton],
      displayFooter: [displayFooter, setDisplayFooter],
    };

    const { queryByTestId } = render(
      <RecipesAppContext.Provider value={store}>
        <App />
      </RecipesAppContext.Provider>,
    );

    const profileButton = queryByTestId('profile-top-btn');
    expect(profileButton).not.toBeInTheDocument();
  });
});
