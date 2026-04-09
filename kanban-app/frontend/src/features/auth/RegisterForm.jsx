import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '' // Importante para la validación de Laravel
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Guardamos el resultado de la acción
    const result = await dispatch(register(formData));

    // Solo si el registro fue exitoso (status 201 de Laravel)
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/boards');
    } else {
      // Si falló (error 422), no navegamos. 
      // El error ya debería estar en state.auth.error gracias al slice.
      console.error("Fallo en el registro:", result.payload);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Crear Cuenta</h2>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
        
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Registrando...' : 'Registrarse'}
        </button>

      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;