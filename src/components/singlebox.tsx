import * as React from 'react';
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setLayouts } from '../app/features/layoutSlice';
import { StickyNoteItem } from './box-components/stickyNote';
import { updateStickyNote, removeStickyNote } from '../app/features/stickyNoteSlice';
import { GlobalStyles } from '@mui/system';
import {Box, TextareaAutosize, Button, TextField, Modal}  from '@mui/material';


const ResponsiveReactGridLayout = WidthProvider(Responsive);

// for test
const layoutTest = {
    md: [
      {i: '1', x: 0, y: 0, w: 5, h: 2, content: 'Note 1 Content'},
      {i: '2', x: 2, y: 0, w: 5, h: 2, content: 'Note 2 Content'},
      {i: '3', x: 4, y: 0, w: 5, h: 2, content: 'Note 3 Content'}
    ]
};


const SingleBox: React.FC = () => {

    const dispatch = useAppDispatch();

    //Layout Functionality
    const layout = useAppSelector((state) => state.layout.layouts);
    const updateLayout = (newLayout: Layout[]) => {
        dispatch(setLayouts({md: newLayout}));
    };

    //Sticky Note Functionality

    // Update content of a sticky note
    const handleUpdate = (id: string, content: string) => {
        dispatch(updateStickyNote({id, content}));
    };

    // Delete a sticky note
    const handleDelete = (id: string) => {
        // Dispatch an action to delete the sticky note with the given id
        dispatch(removeStickyNote(id));
    };

    const handleRightClick = () =>{
        console.log ("right click")
    }

    return (
        <>
            <GlobalStyles styles={{
                '.stickyNote > .react-resizable-handle::after': {
                content: '""',
                position: 'absolute',
                right: '3px',
                bottom: '3px',
                width: '5px',
                height: '5px',
                borderRight: '2px solid rgba(0, 0, 0, 0.4)',
                borderBottom: '2px solid rgba(0, 0, 0, 0.4)',
                },
                '.react-grid-item' : {
                zIndex: 3,
                transition: 'all 200ms ease',
                },
                '.react-grid-placeholder': {
                background: 'rgba(0, 0, 0, 0.54)',
                opacity: 0.2,
                borderRadius: '5px',
                transitionDuration: '250ms',
                zIndex: 2,
                }
                
            }}/>
        
            <Box onContextMenu={handleRightClick} sx={{height: '500px', transform: 'translateZ(0px)', flexGrow: 1,
            backgroundColor: "white"}}>
                <ResponsiveReactGridLayout 
                    className="layout" 
                    layouts={layout}  // Ensure this is the correct shape: { lg: Layout[], md: Layout[] }
                    breakpoints={{md:2000}} 
                    cols={{md: 50}} 
                    compactType={null} 
                    draggableHandle=".dragHandle"
                    isBounded={true}
                    rowHeight={10}
                    // onLayoutChange={} - I will only update the layout state when you hit the save button
                    // Makes me wonder if I even need a layout state, why don't i just save stuff direclty
                    >
                        {/* testing elements */}
                        {layoutTest.md.map((item) => (
                        <div key={item.i} data-grid={item}>
                            <StickyNoteItem
                                id={item.i}
                                content={item.content}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                showDelete={true}
                            />
                        </div>
                    ))}
                    
                </ResponsiveReactGridLayout>
            </Box>
        </>
    )
}

export default SingleBox;
