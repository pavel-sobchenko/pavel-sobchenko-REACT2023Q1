import { render, screen } from '@testing-library/react';
import React from 'react';
import Card from './Card';
import { GLASS_TYPES } from '../../models/constants';

const item = {
  name: 'AAA',
  instructions: 'BBB',
  image: 'abcd',
  dateCreated: '',
  alcoholic: true,
  category: ['CCCC'],
  glass: GLASS_TYPES[0].name,
  ingredients: [
    { product: 'Soda', volume: '100 ml' },
    { product: 'Vodka', volume: '1 oz' },
  ],
};

describe('Card', () => {
  it('should create a card', () => {
    const { container } = render(<Card drink={item} />);
    const card = container.getElementsByClassName('card')[0];
    expect(card).toBeInTheDocument();
  });

  it('it should display card name', () => {
    const { container } = render(<Card drink={item} />);
    const card = container.getElementsByClassName('title')[0];
    expect(card).toHaveTextContent('AAA');
  });

  it('it should display categories list', () => {
    render(<Card drink={item} />);
    const ingr = screen.getAllByRole('listitem');
    expect(ingr).toHaveLength(2);
  });

  it('it should display is alcoholic', () => {
    const { container } = render(<Card drink={item} />);
    const cardText = container.getElementsByClassName('alcoholic')[0];
    expect(cardText).toHaveTextContent('Is Alcoholic: Yes');
  });

  it('it should display is non alcoholic', () => {
    const item2 = Object.assign(item, { alcoholic: false });
    const { container } = render(<Card drink={item2} />);
    const cardText = container.getElementsByClassName('alcoholic')[0];
    expect(cardText).toHaveTextContent('Is Alcoholic: No');
  });
});
