import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCardId: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCardModal: (state, action) => {
      state.activeCardId = action.payload;
    },
    closeCardModal: (state) => {
      state.activeCardId = null;
    }
  }
});

export const { openCardModal, closeCardModal } = uiSlice.actions;
export default uiSlice.reducer;