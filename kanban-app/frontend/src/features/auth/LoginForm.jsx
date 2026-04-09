import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate, Link } from 'react-router-dom'; // 🆕 Importamos Link
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
      // 🆕 Eliminamos la lógica compleja y simplemente lo mandamos al Kanban
      navigate('/boards');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Iniciar Sesión</h2>
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
          placeholder="Contraseña" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Cargando...' : 'Entrar'}
        </button>
      </form>

      {/* 🆕 Enlace de ayuda para el usuario */}
      <p style={{ marginTop: '1.5rem' }}>
        ¿No tienes cuenta?{' '}
        <Link to="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;