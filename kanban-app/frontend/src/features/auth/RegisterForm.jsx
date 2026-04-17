import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/auth.css'; // Asegúrate de que la ruta al CSS sea correcta

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
    
    // Ejecutamos la acción de registro
    const result = await dispatch(register(formData));

    // Si el registro es exitoso, redirigimos al tablero principal
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/boards');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Crear Cuenta</h2>
        
        {/* Mostrar error si la validación falla */}
        {error && <div className="error-message">{error}</div>}
        
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
            placeholder="Contraseña"
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