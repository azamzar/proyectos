import { DndContext, closestCenter } from '@dnd-kit/core';

export default function DndContextProvider({ children, onDragEnd }) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
}