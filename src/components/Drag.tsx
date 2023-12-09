import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

interface DragProps {
  children: React.ReactNode;
  id: string;
  index: number;
}

const Drag = ({ children, id, index }: DragProps) => (
  <Draggable key={`draggableItem_${id}`} draggableId={`draggableItem_${id}`} index={index}>
    {(provided: DraggableProvided) => (
      <div>
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          {children}
        </div>
        {/* {provided.placeholder} */}
      </div>
    )}
  </Draggable>
);

export default Drag;
