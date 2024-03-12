import * as React from 'react';
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { LayoutItem, setLayouts } from '../app/features/layoutSlice';



const ResponsiveReactGridLayout = WidthProvider(Responsive);
const dispatch = useAppDispatch();

//Layout Functionality
const layout = useAppSelector((state) => state.layout.layouts);
const updateLayout = (newLayout: LayoutItem[]) => {
    dispatch(setLayouts({md: newLayout}));
};


const SingleBox: React.FC = () => {
    return (
        <ResponsiveReactGridLayout 
        className="layout" 
        layouts={layout}  // Ensure this is the correct shape: { lg: Layout[], md: Layout[] }
        breakpoints={{md:600}} 
        cols={{md: 20}} 
        compactType={null} 
        draggableHandle=".dragHandle"
        isBounded={true}
        onLayoutChange={(newLayout) => updateLayout(newLayout)}
        >
        
        </ResponsiveReactGridLayout>

    )
}

export default SingleBox;
