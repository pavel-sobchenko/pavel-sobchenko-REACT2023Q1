import React from 'react';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import HomePage from './HomePage';
import {
  getRandomCocktailList,
  searchCocktailByName,
} from '../../services/api.service';
import { HTTP_BASE_URL } from '../../models/constants';
import { TEST_ITEM } from '../../models/test-data';

vi.mock('axios');

describe('Home', () => {
  it('should contain title', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Cocktail');
  });

  it('should call fetchCocktails by default', async () => {
    const drinks = [TEST_ITEM];

    (axios.get as jest.Mock).mockResolvedValue({
      cockatilsData: {
        data: {
          drinks: [TEST_ITEM],
        },
      },
    });

    await getRandomCocktailList();

    expect(axios.get).toHaveBeenCalled();
  });

  it('should call search by name', async () => {
    const drinks = [TEST_ITEM];

    (axios.get as jest.Mock).mockResolvedValue({
      cockatilsData: {
        data: {
          drinks: [TEST_ITEM],
        },
      },
    });

    await searchCocktailByName('abc');

    expect(axios.get).toHaveBeenCalled();
  });
});
