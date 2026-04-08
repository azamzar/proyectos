import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const BoardNewPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/boards', { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 🔹 Redirigir al board recién creado
      navigate(`/boards/${res.data.id}`);
    } catch (err) {
      console.error(err);
      setError('No se pudo crear el board');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h2>Crear tu primer board</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateBoard}>
        <input
          type="text"
          placeholder="Nombre del board"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Board'}
        </button>
      </form>
    </div>
  );
};

export default BoardNewPage;