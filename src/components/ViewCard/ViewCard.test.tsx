import React from 'react';
import { render, screen } from '@testing-library/react';
import { TEST_ITEM } from '../../models/test-data';
import ViewCard from './ViewCard';

describe('Card', () => {
  it('should create a view card', () => {
    const { container } = render(
      <ViewCard drink={TEST_ITEM} onCardClick={() => '1'} />
    );
    const card = container.getElementsByClassName('card')[0];
    expect(card).toBeInTheDocument();
  });

  it('it should display view card name', () => {
    const { container } = render(
      <ViewCard drink={TEST_ITEM} onCardClick={() => '1'} />
    );
    const card = container.getElementsByClassName('title')[0];
    expect(card).toHaveTextContent('Alco hell');
  });

  it('it should display categories list in view card', () => {
    render(<ViewCard drink={TEST_ITEM} onCardClick={() => '1'} />);
    const ingr = screen.getAllByRole('listitem');
    expect(ingr).toHaveLength(2);
  });
});
