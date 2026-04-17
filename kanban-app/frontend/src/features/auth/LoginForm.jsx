import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate, Link } from 'react-router-dom'; // 🆕 Importamos Link
import api from '../../services/api';
import '../../styles/auth.css';

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
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Iniciar Sesión</h2>
          {error && <div className="error-message">{error}</div>}
          
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
          
          <button type="submit" className="auth-submit-btn" disabled={status === 'loading'}>
            {status === 'loading' ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          ¿No tienes cuenta? <Link to="/register" className="auth-link">Regístrate gratis</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;