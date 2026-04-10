import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableCard({ card, onOpenEdit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    // 🚨 HEMOS BORRADO animateLayoutChanges
    // Al quitarlo, dnd-kit animará automáticamente cómo las otras tarjetas se apartan
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // 🌟 MAGIA VISUAL: Si esta es la tarjeta que estamos arrastrando, pintamos el "Hueco"
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{ ...style, height: '80px' }} // Altura fija para el hueco
        className="card-placeholder"
      />
    );
  }

  // 🃏 Renderizado normal de la tarjeta
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card"
      onClick={() => onOpenEdit(card)}
    >
      <div 
        className="drag-handle" 
        {...attributes} 
        {...listeners}
        onClick={(e) => e.stopPropagation()} 
      >
        ⠿
      </div>

      <div className="card-content">
        <span className="card-title">{card.title}</span>
        {card.description && (
          <p className="card-description">{card.description}</p>
        )}
      </div>
    </div>
  );
}