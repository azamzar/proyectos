import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      try {
        // Ya NO necesitas pasar los headers manualmente aquí
        const res = await api.get('/boards'); 
        const boards = res.data;
        
        if (boards.length > 0) {
          navigate(`/boards/${boards[0].id}`);
        } else {
          navigate('/boards/new');
        }
      } catch (err) {
        console.error('Error fetching boards:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '0 auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Cargando...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;