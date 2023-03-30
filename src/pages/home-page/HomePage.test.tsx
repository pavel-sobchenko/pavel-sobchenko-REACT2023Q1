import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('Home', () => {
  it('should contain title', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Cocktail');
  });
});
