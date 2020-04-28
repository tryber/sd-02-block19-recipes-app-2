import React, { useContext } from 'react';
import {
  cleanup, wait, fireEvent,
} from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import renderWithRouter from '../services/renderWithRouter';
import RecipeAppProvider, { RecipesAppContext } from '../context/RecipesAppContext';
import App from '../App';

afterEach(cleanup);

describe('Complementary testing for RecipesGenerator', () => {
  test('if inputsCategory is rendering', async () => {
    await wait();

    const { queryByTestId, getByTestId } = renderWithRouter(
      <RecipeAppProvider>
        <App />
      </RecipeAppProvider>,
    );

    const { act } = TestRenderer;

    const wrapper = ({ children }) => <RecipeAppProvider>{children}</RecipeAppProvider>;
    const { result } = renderHook(() => useContext(RecipesAppContext), { wrapper });

    await act(async () => {
      result.current.displaySearchBar[1]();
      fireEvent.change(queryByTestId(/email-input/i), { target: { value: 'test@test.com' } });
      fireEvent.change(queryByTestId(/password-input/i), { target: { value: 'ChickenBreast' } });
      fireEvent.click(queryByTestId(/login-submit-btn/i));
      await wait(() => getByTestId(/search-top-btn/i));

      fireEvent.click(queryByTestId(/search-top-btn/i));

      fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'fasdasfas' } });
      fireEvent.click(queryByTestId(/ingredient-search-radio/i));
      expect(queryByTestId(/search-input/i).value).toBe('fasdasfas');
      expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');
    });
  }, 20000);
});
