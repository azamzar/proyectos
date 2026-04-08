import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { openCardModal } from '../ui/uiSlice';
import { useState } from 'react';

// 🔹 Función de truncado por caracteres
function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export default function SortableCard({ card }) {
  const dispatch = useDispatch();

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
  };

  // 🔹 Estado opcional para expandir inline (si quieres expandir en el futuro)
  const [expanded, setExpanded] = useState(false);

  return (
    <div ref={setNodeRef} style={style} className="card">

      {/* DRAG HANDLE */}
      <div {...attributes} {...listeners} className="drag-handle">
        ⠿
      </div>

      {/* CONTENIDO */}
      <div
        className="card-content"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(openCardModal(card.id));
        }}
      >
        <div className="card-title">
          {truncateText(card.title, 50)}
        </div>

        <div className="card-description">
          {expanded
            ? card.description || "Sin descripción"
            : truncateText(card.description, 30) || "Sin descripción"
          }
        </div>
      </div>

    </div>
  );
}