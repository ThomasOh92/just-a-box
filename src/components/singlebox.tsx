import * as React from 'react';
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { LayoutItem, setLayouts } from '../app/features/layoutSlice';



const ResponsiveReactGridLayout = WidthProvider(Responsive);

//for test
// const layoutTest = {
//     md: [
//       {i: '1', x: 0, y: 0, w: 2, h: 2},
//       {i: '2', x: 2, y: 0, w: 2, h: 2},
//       {i: '3', x: 4, y: 0, w: 2, h: 2}
//     ]
//   };


const SingleBox: React.FC = () => {

    const dispatch = useAppDispatch();

    //Layout Functionality
    const layout = useAppSelector((state) => state.layout.layouts);
    const updateLayout = (newLayout: LayoutItem[]) => {
        dispatch(setLayouts({md: newLayout}));
    };

    return (
        <ResponsiveReactGridLayout 
            className="layout" 
            layouts={layout}  // Ensure this is the correct shape: { lg: Layout[], md: Layout[] }
            breakpoints={{md:600}} 
            cols={{md: 10}} 
            compactType={null} 
            draggableHandle=".dragHandle"
            isBounded={true}
            onLayoutChange={(newLayout) => updateLayout(newLayout)}
            >
                {/* testing elements */}
                {/* {layoutTest.md.map((item) => ( 
                    <div key={item.i} className="grid-item" style={{border: '1px solid #ccc'}}>
                        <span className="dragHandle" style={{backgroundColor: '#ddd'}}>Drag Me</span>
                        Item {item.i}
                    </div>
                ))} */}
            
        </ResponsiveReactGridLayout>
    )
}

export default SingleBox;
