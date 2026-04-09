import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import columnsReducer from '../features/columns/columnsSlice';
import cardsReducer from '../features/cards/cardsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,     
    columns: columnsReducer, 
    cards: cardsReducer,
  },
});