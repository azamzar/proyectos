import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, updateColumn } from './columnsSlice';
import { fetchCards, reorderCard } from '../cards/cardsSlice';
import CreateCardForm from '../cards/CreateCardForm.jsx'; 

import '../../styles/kanban.css';
import '../../styles/index.css';

import { 
  DndContext,
  closestCorners,
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
  sortableKeyboardCoordinates,
  arrayMove
} from '@dnd-kit/sortable';

import SortableCard from '../dnd/SortableCard';

// ----------------------------------------------------
// COMPONENTE DROPPABLE PARA LAS COLUMNAS VACÍAS
// ----------------------------------------------------
const DroppableColumn = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id }); 
  return (
    <div ref={setNodeRef} className="cards-container">
      {children}
    </div>
  );
};

const ColumnsPage = () => {
  const dispatch = useDispatch();
  
  const columns = useSelector(state => state.columns?.items || []);
  const cards = useSelector(state => state.cards?.items || []);
  const status = useSelector(state => state.columns?.status || 'idle');

  const [activeCard, setActiveCard] = useState(null);
  const [editingColumnId, setEditingColumnId] = useState(null);
  const [columnName, setColumnName] = useState('');

  // 🪞 ESTADO LOCAL (ESPEJO) PARA ANIMACIONES FLUIDAS
  const [localCards, setLocalCards] = useState([]);

  useEffect(() => {
    const sortedCards = [...cards].sort((a, b) => a.position - b.position);
    setLocalCards(sortedCards);
  }, [cards]);

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


  // ----------------------------------------------------
  // LOGICA DE ARRASTRE EN TIEMPO REAL (EL HUECO)
  // ----------------------------------------------------
  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setLocalCards((prev) => {
      const activeIndex = prev.findIndex((c) => c.id === activeId);
      if (activeIndex === -1) return prev;

      const activeCard = prev[activeIndex];
      const isOverAColumn = String(overId).startsWith('col-');
      const overIndex = prev.findIndex((c) => c.id === overId);

      // Descubrimos a qué columna queremos mover la tarjeta
      let targetColumnId = null;

      if (isOverAColumn) {
        targetColumnId = Number(String(overId).replace('col-', ''));
      } else if (overIndex !== -1) {
        targetColumnId = prev[overIndex].column_id;
      }

      if (!targetColumnId) return prev;

      // CASO A: Nos movemos a una COLUMNA DISTINTA
      if (activeCard.column_id !== targetColumnId) {
        const updated = [...prev];
        // Le cambiamos el ID de columna a la tarjeta en el aire
        updated[activeIndex] = { ...activeCard, column_id: targetColumnId };

        if (overIndex !== -1) {
          // Si caemos sobre otra tarjeta, hacemos hueco exacto ahí
          return arrayMove(updated, activeIndex, overIndex);
        } else {
          // Si caemos en el espacio vacío de la columna, la mandamos al final
          return arrayMove(updated, activeIndex, updated.length - 1);
        }
      }

      // CASO B: Nos movemos DENTRO DE LA MISMA COLUMNA
      if (activeCard.column_id === targetColumnId && overIndex !== -1) {
        return arrayMove(prev, activeIndex, overIndex);
      }

      return prev;
    });
  };

  // ----------------------------------------------------
  // LOGICA AL SOLTAR (GUARDAR EN BASE DE DATOS)
  // ----------------------------------------------------
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null);

    // Si soltamos fuera de un área válida, reseteamos al estado de Redux
    if (!over) {
      setLocalCards([...cards].sort((a, b) => a.position - b.position));
      return;
    }

    // Buscamos cómo ha quedado la tarjeta tras todos los movimientos
    const finalActiveCard = localCards.find(c => c.id === active.id);
    if (!finalActiveCard) return;

    const newColumnId = finalActiveCard.column_id;
    const cardsInColumn = localCards.filter(c => c.column_id === newColumnId);
    
    // Su posición final es su índice en la lista local filtrada + 1
    const newPosition = cardsInColumn.findIndex(c => c.id === active.id) + 1; 

    // Enviamos a Redux y Base de Datos
    dispatch(reorderCard({
      card_id: finalActiveCard.id,
      new_column_id: newColumnId,
      new_position: newPosition
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={(e) => setActiveCard(localCards.find(c => c.id === e.active.id))}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="app-container">
        <header className="app-header">
          <h1>Kanban</h1>
        </header>

        <div className="board">
          {columns.map(col => {
            // USAMOS LOCALCARDS PARA EL RENDER EN VIVO
            const columnCards = localCards.filter(card => card.column_id === col.id);

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
                  {/* 🚨 VITAL: El prefijo col- ha vuelto para evitar colisiones de IDs con las tarjetas */}
                  <DroppableColumn id={`col-${col.id}`}>
                    {columnCards.map(card => (
                      <SortableCard key={card.id} card={card} onOpenEdit={openEditModal} />
                    ))}
                  </DroppableColumn>
                </SortableContext>

                <button className="add-card-btn-styled" onClick={() => openCreateModal(col.id)}>
                  <span className="plus-icon">+</span> Añadir tarjeta
                </button>
              </div>
            );
          })}
        </div>
      </div>

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

      {/* LA TARJETA CLON QUE VUELA PEGADA AL RATÓN */}
      <DragOverlay dropAnimation={null}>
        {activeCard ? <div className="card dragging">{activeCard.title}</div> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ColumnsPage;