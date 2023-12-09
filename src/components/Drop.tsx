import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';

const Drop = ({ children, onDragEnd = () => {} }: { children: React.ReactNode; onDragEnd?: (result: any) => void }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Drop;
