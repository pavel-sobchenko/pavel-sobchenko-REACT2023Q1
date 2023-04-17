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

  // it('should set default value to search field from localstorage', async () => {
  //   const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  //   const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  //   localStorage.setItem('inputValue', 'aaabbb');

  //   render(
  //     <Provider store={store}>
  //       <SearchBar filterChange={() => {}} />
  //     </Provider>
  //   );
  //   const input = screen.getByRole('searchbox') as HTMLInputElement;
  //   expect(input.value).toBe('aaabbb');

  //   localStorage.clear();
  //   getItemSpy.mockClear();
  //   setItemSpy.mockClear();
  // });

  // it('it should allow text data', async () => {
  //   render(
  //     <Provider store={store}>
  //       <SearchBar filterChange={() => {}} />
  //     </Provider>
  //   );
  //   const input = screen.getByRole('searchbox') as HTMLInputElement;
  //   await fireEvent.input(input, { target: { value: '123' } });
  //   expect(input.value).toBe('123');
  // });

  // it('it should update cocktail list if user inputs empty value', async () => {
  //   const foo = vi.fn();
  //   render(<SearchBar filterChange={foo} />);
  //   const input = screen.getByRole('searchbox') as HTMLInputElement;
  //   await fireEvent.input(input, { target: { value: '123' } });
  //   await fireEvent.input(input, { target: { value: '' } });
  //   expect(foo).toHaveBeenCalled();
  // });

  // it('it should update filter list on enter value', async () => {
  //   const foo = vi.fn();
  //   render(<SearchBar filterChange={foo} />);
  //   const input = screen.getByRole('searchbox') as HTMLInputElement;
  //   await fireEvent.input(input, { target: { value: '123' } });
  //   await fireEvent.keyDown(input, {
  //     key: 'Enter',
  //     code: 'Enter',
  //     charCode: 13,
  //   });
  //   expect(foo).toHaveBeenCalled();
  // });

  // it('it should not update filter list on enter value if value is empty', async () => {
  //   const foo = vi.fn();
  //   render(<SearchBar filterChange={foo} />);
  //   const input = screen.getByRole('searchbox') as HTMLInputElement;
  //   await fireEvent.input(input, { target: { value: '' } });
  //   await fireEvent.keyDown(input, {
  //     key: 'Enter',
  //     code: 'Enter',
  //     charCode: 13,
  //   });
  //   expect(foo).not.toBeCalledTimes(0);
  // });
});
