import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// ---------------- FETCH ----------------
export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async () => {
    const res = await api.get('/columns');
    return res.data;
  }
);

// ---------------- UPDATE ----------------
export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({ id, name }) => {
    const res = await api.put(`/columns/${id}`, { name });
    return res.data;
  }
);

const columnsSlice = createSlice({
  name: 'columns',
  initialState: {
    items: [],
    status: 'idle'
  },

  reducers: {
    // 🔥 opcional (UX fluida)
    updateColumnLocal: (state, action) => {
      const { id, name } = action.payload;
      const col = state.items.find(c => c.id === id);
      if (col) col.name = name;
    }
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // 🔥 SOLO UNA VEZ
      .addCase(updateColumn.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  }
});

export const { updateColumnLocal } = columnsSlice.actions;

export default columnsSlice.reducer;