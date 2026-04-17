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

// ---------------- CREATE ----------------
export const createColumn = createAsyncThunk(
  'columns/createColumn',
  async ({ name }) => {
    const res = await api.post('/columns', { name });
    // Importante: tu backend debería devolver el objeto de la columna completa (con su nuevo ID)
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

// ---------------- DELETE ----------------
export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (id) => {
    await api.delete(`/columns/${id}`);
    return id; // Devolvemos el ID para saber cuál borrar del estado de Redux
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

      // CREATE
      .addCase(createColumn.fulfilled, (state, action) => {
        // Añadimos la nueva columna al final del array
        state.items.push(action.payload);
      })

      // UPDATE
      .addCase(updateColumn.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteColumn.fulfilled, (state, action) => {
        // Filtramos para quedarnos con todas las columnas EXCEPTO la que acabamos de borrar
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  }
});

export const { updateColumnLocal } = columnsSlice.actions;

export default columnsSlice.reducer;