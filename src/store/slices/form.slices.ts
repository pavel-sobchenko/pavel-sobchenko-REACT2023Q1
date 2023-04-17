/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface FormStateModel {
  name: string;
  instructions: string;
  image: string;
}

const INIT_STATE: FormStateModel = {
  name: '',
  instructions: '',
  image: '',
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
  },
});

export const { addName, addInstructions, addImage } = formSlice.actions;
export const formReducer = formSlice.reducer;
