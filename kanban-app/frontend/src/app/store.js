import { configureStore } from '@reduxjs/toolkit';
import columnsReducer from '../features/columns/columnsSlice';
import cardsReducer from '../features/cards/cardsSlice';
import uiReducer from '../features/ui/uiSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    columns: columnsReducer, // ✅ la key aquí debe coincidir con useSelector
    cards: cardsReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});