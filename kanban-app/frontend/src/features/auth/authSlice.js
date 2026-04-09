import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// ---------------- REGISTER ----------------
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, password_confirmation }, { rejectWithValue }) => {
    try {
      const res = await api.post('/register', { name, email, password, password_confirmation });
      return res.data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error en registro');
    }
  }
);

// ---------------- LOGIN ----------------
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/login', { email, password });
      return res.data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error en login');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
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
      .addCase(login.pending, (state) => { state.status = 'loading'; })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // El bloque de register sigue la misma lógica
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;