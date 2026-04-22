import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Función auxiliar para extraer errores de Laravel
const extractErrors = (err) => {
  const data = err.response?.data;
  if (data?.errors) {
    // Convierte el objeto de errores de Laravel en un array plano de mensajes
    return Object.values(data.errors).flat();
  }
  return [data?.message || 'Error inesperado en el servidor'];
};

// ---------------- REGISTER ----------------
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, password_confirmation }, { rejectWithValue }) => {
    try {
      const res = await api.post('/register', { name, email, password, password_confirmation });
      return res.data; 
    } catch (err) {
      return rejectWithValue(extractErrors(err)); // Pasamos el array de errores
    }
  }
);

// ---------------- LOGIN ----------------
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/login', { email, password });
      return res.data; 
    } catch (err) {
      return rejectWithValue(extractErrors(err)); // Pasamos el array de errores
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null, // Ahora será siempre un array (o null)
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Guarda el array de errores
      })
      .addCase(register.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Guarda el array de errores
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;