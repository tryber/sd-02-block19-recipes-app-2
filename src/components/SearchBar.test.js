import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';

import RecipesAppProvider from '../context/RecipesAppContext';
import SearchBar from './SearchBar';
import {
  byName,
  byFirstLetter,
  byIngredients,
} from '../__mocks__/recipesMock';

const callApi = (value) => {
  const mockSuccessResponse = {
    results: [...value],
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    status: 200,
    ok: true,
    json: () => mockJsonPromise,
  });
  return mockFetchPromise;
};

afterEach(cleanup);

describe('SearchBar tests', () => {
  test('if inputs fields exist', () => {
    const { queryByTestId } = render(
      <RecipesAppProvider>
        <SearchBar />
      </RecipesAppProvider>,
    );

    expect(queryByTestId(/search-input/i)).toBeInTheDocument();
    expect(queryByTestId(/search-input/i).tagName).toBe('INPUT');
    expect(queryByTestId(/search-input/i).type).toBe('text');

    expect(queryByTestId(/ingredient-search-radio/i)).toBeInTheDocument();
    expect(queryByTestId(/ingredient-search-radio/i).tagName).toBe('INPUT');
    expect(queryByTestId(/ingredient-search-radio/i).type).toBe('radio');

    expect(queryByTestId(/name-search-radio/i)).toBeInTheDocument();
    expect(queryByTestId(/name-search-radio/i).tagName).toBe('INPUT');
    expect(queryByTestId(/name-search-radio/i).type).toBe('radio');

    expect(queryByTestId(/first-letter-search-radio/i)).toBeInTheDocument();
    expect(queryByTestId(/first-letter-search-radio/i).tagName).toBe('INPUT');
    expect(queryByTestId(/first-letter-search-radio/i).type).toBe('radio');
  });
  test('if inputs working', async () => {
    const { queryByTestId } = render(
      <RecipesAppProvider>
        <SearchBar />
      </RecipesAppProvider>,
    );

    fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Orange' } });
    fireEvent.click(queryByTestId(/name-search-radio/i));
    expect(queryByTestId(/search-input/i).value).toBe('Orange');
    expect(queryByTestId(/name-search-radio/i).value).toBe('name');

    jest.spyOn(global, 'fetch').mockImplementation(() => callApi(byName.meals));

    await wait(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Orange');

    fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'Chicken Breast' } });
    fireEvent.click(queryByTestId(/ingredient-search-radio/i));
    expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

    await wait(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');

    fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'a' } });
    fireEvent.click(queryByTestId(/first-letter-search-radio/i));
    expect(queryByTestId(/first-letter-search-radio/i).value).toBe('first-letter');

    await wait(() => expect(global.fetch).toHaveBeenCalledTimes(3));
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
});
