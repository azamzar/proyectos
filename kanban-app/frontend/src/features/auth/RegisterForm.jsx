import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/auth.css'; 

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '' 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/boards');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Crear Cuenta</h2>
        
        {/* NUEVA LÓGICA DE ERRORES: Muestra una lista de viñetas */}
        {error && (
          <div className="error-message" style={{ textAlign: 'left', fontSize: '0.9rem', marginBottom: '1rem' }}>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {Array.isArray(error) ? (
                error.map((msg, index) => <li key={index}>{msg}</li>)
              ) : (
                <li>{error}</li>
              )}
            </ul>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="name"
            type="text"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña (mínimo 8 caracteres)"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="password_confirmation"
            type="password"
            placeholder="Confirmar contraseña"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
          
          <button 
            type="submit" 
            className="auth-submit-btn" 
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="auth-footer">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="auth-link">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;