import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { TEST_ITEM } from '../../models/test-data';
import CardList from './CardList';

const initialState = {
  home: {
    defaultCards: [],
    filteredCards: [],
    searchValue: 'ccc',
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

describe('Card List', () => {
  it('should create a card list', () => {
    const { container } = render(
      <Provider store={store}>
        <CardList drinks={[TEST_ITEM]} />
      </Provider>
    );

    const cards = container.getElementsByClassName('card-container');
    expect(cards.length).toEqual(1);
  });

  // it('should triggers method by card click', async () => {
  //   const handleClickCard = vi.fn();
  //   const { container } = render(
  //     <Provider store={store}>
  //       <CardList drinks={[TEST_ITEM]} />
  //     </Provider>
  //   );
  //   const card = container.getElementsByClassName('card-container')[0];
  //   await fireEvent.click(card);
  //   expect(handleClickCard).toHaveBeenCalledTimes(1);
  // });
});
