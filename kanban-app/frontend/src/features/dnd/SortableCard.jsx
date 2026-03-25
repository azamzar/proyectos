import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { updateCard } from '../cards/cardsSlice';
import { updateLocal } from '../cards/cardsSlice';

export default function SortableCard({ card }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');

  // ✅ SOLO sincroniza si NO estás editando
  useEffect(() => {
    if (!isEditing) {
      setTitle(card.title);
      setDescription(card.description || '');
    }
  }, [card.title, card.description, isEditing]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useSortable({
    id: card.id,
    animateLayoutChanges: () => false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    padding: '10px',
    margin: '5px',
    background: 'white',
    borderRadius: '6px',
  };

  const handleSave = () => {
    dispatch(updateLocal({
      id: card.id,
      title,
      description
    }));

    dispatch(updateCard({
      id: card.id,
      data: { title, description }
    }));

    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="card">

      {/* DRAG HANDLE */}
      <div {...attributes} {...listeners} style={{ cursor: 'grab' }}>
        ⠿
      </div>

      {/* CONTENIDO */}
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <div className="card-edit">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
            />

            <button onClick={handleSave}>
              Guardar
            </button>
          </div>
        ) : (
          <div onClick={() => setIsEditing(true)}>
            <strong>{card.title}</strong>
            {card.description && <p>{card.description}</p>}
          </div>
        )}
      </div>

    </div>
  );
}