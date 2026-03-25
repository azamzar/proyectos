import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from './SortableCard';

export default function SortableColumn({ columnId, cards }) {
  return (
    <div style={{ width: '300px', margin: '10px', background: '#f4f5f7', padding: '10px' }}>
      <h3>Column {columnId}</h3>

      <SortableContext
        items={cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {cards.map((card) => (
          <SortableCard key={card.id} card={card} />
        ))}
      </SortableContext>
    </div>
  );
}