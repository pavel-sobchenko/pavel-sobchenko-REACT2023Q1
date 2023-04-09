import React from 'react';
import { render } from '@testing-library/react';
import { TEST_ITEM } from '../../models/test-data';
import DetailedCard from './DetailedCard';

describe('Card', () => {
  it('should create a detailed card', () => {
    const { container } = render(<DetailedCard drink={TEST_ITEM} />);
    const card = container.getElementsByClassName('card-container')[0];
    expect(card).toBeInTheDocument();
  });

  it('it should display view card name', () => {
    const { container } = render(<DetailedCard drink={TEST_ITEM} />);
    const card = container.getElementsByClassName('title')[0];
    expect(card).toHaveTextContent('Alco hell');
  });

  it('it should display is alcoholic', () => {
    const { container } = render(<DetailedCard drink={TEST_ITEM} />);
    const cardText = container.getElementsByClassName('alcoholic')[0];
    expect(cardText).toHaveTextContent('Is Alcoholic: Yes');
  });

  it('it should display is non alcoholic', () => {
    const item2 = Object.assign(TEST_ITEM, { strAlcoholic: 'Non Alcoholic' });
    const { container } = render(<DetailedCard drink={item2} />);
    const cardText = container.getElementsByClassName('alcoholic')[0];
    expect(cardText).toHaveTextContent('Is Alcoholic: No');
  });
});
