import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, updateColumn, createColumn, deleteColumn } from './columnsSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth/authSlice';
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

  // para manejar autenticación y mostrar el nombre del usuario en el header, además de permitir cerrar sesión
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const handleLogin = () => navigate('/login');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  const columns = useSelector(state => state.columns?.items || []);
  const cards = useSelector(state => state.cards?.items || []);
  const status = useSelector(state => state.columns?.status || 'idle');

  const [activeCard, setActiveCard] = useState(null);
  
  // ✏️ ESTADOS PARA EDITAR COLUMNAS
  const [editingColumnId, setEditingColumnId] = useState(null);
  const [columnName, setColumnName] = useState('');

  // ➕ ESTADOS PARA AÑADIR COLUMNA
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');

  const [localCards, setLocalCards] = useState([]);

  useEffect(() => {
    const sortedCards = [...cards].sort((a, b) => a.position - b.position);
    setLocalCards(sortedCards);
  }, [cards]);

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


  // ----------------------------------------------------
  // MANEJADORES DE COLUMNAS
  // ----------------------------------------------------
  const handleUpdateColumnName = (id) => {
    if (columnName.trim() !== '') {
      dispatch(updateColumn({ id, name: columnName }));
    }
    setEditingColumnId(null);
  };

  const handleDeleteColumn = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar esta columna? Las tarjetas en ella también se borrarán.')) {
      dispatch(deleteColumn(id));
    }
  };

  const handleCreateColumn = () => {
    if (newColumnName.trim() !== '') {
      dispatch(createColumn({ name: newColumnName }));
      setNewColumnName('');
      setIsAddingColumn(false);
    }
  };

  if (status === 'loading') return <div className="loading-screen">Cargando...</div>;

  // ----------------------------------------------------
  // LÓGICA DRAG & DROP
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

      let targetColumnId = null;

      if (isOverAColumn) {
        targetColumnId = Number(String(overId).replace('col-', ''));
      } else if (overIndex !== -1) {
        targetColumnId = prev[overIndex].column_id;
      }

      if (!targetColumnId) return prev;

      if (activeCard.column_id !== targetColumnId) {
        const updated = [...prev];
        updated[activeIndex] = { ...activeCard, column_id: targetColumnId };
        if (overIndex !== -1) {
          return arrayMove(updated, activeIndex, overIndex);
        } else {
          return arrayMove(updated, activeIndex, updated.length - 1);
        }
      }

      if (activeCard.column_id === targetColumnId && overIndex !== -1) {
        return arrayMove(prev, activeIndex, overIndex);
      }
      return prev;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) {
      setLocalCards([...cards].sort((a, b) => a.position - b.position));
      return;
    }

    const finalActiveCard = localCards.find(c => c.id === active.id);
    if (!finalActiveCard) return;

    const newColumnId = finalActiveCard.column_id;
    const cardsInColumn = localCards.filter(c => c.column_id === newColumnId);
    const newPosition = cardsInColumn.findIndex(c => c.id === active.id) + 1; 

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
        
        {/* HEADER CORREGIDO */}
        <header className="app-header">
          <h1>Kanban</h1>
          
          <div className="user-controls">
            {user ? (
              <>
                <span className="welcome-text">
                  Bienvenido, <strong>{user.name}</strong>
                </span>
                <button className="auth-btn logout" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button className="auth-btn login" onClick={handleLogin}>
                Iniciar Sesión
              </button>
            )}
          </div>
        </header>

        <div className="board">
          {columns.map(col => {
            const columnCards = localCards.filter(card => card.column_id === col.id);

            return (
              <div key={col.id} className="column">
                <div className="column-header">
                  {editingColumnId === col.id ? (
                    <input
                      className="column-name-input"
                      autoFocus
                      value={columnName}
                      onChange={(e) => setColumnName(e.target.value)}
                      onBlur={() => handleUpdateColumnName(col.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUpdateColumnName(col.id);
                        if (e.key === 'Escape') setEditingColumnId(null);
                      }}
                    />
                  ) : (
                    <h3 onClick={() => { setEditingColumnId(col.id); setColumnName(col.name || ''); }}>
                      {col.name || 'Sin nombre'}
                    </h3>
                  )}

                  <div className="column-header-actions">
                    <span className="card-count">{columnCards.length}</span>
                    <button className="delete-col-btn" onClick={() => handleDeleteColumn(col.id)}>×</button>
                  </div>
                </div>

                <SortableContext 
                  items={columnCards.map(c => c.id)} 
                  strategy={verticalListSortingStrategy}
                >
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

          <div className="add-column-wrapper">
            {isAddingColumn ? (
              <div className="add-column-form">
                <input
                  autoFocus
                  placeholder="Título de la columna..."
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateColumn();
                    if (e.key === 'Escape') setIsAddingColumn(false);
                  }}
                />
                <div className="add-column-actions">
                  <button className="save-col-btn" onClick={handleCreateColumn}>Añadir</button>
                  <button className="cancel-col-btn" onClick={() => setIsAddingColumn(false)}>✕</button>
                </div>
              </div>
            ) : (
              <button className="add-column-btn" onClick={() => setIsAddingColumn(true)}>
                + Nueva columna
              </button>
            )}
          </div>
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

      <DragOverlay dropAnimation={null}>
        {activeCard ? <div className="card dragging">{activeCard.title}</div> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ColumnsPage;