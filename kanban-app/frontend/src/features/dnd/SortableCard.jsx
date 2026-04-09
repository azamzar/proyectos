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
    // Mantenemos esto en false para evitar saltos visuales extraños al reordenar
    animateLayoutChanges: () => false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card ${isDragging ? 'dragging' : ''}`}
      // 🆕 Cuando se hace clic en cualquier parte de la tarjeta, abrimos el modal
      onClick={() => onOpenEdit(card)}
    >
      {/* ⠿ DRAG HANDLE: Solo esta parte permite arrastrar */}
      <div 
        className="drag-handle" 
        {...attributes} 
        {...listeners}
        onClick={(e) => e.stopPropagation()} // Evita abrir el modal si solo quieres arrastrar
      >
        ⠿
      </div>

      {/* CONTENIDO VISUAL */}
      <div className="card-content">
        <span className="card-title">{card.title}</span>
        {card.description && (
          <p className="card-description">{card.description}</p>
        )}
      </div>
    </div>
  );
}