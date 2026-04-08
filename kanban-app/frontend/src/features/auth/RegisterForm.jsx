import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // para fetch boards

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(register({ name, email, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      try {
        // 🔹 fetch boards del usuario recién registrado
        const res = await api.get('/boards', {
          headers: {
            Authorization: `Bearer ${result.payload.token}`
          }
        });
        const boards = res.data;
        if (boards.length > 0) {
          navigate(`/boards/${boards[0].id}`);
        } else {
          // Si no tiene boards, podrías redirigir a crear board
          navigate('/boards/new');
        }
      } catch (err) {
        console.error('Error fetching boards:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '0 auto' }}>
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
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
        {status === 'loading' ? 'Cargando...' : 'Registrarse'}
      </button>
    </form>
  );
};

export default RegisterForm;