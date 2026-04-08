import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// ---------------- FETCH ----------------
export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (boardId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get(`/boards/${boardId}/columns`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Error al obtener columnas'
      );
    }
  }
);

// ---------------- UPDATE ----------------
export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/columns/${id}`, { name });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Error al actualizar columna'
      );
    }
  }
);

const columnsSlice = createSlice({
  name: 'columns',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },

  reducers: {
    // 🔥 Optimistic update (UX rápida)
    updateColumnLocal: (state, action) => {
      const { id, name } = action.payload;
      const col = state.items.find(c => c.id === id);
      if (col) col.name = name;
    }
  },

  extraReducers: (builder) => {
    builder
      // ---------------- FETCH ----------------
      .addCase(fetchColumns.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ---------------- UPDATE ----------------
      .addCase(updateColumn.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          c => c.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateColumn.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { updateColumnLocal } = columnsSlice.actions;
export default columnsSlice.reducer;