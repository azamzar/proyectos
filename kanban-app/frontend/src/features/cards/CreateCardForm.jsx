import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createCard, updateCard } from './cardsSlice'; // Asegúrate de tener updateCard en tu slice

function CreateCardForm({ isOpen, onClose, columnId, selectedCard }) {
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 🔄 Sincronizar el formulario con la tarjeta seleccionada
  useEffect(() => {
    if (selectedCard) {
      // Modo Edición: Cargamos los datos de la tarjeta
      setTitle(selectedCard.title || '');
      setDescription(selectedCard.description || '');
    } else {
      // Modo Creación: Limpiamos los campos
      setTitle('');
      setDescription('');
    }
  }, [selectedCard, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (selectedCard) {
      // ✏️ Lógica de Actualización
      dispatch(updateCard({ 
        id: selectedCard.id, 
        data: { title, description } 
      }));
    } else {
      // ➕ Lógica de Creación
      dispatch(createCard({ 
        title, 
        description, 
        column_id: columnId 
      }));
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Título dinámico según la acción */}
        <h2 style={{ color: 'white', marginBottom: '10px' }}>
          {selectedCard ? 'Editar Tarea' : 'Nueva Tarea'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            className="modal-input"
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <textarea
            className="modal-textarea"
            placeholder="Añade una descripción más detallada..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ minHeight: '120px' }}
          />

          <div className="modal-buttons">
            <button 
              type="button" 
              className="modal-button modal-button-cancel" 
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="modal-button modal-button-save"
            >
              {selectedCard ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCardForm;