import * as React from 'react';
import { WidthProvider, Responsive, Layout } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const SingleBox: React.FC = () => {
    return (
        <h1>TEST BOX</h1>
    )
}

export default SingleBox;
