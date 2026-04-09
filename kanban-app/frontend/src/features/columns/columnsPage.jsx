import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, updateColumn } from './columnsSlice';
import { fetchCards, reorderCard } from '../cards/cardsSlice';
import CreateCardForm from '../cards/CreateCardForm.jsx'; 

import '../../styles/kanban.css';
import '../../styles/index.css';

import { 
  DndContext,
  pointerWithin,
  DragOverlay, 
  PointerSensor, 
  KeyboardSensor,
  useDroppable,
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  sortableKeyboardCoordinates 
} from '@dnd-kit/sortable';

import SortableCard from '../dnd/SortableCard';

const ColumnsPage = () => {
  const dispatch = useDispatch();
  
  const columns = useSelector(state => state.columns?.items || []);
  const cards = useSelector(state => state.cards?.items || []);
  const status = useSelector(state => state.columns?.status || 'idle');

  const [activeCard, setActiveCard] = useState(null);
  const [editingColumnId, setEditingColumnId] = useState(null);
  const [columnName, setColumnName] = useState('');

  // 🛠️ ESTADOS DEL MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const openCreateModal = (columnId) => {
    setSelectedCard(null);
    setSelectedColumn(columnId);
    setIsModalOpen(true);
  };

  const openEditModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    dispatch(fetchColumns());
    dispatch(fetchCards());
  }, [dispatch]);

  if (status === 'loading') return <div className="loading-screen">Cargando...</div>;

  function DroppableColumn({ id, children }) {
    const { setNodeRef } = useDroppable({ id });
    
    return (
      <div ref={setNodeRef} className="cards-container">
        {children}
      </div>
    );
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const activeCardId = active.id;
    const overId = over.id; // Ahora puede ser '2' (id de carta) o 'col-3' (id de columna)

    const activeCardData = cards.find(c => c.id === activeCardId);
    if (!activeCardData) return;

    let newColumnId;
    let newPosition = 0;

    // 🕵️‍♂️ DETECCIÓN DE COLUMNA VACÍA
    // Si el ID del lugar donde soltamos empieza por "col-", es una columna
    if (String(overId).startsWith('col-')) {
      const realColumnId = Number(String(overId).replace('col-', ''));
      newColumnId = realColumnId;
      newPosition = 1; 
    } 
    // 🕵️‍♂️ DETECCIÓN DE OTRA TARJETA
    // Si no tiene prefijo, significa que lo soltamos sobre una tarjeta normal
    else {
      const overCard = cards.find(c => c.id === overId);
      if (overCard) {
        newColumnId = overCard.column_id;
        newPosition = overCard.position;
      }
    }

    // Si encontramos un destino válido, enviamos la acción a Redux
    if (newColumnId) {
      dispatch(reorderCard({
        card_id: activeCardData.id,
        new_column_id: newColumnId,
        new_position: newPosition
      }));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={(e) => setActiveCard(cards.find(c => c.id === e.active.id))}
      onDragEnd={handleDragEnd}
    >
      <div className="app-container">
        <header className="app-header">
          <h1>Kanban</h1>
        </header>

        <div className="board">
          {columns.map(col => {
            const columnCards = cards
              .filter(card => card.column_id === col.id)
              .sort((a, b) => a.position - b.position);

            return (
              <div key={col.id} className="column">
                <div className="column-header">
                  <h3 onClick={() => { setEditingColumnId(col.id); setColumnName(col.name || ''); }}>
                    {col.name || 'Sin nombre'}
                  </h3>
                  <span>{columnCards.length}</span>
                </div>

                <SortableContext 
                  items={columnCards.map(c => c.id)} 
                  strategy={verticalListSortingStrategy}
                >
                  {/* Sustituimos el div anterior por nuestro nuevo componente Droppable */}
                  <DroppableColumn id={`col-${col.id}`}>
                    {columnCards.map(card => (
                      <SortableCard key={card.id} card={card} onOpenEdit={openEditModal} />
                    ))}
                  </DroppableColumn>
                </SortableContext>

                {/* ÚNICO BOTÓN DE CREACIÓN */}
                <button className="add-card-btn-styled" onClick={() => openCreateModal(col.id)}>
                  <span className="plus-icon">+</span> Añadir tarjeta
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* EL MODAL DEBE IR AQUÍ, FUERA DE LAS COLUMNAS */}
      {isModalOpen && (
        <CreateCardForm 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCard(null);
          }} 
          columnId={selectedColumn} 
          selectedCard={selectedCard} 
        />
      )}

      <DragOverlay dropAnimation={null}>
        {activeCard ? <div className="card dragging">{activeCard.title}</div> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ColumnsPage;