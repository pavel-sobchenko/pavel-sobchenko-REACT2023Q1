/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
import { HomeStateModel } from '../../models/home-state.model';
import {
  fetchRandomCocktails,
  searchCocktailByName,
} from '../thunks/fetchCocktails';

const INIT_STATE: HomeStateModel = {
  defaultCards: [],
  filteredCards: [],
  searchValue: '',
  isLoading: false,
  isEmptyResult: false,
  error: null,
  selectedCardId: null,
  isModal: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState: INIT_STATE,
  reducers: {
    clearSearchedCars(state) {
      state.filteredCards = [];
      state.isEmptyResult = false;
    },
    addSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    addSelectedCardId(state, action: PayloadAction<string>) {
      state.selectedCardId = action.payload;
    },
    openModal(state) {
      state.isModal = true;
    },
    closeModal(state) {
      state.isModal = false;
      state.selectedCardId = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchRandomCocktails.pending, (state) => {
      state.isLoading = true;
      state.isEmptyResult = false;
    });
    builder.addCase(fetchRandomCocktails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isEmptyResult = false;
      state.defaultCards = action.payload;
    });
    builder.addCase(fetchRandomCocktails.rejected, (state, action) => {
      state.isLoading = false;
      state.isEmptyResult = false;
      state.error = action.payload;
    });
    builder.addCase(searchCocktailByName.pending, (state) => {
      state.isLoading = true;
      state.isEmptyResult = false;
    });
    builder.addCase(searchCocktailByName.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.filteredCards = action.payload;
        state.isEmptyResult = false;
      } else {
        state.filteredCards = [];
        state.isEmptyResult = true;
      }
    });
    builder.addCase(searchCocktailByName.rejected, (state, action) => {
      state.isLoading = false;
      state.isEmptyResult = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearSearchedCars,
  addSearchValue,
  addSelectedCardId,
  openModal,
  closeModal,
} = homeSlice.actions;

// export const selectSearchValue = (state: RootState) => state.home.searchValue;

export const homeReducer = homeSlice.reducer;
