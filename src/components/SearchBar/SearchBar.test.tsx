import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

const initialState = {
  home: {
    defaultCards: [],
    filteredCards: [],
    searchValue: '',
    isLoading: false,
    isEmptyResult: false,
    error: null,
    selectedCardId: null,
    isModal: false,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: any;

beforeEach(() => {
  const mockStore = configureStore();
  store = mockStore(initialState);
});

describe('SearchBar', () => {
  it('should contain input', () => {
    render(
      <Provider store={store}>
        <SearchBar filterChange={() => {}} />
      </Provider>
    );
    const input = screen.getAllByPlaceholderText('Search a cocktail');
    expect(input).toBeTruthy();
  });

  it('should set default value to search field', () => {
    render(
      <Provider store={store}>
        <SearchBar filterChange={() => {}} />
      </Provider>
    );
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });
});
