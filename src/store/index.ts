import { configureStore } from '@reduxjs/toolkit';
import {
  homeReducer,
  clearSearchedCars,
  addSearchValue,
  addSelectedCardId,
  openModal,
  closeModal,
} from './slices/home.slices';
import {
  formReducer,
  addName,
  addInstructions,
  addImage,
  addDate,
  addAlco,
  addCategory,
  addGlass,
  addIngredients,
  clearForm,
  addCard,
} from './slices/form.slices';

const store = configureStore({
  reducer: {
    home: homeReducer,
    form: formReducer,
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
  addName,
  addInstructions,
  addImage,
  addDate,
  addAlco,
  addCategory,
  addGlass,
  addIngredients,
  clearForm,
  addCard,
};
