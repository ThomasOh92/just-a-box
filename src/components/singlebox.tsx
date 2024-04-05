import * as React from 'react';
import { StickyNoteItem } from './box-components/stickyNote'
import { ContextMenu } from './box-components/contextMenu';
import { addStickyNote} from '../app/features/stickyNoteSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useState } from 'react';
import { Box } from '@mui/material';
import { Responsive, WidthProvider } from "react-grid-layout";
import '../globalStyles.css';

// Layout State - Manages the x, y, w, h of every element
// Sticky Note State - Manages sticky note content but with id (object, with key-value, id:string, content: string)
// Doc Path State - Manages doc filepath but with id (as an object, with key-value, id:string, content: string)
// Web Link State - Manages url but with id (as an object, with key-value, id:string, content: string)


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
    { i: "a", x: 0, y: 0, w: 1, h: 1 },
    { i: "b", x: 2, y: 2, w: 1, h: 1 },
    { i: "c", x: 5, y: 5, w: 1, h: 1 }
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
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        compactType={null}
      >
        {/* Test Elements */}
        <div key="a" style={{ border: '2px solid red' }}>1</div>
        <div key="b" style={{ border: '2px solid green' }}>2</div>
        <div key="c" style={{ border: '2px solid blue' }}>3</div>

        {/* Sticky Note Elements */}
      </ResponsiveGridLayout>

    </Box>
  );
  
};

export default SingleBox;


