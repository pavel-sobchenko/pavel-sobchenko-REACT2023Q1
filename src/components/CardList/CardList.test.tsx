import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { TEST_ITEM } from '../../models/test-data';
import CardList from './CardList';

describe('Card List', () => {
  it('should create a card list', () => {
    const { container } = render(
      <CardList drinks={[TEST_ITEM]} onCardClicked={() => '14029'} />
    );
    const cards = container.getElementsByClassName('card-container');
    expect(cards.length).toEqual(1);
  });

  it('should triggers method by card click', () => {
    const onSubmit = vi.fn();
    const { container } = render(
      <CardList drinks={[TEST_ITEM]} onCardClicked={onSubmit} />
    );
    const card = container.getElementsByClassName('card-container')[0];
    fireEvent.click(card);
    expect(onSubmit).toHaveBeenCalled();
  });
});
