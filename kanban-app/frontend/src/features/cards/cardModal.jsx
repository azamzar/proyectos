import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCard } from "./cardsSlice";
import { closeCardModal } from "../ui/uiSlice"; // Ajusta según ruta real

export default function CardModal() {
  const dispatch = useDispatch();
  const activeCardId = useSelector((state) => state.ui.activeCardId);
  const allCards = useSelector((state) => state.cards.items);

  const activeCard = allCards.find((c) => c.id === activeCardId);

  // Local state para inputs controlados
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Actualiza los inputs cuando cambie la card activa
  useEffect(() => {
    if (activeCard) {
      setTitle(activeCard.title || "");
      setDescription(activeCard.description || "");
    }
  }, [activeCard]);

  if (!activeCard) return null; // No renderiza modal si no hay card activa

  const handleSave = async () => {
    try {
      await dispatch(updateCard({ id: activeCard.id, data: { title, description } })).unwrap();
      dispatch(closeCardModal()); // Cierra modal
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleCancel = () => {
    dispatch(closeCardModal());
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <input
          className="modal-input"
          type="text"
          placeholder="Título de la tarjeta"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="modal-textarea"
          placeholder="Descripción de la tarjeta"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button className="add-card-button" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="add-card-button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}