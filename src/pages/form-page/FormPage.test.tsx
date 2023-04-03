import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FormPage from './FormPage';

describe('Home', () => {
  it('should contain title', () => {
    render(<FormPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('cocktail recipe');
  });

  it('it should allow text data', () => {
    render(<FormPage />);
    const input = screen.getByLabelText('Name it') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'name' } });
    expect(input.value).toBe('name');
  });
});
