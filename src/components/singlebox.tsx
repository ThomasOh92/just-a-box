import * as React from 'react';
import { StickyNoteItem } from './box-components/stickyNote'
import { ContextMenu } from './box-components/contextMenu';
import { addStickyNote} from '../app/features/stickyNoteSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useState } from 'react';
import { Box } from '@mui/material';
import { MuuriComponent } from 'muuri-react';
import { Item } from './box-components/item';

const SingleBox: React.FC = () => {
  
  const stickyNotes = useAppSelector(state => state.stickyNotes.stickyNotesArray)

  const dispatch = useAppDispatch();

  // State to open menu on right click
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  

  // const handleDragEnd = (event: any) => {
        
  //   console.log(event);
  //   const id = event.active.id;
  //   const delta = event.delta;
  //   const note = stickyNotes.find(note => note.id === id);
 
  //   if (note && id.startsWith('note')) {
  //     const newX: number = note.x + delta.x;
  //     const newY: number = note.y + delta.y;
  //     dispatch(moveStickyNote({ id, x: newX, y: newY }));
  //   }
  // };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
    });
  };

  const stickyNotesToRender =  stickyNotes.map((note) => {
    return (<StickyNoteItem
             key={note.id} id={note.id} content={note.content}/>);
  }) 

  const items = [
    {key: '1', text: 'zl', size: 's', color: 'red'},
    {key: '2', text: 'zg', size: 'l', color: 'blue'},
    {key: '3', text: 'nx', size: 'l', color: 'blue'},
  ];


  const itemsToRender = items.map((props) => <Item {...props} />);


  // Render begins here
  return (
    <Box onContextMenu={handleRightClick} height={600}>
      <ContextMenu 
        contextMenu={contextMenu} 
        onClose={() => setContextMenu(null)} 
        onAddStickyNote={() => dispatch(addStickyNote())} 
        onAddDocument={() => console.log("adddocplaceholder")} 
        onAddLink={() => console.log("addlinkplaceholder")}
        />
      <MuuriComponent >
        {itemsToRender}
        {/* {stickyNotesToRender}        */}
      </MuuriComponent>


    </Box>
  );
  
};

export default SingleBox;


