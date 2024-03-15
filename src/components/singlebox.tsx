import * as React from 'react';
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { LayoutItem, setLayouts } from '../app/features/layoutSlice';
import { StickyNoteItem } from './box-components/stickyNote';
import { updateStickyNote, removeStickyNote } from '../app/features/stickyNoteSlice';


const ResponsiveReactGridLayout = WidthProvider(Responsive);

// for test
const layoutTest = {
    md: [
      {i: '1', x: 0, y: 0, w: 2, h: 2, content: 'Note 1 Content'},
      {i: '2', x: 2, y: 0, w: 2, h: 2, content: 'Note 2 Content'},
      {i: '3', x: 4, y: 0, w: 2, h: 2, content: 'Note 3 Content'}
    ]
};


const SingleBox: React.FC = () => {

    const dispatch = useAppDispatch();

    //Layout Functionality
    const layout = useAppSelector((state) => state.layout.layouts);
    const updateLayout = (newLayout: LayoutItem[]) => {
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

    return (
        <ResponsiveReactGridLayout 
            className="layout" 
            layouts={layout}  // Ensure this is the correct shape: { lg: Layout[], md: Layout[] }
            breakpoints={{md:2000}} 
            cols={{md: 50}} 
            compactType={null} 
            draggableHandle=".dragHandle"
            isBounded={true}
            onLayoutChange={(newLayout) => updateLayout(newLayout)}
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
    )
}

export default SingleBox;
