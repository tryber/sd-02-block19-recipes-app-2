import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';

import SearchBar from './SearchBar';

afterEach(cleanup);

describe('SearchBar tests', () => {
  test('if inputs fields exist', () => {
    const { queryByTestId } = render(<SearchBar />);

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
  test('if inputs working', () => {
    const { queryByTestId } = render(<SearchBar />);

    fireEvent.change(queryByTestId(/search-input/i), { target: { value: 'AA' } });
    expect(queryByTestId(/search-input/i).value).toBe('AA');

    fireEvent.click(queryByTestId(/ingredient-search-radio/i));
    expect(queryByTestId(/ingredient-search-radio/i).value).toBe('ingredient');

    fireEvent.click(queryByTestId(/name-search-radio/i));
    expect(queryByTestId(/name-search-radio/i).value).toBe('name');

    fireEvent.click(queryByTestId(/first-letter-search-radio/i));
    expect(queryByTestId(/first-letter-search-radio/i).value).toBe('first-letter');
  });
});
