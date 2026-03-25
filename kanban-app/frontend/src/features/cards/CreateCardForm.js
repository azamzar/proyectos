import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCard } from './cardsSlice';

function CreateCardForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createCard({
        title,
        description,
        column_id: 1,
      })
    );

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Crear Card</button>
    </form>
  );
}

export default CreateCardForm;