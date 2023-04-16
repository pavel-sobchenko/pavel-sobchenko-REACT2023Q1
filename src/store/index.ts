import { configureStore } from '@reduxjs/toolkit';
import {
  homeReducer,
  clearSearchedCars,
  addSearchValue,
  addSelectedCardId,
  openModal,
  closeModal,
} from './slices/home.slices';

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './thunks/fetchCocktails';

export {
  store,
  clearSearchedCars,
  addSearchValue,
  addSelectedCardId,
  openModal,
  closeModal,
};
