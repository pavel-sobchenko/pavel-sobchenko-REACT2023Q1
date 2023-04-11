import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import Card from '../Card/Card';
import FormCardList from './FormCardList';

const cocktail = {
  name: '1',
  instructions: '1',
  image: '1',
  dateCreated: '1',
  alcoholic: true,
  category: ['1'],
  glass: '1',
};

describe('Form Card List', () => {
  it('should create a form card list', () => {
    const { container } = render(<FormCardList drinks={[cocktail]} />);
    const cards = container.getElementsByClassName('card-container');
    expect(cards.length).toEqual(1);
  });
});
