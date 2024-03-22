import * as React from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Draggable } from './dndkit-components/Draggable';
import { Droppable } from './dndkit-components/Droppable';
import { StickyNoteItem } from './box-components/stickyNote'
import { moveStickyNote } from '../app/features/stickyNoteSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { node } from 'webpack';

const SingleBox: React.FC = () => {
  
  const stickyNotes = useAppSelector(state => state.stickyNotes.stickyNotesArray)
  // we call the store here (useAppSelector, state) > 
      // pick the stickyNotesSlice > 
      // pick the array that contains everything

  // const notePosition = {
  //   x: note.x,
  //   y: note.y
  // }
  const dispatch = useAppDispatch();


  const sensors = useSensors(
    useSensor(PointerSensor),
  );
  const handleDragEnd = (event) => {
        
    console.log(event);
    const id = event.active.id;
    const delta = event.delta;
    const note = stickyNotes.find(note => note.id === id);
 
    if (id.startsWith('note')) {
      const newX = delta.x;
      const newY = delta.y;
      dispatch(moveStickyNote({ id, x: newX, y: newY }));
    }
  };

  // Render begins here
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Droppable id="droppable">
        {/* <Draggable id="draggable" elementPosition={elementPositions['draggable']}>Drag me</Draggable> */}
        {/* <StickyNoteItem id="stickynote1" content="hello" elementPosition={notePosition}></StickyNoteItem> */}
        {/* Sticky note components */}
        {stickyNotes.map((note) => {
            return (<StickyNoteItem key={note.id} id={note.id} content={note.content} width={note.width} height={note.height} x={note.x} y={note.y}/>);
        })}
      </Droppable>
    </DndContext>
  );
  
};

export default SingleBox;
