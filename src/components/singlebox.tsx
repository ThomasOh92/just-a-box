import * as React from 'react';
import { StickyNoteItem } from './box-components/stickyNote'
import { ContextMenu } from './box-components/contextMenu';
import { addToStickyNoteState,  removeFromStickyNoteState } from '../app/features/stickyNoteSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useState } from 'react';
import { Box } from '@mui/material';
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import '../globalStyles.css';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Layout State - Manages the x, y, w, h of every element
// Sticky Note State - Manages sticky note content but with id (object, with key-value, id:string, content: string)
// Doc Path State - Manages doc filepath but with id (as an object, with key-value, id:string, content: string)
// Web Link State - Manages url but with id (as an object, with key-value, id:string, content: string)


const SingleBox: React.FC = () => {
  
  const layouts: Layouts = {
    lg: [ 
      { i: "note1", x: 2, y: 2, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]},
      { i: "test", x: 0, y: 0, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]}
    ],  
  }
  const stickyNotes = useAppSelector(state => state.stickyNotes.stickyNotesArray)
  const dispatch = useAppDispatch();

  // Layout Management
  const onLayoutChange = (newLayout: Layout, allLayouts: Layouts) => {
    layouts.lg = [newLayout];
  };
  const addStickyNotetoLayout = (newNoteId: string) => {
    layouts.lg.push({ i: newNoteId, x: 0, y: 0, w: 2, h: 5, isResizable: true, resizeHandles: ["se"]});
  }

  // For Right Clicks
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  
  const handleRightClick = (event: React.MouseEvent, id?: string) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4,
    });
  };

  // For Sticky Notes - you need to bring in the keys/id, and the content
  // Remember to keep to div wrapper, the key can't be passed as a prop
  const stickyNotesToRender = stickyNotes.map((note: { id: string, content: string }) => {
    return (
      <div key={note.id}>
        <StickyNoteItem
          id={note.id}
          content={note.content}
        />
      </div>
    );
  })
  
  const addStickyNote = () => {
    const newNoteId = "note" + Math.random().toString(36).substring(7) // Random ID
    dispatch(addToStickyNoteState({ newNoteId }));
    addStickyNotetoLayout(newNoteId);
  }



  const ResponsiveGridLayout = WidthProvider(Responsive);

  // Render begins here
  return (
    <Box onContextMenu={handleRightClick} height={600} id="box">
      <ContextMenu 
        contextMenu={contextMenu} 
        onClose={() => setContextMenu(null)} 
        onAddStickyNote={() => addStickyNote()} 
        onAddDocument={() => console.log("adddocplaceholder")} 
        onAddLink={() => console.log("addlinkplaceholder")}
        />
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 800}}
        cols={{ lg: 12}}
        compactType={null}
        onLayoutChange={(currentLayout: Layout[], allLayouts: Layouts) => onLayoutChange(currentLayout[0], allLayouts)}
        draggableHandle=".dragHandle"
        rowHeight={20}
        isResizable={true}
        preventCollision={true}
      > 
        {/* Sticky Note Elements */}
        {stickyNotesToRender}

        <div key="test" className="dragHandle" style={{border: '1px solid black' }}></div>
      </ResponsiveGridLayout>

    </Box>
  );
  
};

export default SingleBox;


