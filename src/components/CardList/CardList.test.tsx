import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import userEvent from '@testing-library/user-event';
import { TEST_ITEM } from '../../models/test-data';
import CardList from './CardList';
import { store } from '../../store';

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

  it('should click by card change id value in the store', async () => {
    const { container } = render(
      <Provider store={store}>
        <CardList drinks={[TEST_ITEM]} />
      </Provider>
    );

    const card = container.getElementsByClassName('card-container')[0];
    const user = userEvent.setup();
    await user.click(card);
    expect(store.getState().home.selectedCardId).toEqual(TEST_ITEM.idDrink);
  });

  it('should click by card open modal window', async () => {
    const { container } = render(
      <Provider store={store}>
        <CardList drinks={[TEST_ITEM]} />
      </Provider>
    );

    const card = container.getElementsByClassName('card-container')[0];
    const user = userEvent.setup();
    await user.click(card);
    expect(store.getState().home.isModal).toEqual(true);
  });
});
