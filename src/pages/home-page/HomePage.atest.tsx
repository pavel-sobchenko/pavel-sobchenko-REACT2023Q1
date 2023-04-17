// import React from 'react';
// import configureStore from 'redux-mock-store';
// import { vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import axios from 'axios';
// import { Provider } from 'react-redux';
// import HomePage from './HomePage';
// import {
//   getRandomCocktailList,
//   searchCocktailByName,
// } from '../../services/api.service';
// import { TEST_ITEM } from '../../models/test-data';

// vi.mock('axios');

// describe('Home', () => {
//   // it('should contain title', async () => {
//   //   const initialState = {
//   //     home: {
//   //       defaultCards: [],
//   //       filteredCards: [],
//   //       searchValue: 'ccc',
//   //       isLoading: false,
//   //       isEmptyResult: false,
//   //       error: null,
//   //       selectedCardId: null,
//   //       isModal: false,
//   //     },
//   //   };
//   //   const mockStore = configureStore();
//   //   const store = mockStore(initialState);
//   //   render(
//   //     <Provider store={store}>
//   //       <HomePage />
//   //     </Provider>
//   //   );
//   //   expect(
//   //     await screen.getByRole('heading', {
//   //       level: 1,
//   //     })
//   //   ).toHaveTextContent('Cocktail');
//   // });
//   // it('should call fetchCocktails by default', async () => {
//   //   (axios.get as jest.Mock).mockResolvedValue({
//   //     cockatilsData: {
//   //       data: {
//   //         drinks: [TEST_ITEM],
//   //       },
//   //     },
//   //   });
//   //   await getRandomCocktailList();
//   //   expect(axios.get).toHaveBeenCalled();
//   // });
//   // it('should call search by name', async () => {
//   //   (axios.get as jest.Mock).mockResolvedValue({
//   //     cockatilsData: {
//   //       data: {
//   //         drinks: [TEST_ITEM],
//   //       },
//   //     },
//   //   });
//   //   await searchCocktailByName('abc');
//   //   expect(axios.get).toHaveBeenCalled();
//   // });
// });
