import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should contain input', () => {
    render(<SearchBar filterChange={() => {}} />);
    const input = screen.getAllByPlaceholderText('Search a cocktail');
    expect(input).toBeTruthy();
  });

  it('it should allow text data', async () => {
    render(<SearchBar filterChange={() => {}} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    await fireEvent.input(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });
});
