/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IngredientModel } from '../../models/cocktail.model';

interface FormStateModel {
  name: string;
  instructions: string;
  image: string;
  date: string;
  alcoholic: string;
  category: string[];
  glass: string;
  ingredients: IngredientModel[];
  cards: FormStateModel[];
}

const INIT_STATE: FormStateModel = {
  name: '',
  instructions: '',
  image: '',
  date: '',
  alcoholic: 'alco',
  category: [],
  glass: '',
  ingredients: [],
  cards: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState: INIT_STATE,
  reducers: {
    addName(state, action) {
      state.name = action.payload;
    },
    addInstructions(state, action) {
      state.instructions = action.payload;
    },
    addImage(state, action) {
      state.image = action.payload;
    },
    addDate(state, action) {
      state.date = action.payload;
    },
    addAlco(state, action) {
      state.alcoholic = action.payload;
    },
    addCategory(state, action) {
      if (!state.category.includes(action.payload)) {
        state.category.push(action.payload);
      } else {
        const index = state.category.indexOf(action.payload);
        state.category.splice(index, 1);
      }
    },
    addGlass(state, action) {
      state.glass = action.payload;
    },
    addIngredients(state, action) {
      state.ingredients.push(action.payload);
    },
    addCard(state, action) {
      state.cards.push(action.payload);
    },
    clearStore(state) {
      state.name = '';
      state.instructions = '';
      state.image = '';
      state.date = '';
      state.alcoholic = 'alco';
      state.category = [];
      state.glass = '';
      state.ingredients = [];
    },
  },
});

export const {
  addName,
  addInstructions,
  addImage,
  addDate,
  addAlco,
  addCategory,
  addGlass,
  addIngredients,
  clearStore,
  addCard,
} = formSlice.actions;
export const formReducer = formSlice.reducer;
