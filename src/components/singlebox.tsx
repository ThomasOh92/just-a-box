import * as React from 'react';
import { StickyNoteItem } from './box-components/stickyNote'
import { ContextMenu } from './box-components/contextMenu';
import { addStickyNote} from '../app/features/stickyNoteSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useState } from 'react';
import { Box } from '@mui/material';
import { Responsive, WidthProvider } from "react-grid-layout";
import '../globalStyles.css';

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

  const layouts = {
    lg : [ 
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
    ],
  };

  const ResponsiveGridLayout = WidthProvider(Responsive);

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
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        compactType={null}
      >
        <div key="1" style={{ border: '2px solid red' }}>1</div>
        <div key="2" style={{ border: '2px solid green' }}>2</div>
        <div key="3" style={{ border: '2px solid blue' }}>3</div>
      </ResponsiveGridLayout>

    </Box>
  );
  
};

export default SingleBox;


