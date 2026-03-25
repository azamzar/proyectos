import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, updateColumn } from './columnsSlice';
import { fetchCards, createCard, reorderCard } from '../cards/cardsSlice';

// 🧠 DND-KIT
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// ✅ IMPORTANTE: usar SOLO el componente externo
import SortableCard from '../dnd/SortableCard';

const ColumnsPage = () => {
  const dispatch = useDispatch();
  const columns = useSelector(state => state.columns.items);
  const cards = useSelector(state => state.cards.items);

  const [newCardTitles, setNewCardTitles] = useState({});
  const [activeCard, setActiveCard] = useState(null);

  // ✏️ edición columnas
  const [editingColumnId, setEditingColumnId] = useState(null);
  const [columnName, setColumnName] = useState('');

  useEffect(() => {
    dispatch(fetchColumns());
    dispatch(fetchCards());
  }, [dispatch]);

  // ------------------ CREATE CARD ------------------
  const handleCreateCard = (columnId) => {
    const title = newCardTitles[columnId];
    if (!title || !title.trim()) return;

    dispatch(createCard({ title, description: '', column_id: columnId }));

    setNewCardTitles(prev => ({
      ...prev,
      [columnId]: ''
    }));
  };

  // ------------------ DRAG START ------------------
  const handleDragStart = (event) => {
    const card = cards.find(c => c.id === event.active.id);
    setActiveCard(card);
  };

  // ------------------ DRAG END ------------------
  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveCard(null);

    if (!over) return;

    const activeCardData = cards.find(c => c.id === active.id);
    const overCard = cards.find(c => c.id === over.id);

    if (!activeCardData || !overCard) return;

    dispatch(reorderCard({
      card_id: activeCardData.id,
      new_column_id: overCard.column_id,
      new_position: overCard.position
    }));
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="app-container">
        
        {/* HEADER */}
        <header className="app-header">
          <h1>Kanban</h1>
          <span>Productivity Board</span>
        </header>

        {/* BOARD */}
        <div className="board">
          {columns.map(col => {
            const columnCards = cards
              .filter(card => card.column_id === col.id)
              .sort((a, b) => a.position - b.position);

            return (
              <div key={col.id} className="column">

                {/* ✏️ HEADER EDITABLE */}
                <div className="column-header">
                  {editingColumnId === col.id ? (
                    <input
                      value={columnName}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setColumnName(e.target.value)}
                      onBlur={() => {
                        if (columnName.trim()) {
                          dispatch(updateColumn({
                            id: col.id,
                            name: columnName
                          }));
                        }
                        setEditingColumnId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (columnName.trim()) {
                            dispatch(updateColumn({
                              id: col.id,
                              name: columnName
                            }));
                          }
                          setEditingColumnId(null);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '6px',
                        borderRadius: '6px',
                        border: '1px solid #ccc'
                      }}
                    />
                  ) : (
                    <h3
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={() => {
                        setEditingColumnId(col.id);
                        setColumnName(col.name || '');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {col.name || 'Sin nombre'}
                    </h3>
                  )}

                  <span>{columnCards.length}</span>
                </div>

                {/* 🃏 CARDS */}
                <SortableContext
                  items={columnCards.map(c => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="cards-container">
                    {columnCards.map(card => (
                      <SortableCard
                        key={card.id}
                        card={card}
                      />
                    ))}
                  </div>
                </SortableContext>

                {/* ➕ ADD CARD */}
                <div className="add-card">
                  <input
                    placeholder="Añadir tarea..."
                    value={newCardTitles[col.id] || ''}
                    onChange={(e) =>
                      setNewCardTitles(prev => ({
                        ...prev,
                        [col.id]: e.target.value
                      }))
                    }
                  />

                  <button onClick={() => handleCreateCard(col.id)}>
                    +
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 🧠 DRAG OVERLAY */}
      <DragOverlay dropAnimation={null}>
        {activeCard ? (
          <div className="card dragging">
            {activeCard.title}
          </div>
        ) : null}
      </DragOverlay>

    </DndContext>
  );
};

export default ColumnsPage;