import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// -------------------- FETCH CARDS --------------------
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async () => {
    const response = await api.get('/cards');
    return response.data;
  }
);

// -------------------- CREATE CARD --------------------
export const createCard = createAsyncThunk(
  'cards/createCard',
  async (newCard) => {
    const response = await api.post('/cards', newCard);
    return response.data;
  }
);

// -------------------- REORDER CARD --------------------
export const reorderCard = createAsyncThunk(
  'cards/reorderCard',
  async (data) => {
    await api.post('/cards/reorder', data);
    return data;
  }
);

// -------------------- UPDATE CARD --------------------
export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async ({ id, data }) => {
    const response = await api.put(`/cards/${id}`, data);
    return response.data;
  }
);

// -------------------- SLICE --------------------
const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },

  // 🔥 REDUCERS (LOCAL / OPTIMISTIC)
  reducers: {
    updateLocal: (state, action) => {
      const { id, title, description } = action.payload;

      const card = state.items.find(c => c.id === id);
      if (card) {
        card.title = title;
        card.description = description;
      }
    },

    reorderLocal: (state, action) => {
      const { card_id, new_column_id, new_position } = action.payload;

      const card = state.items.find(c => c.id === card_id);
      if (!card) return;

      card.column_id = new_column_id;
      card.position = new_position;

      // recalcular posiciones
      const columnCards = state.items
        .filter(c => c.column_id === new_column_id)
        .sort((a, b) => a.position - b.position);

      columnCards.forEach((c, index) => {
        c.position = index;
      });
    }
  },

  // 🔥 ASYNC
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, (state) => {
        state.status = 'failed';
      })

      // CREATE
      .addCase(createCard.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // REORDER
      .addCase(reorderCard.fulfilled, (state, action) => {
        const { card_id, new_column_id, new_position } = action.payload;

        const card = state.items.find(c => c.id === card_id);
        if (card) {
          card.column_id = new_column_id;
          card.position = new_position;
        }
      })

      // UPDATE CARD
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  }
});

// 🔥 EXPORTS
export const { updateLocal, reorderLocal } = cardsSlice.actions;

export default cardsSlice.reducer;