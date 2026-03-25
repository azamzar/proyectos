import { configureStore } from '@reduxjs/toolkit';
import columnsReducer from '../features/columns/columnsSlice';
import cardsReducer from '../features/cards/cardsSlice'; // si lo tienes

export const store = configureStore({
  reducer: {
    columns: columnsReducer, // ✅ la key aquí debe coincidir con useSelector
    cards: cardsReducer,
  },
});