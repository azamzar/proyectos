import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from './cardsSlice';
import CreateCardForm from './CreateCardForm.jsx';

function CardsPage() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.items);
  const status = useSelector((state) => state.cards.status);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <div>
      <h1>Cards</h1>
      <CreateCardForm />

      {status === 'loading' && <p>Cargando...</p>}

      {cards.map((card) => (
        <div key={card.id}>{card.title}</div>
      ))}
    </div>
  );
}

export default CardsPage;