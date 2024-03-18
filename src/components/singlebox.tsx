import * as React from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Draggable } from './dndkit-components/Draggable';
import { Droppable } from './dndkit-components/Droppable';


const SingleBox: React.FC = () => {
  
  //For testing, we will need to upgrade state management to Redux soon for many element positions, content  
  const [testElementPositon, setTestElementPositon] = React.useState({ x: 0, y: 0 });
  const sensors = useSensors(
    useSensor(PointerSensor),
  );
  const handleDragEnd = (event) => {
    
    console.log(event);
    const { delta } = event;

    setTestElementPositon((prevPosition) => ({
      x: prevPosition.x + delta.x,
      y: prevPosition.y + delta.y,
    }));
    
  };

  // Render begins here
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Droppable id="droppable">
        <Draggable elementPosition={testElementPositon}>Drag me</Draggable>
      </Droppable>
    </DndContext>
  );
  
};

export default SingleBox;
